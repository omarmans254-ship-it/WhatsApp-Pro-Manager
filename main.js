const { app, BrowserWindow, ipcMain, dialog, Notification, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn, exec } = require('child_process');
const AdmZip = require('adm-zip');
const http = require('http');
const https = require('https');
const os = require('os');
const dgram = require('dgram');

// --- Low Spec & RAM Optimization Switches ---
app.commandLine.appendSwitch('enable-low-end-device-mode');
app.commandLine.appendSwitch('renderer-process-limit', '2');
app.commandLine.appendSwitch('disable-gpu-memory-buffer-video-frames');
app.commandLine.appendSwitch('js-flags', '--max-old-space-size=256');

let mainWindow;

// Find Chrome Path
const chromePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Users\\' + process.env.USERNAME + '\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'
];

let chromeExecutable = null;
for (let p of chromePaths) {
    if (fs.existsSync(p)) {
        chromeExecutable = p;
        break;
    }
}

// Track running processes and account states
const runningProcesses = {};
let accountStates = {}; 
let extensionPort = 9999;

// --- Extension Tracker Server ---
const trackerServer = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.url.startsWith('/ping')) {
        try {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const id = url.searchParams.get('id');
            const loggedIn = url.searchParams.get('loggedIn') === 'true';
            if (id && accountStates[id]) {
                const prevLoggedIn = accountStates[id].loggedIn;
                accountStates[id].loggedIn = loggedIn;
                if (!prevLoggedIn && loggedIn) {
                    try {
                        if (Notification.isSupported()) {
                            new Notification({
                                title: 'واتساب برو - تم مسح الكود ✔️',
                                body: `تم مسح كود QR وتسجيل الدخول بنجاح!`,
                                icon: path.join(__dirname, 'icon.png')
                            }).show();
                        }
                    } catch (e) {}
                }
            }
        } catch (e) {}
        res.writeHead(200);
    } else {
        res.writeHead(404);
        res.end();
    }
});
trackerServer.listen(0, () => {
    extensionPort = trackerServer.address().port;
});

// --- LAN Sync & Auto-Update System ---
const APP_VERSION = app.getVersion() || '1.0.0';
let syncMode = 'LOCAL'; // 'LOCAL', 'SERVER', 'CLIENT'
let syncTargetIp = '';
const SYNC_PORT = 9998;
const UDP_PORT = 9997;
const activeClients = {};
let udpServer = null;

function getLocalIpAddress() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1';
}

function recordClientActivity(req) {
    let clientIp = req.socket.remoteAddress || '';
    if (clientIp.startsWith('::ffff:')) {
        clientIp = clientIp.replace('::ffff:', '');
    }
    if (clientIp && clientIp !== '127.0.0.1' && clientIp !== '::1') {
        activeClients[clientIp] = Date.now();
    }
}

function isVersionHigher(v1, v2) {
    const parts1 = String(v1).split('.').map(Number);
    const parts2 = String(v2).split('.').map(Number);
    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
        const p1 = parts1[i] || 0;
        const p2 = parts2[i] || 0;
        if (p1 > p2) return true;
        if (p1 < p2) return false;
    }
    return false;
}

// UDP Auto-Discovery Server
function startUdpServer() {
    stopUdpServer();
    try {
        udpServer = dgram.createSocket('udp4');
        udpServer.on('message', (msg, rinfo) => {
            if (msg.toString().includes('DISCOVER_WA_SERVER')) {
                const localIp = getLocalIpAddress();
                const response = JSON.stringify({
                    type: 'WA_SERVER_RESPONSE',
                    ip: localIp,
                    port: SYNC_PORT,
                    version: APP_VERSION
                });
                const replySocket = dgram.createSocket('udp4');
                replySocket.send(Buffer.from(response), rinfo.port, rinfo.address, () => {
                    try { replySocket.close(); } catch(e){}
                });
            }
        });
        udpServer.bind(UDP_PORT, '0.0.0.0');
    } catch(e) {}
}

function stopUdpServer() {
    if (udpServer) {
        try { udpServer.close(); } catch(e){}
        udpServer = null;
    }
}

// Create LAN Sync & Update Server (Runs when mode is SERVER)
const syncServer = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Private-Network', 'true');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        return res.end();
    }

    recordClientActivity(req);

    if (req.url === '/ping-client' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', version: APP_VERSION }));
    }
    else if (req.url === '/app-version' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ version: APP_VERSION }));
    }
    else if (req.url === '/update-package' && req.method === 'GET') {
        const updateInfo = {
            version: APP_VERSION,
            timestamp: Date.now(),
            status: 'AVAILABLE'
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updateInfo));
    }
    else if (req.url === '/accounts' && req.method === 'GET') {
        let accounts = [];
        if (fs.existsSync(accountsFile)) {
            try { accounts = JSON.parse(fs.readFileSync(accountsFile, 'utf8')); } catch (e) {}
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(accounts));
    } 
    else if (req.url === '/accounts' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try {
                const newAccounts = JSON.parse(body);
                fs.writeFileSync(accountsFile, JSON.stringify(newAccounts, null, 2), 'utf8');
                res.writeHead(200);
                res.end('ok');
            } catch (e) {
                res.writeHead(400);
                res.end('error');
            }
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

let isSyncServerRunning = false;

function startSyncServer() {
    if (isSyncServerRunning) return true;
    try {
        syncServer.removeAllListeners('error');
        syncServer.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                isSyncServerRunning = true;
            }
        });

        syncServer.listen(SYNC_PORT, '0.0.0.0', () => {
            isSyncServerRunning = true;
        });

        startUdpServer();

        // Add Windows Firewall Rules automatically (Runs silently)
        const cmdTcp = `netsh advfirewall firewall add rule name="WhatsAppProManagerLAN" dir=in action=allow protocol=TCP localport=${SYNC_PORT} profile=any`;
        const cmdUdp = `netsh advfirewall firewall add rule name="WhatsAppProManagerUDP" dir=in action=allow protocol=UDP localport=${UDP_PORT} profile=any`;
        exec(cmdTcp, () => {});
        exec(cmdUdp, () => {});
        return true;
    } catch(e) {
        return false;
    }
}

function stopSyncServer() {
    if (!isSyncServerRunning) return;
    try {
        syncServer.close(() => {
            isSyncServerRunning = false;
        });
        stopUdpServer();
    } catch(e) {
        isSyncServerRunning = false;
    }
}

ipcMain.handle('get-connected-clients', () => {
    const now = Date.now();
    const activeIps = [];
    for (const ip in activeClients) {
        if (now - activeClients[ip] <= 15000) {
            activeIps.push(ip);
        } else {
            delete activeClients[ip];
        }
    }
    return { count: activeIps.length, clients: activeIps };
});

ipcMain.handle('auto-discover-server', async () => {
    return new Promise((resolve) => {
        let client = null;
        let timer = null;
        try {
            client = dgram.createSocket('udp4');
            client.bind(() => {
                client.setBroadcast(true);
                const message = Buffer.from('DISCOVER_WA_SERVER');
                client.send(message, 0, message.length, UDP_PORT, '255.255.255.255');
            });

            client.on('message', (msg, rinfo) => {
                try {
                    const data = JSON.parse(msg.toString());
                    if (data.type === 'WA_SERVER_RESPONSE') {
                        clearTimeout(timer);
                        try { client.close(); } catch(e){}
                        return resolve({ success: true, ip: data.ip || rinfo.address, version: data.version });
                    }
                } catch(e){}
            });

            timer = setTimeout(() => {
                try { client.close(); } catch(e){}
                resolve({ success: false, error: 'لم يتم العثور على سيرفر نشط في الشبكة المحلية' });
            }, 2500);
        } catch(e) {
            if (client) try { client.close(); } catch(err){}
            resolve({ success: false, error: e.message });
        }
    });
});

ipcMain.handle('get-app-version', () => APP_VERSION);

ipcMain.handle('check-app-update', async (event, targetIp) => {
    const ip = targetIp || syncTargetIp;
    if (!ip) return { hasUpdate: false, currentVersion: APP_VERSION };
    try {
        const responseData = await makeHttpRequest('GET', '/app-version', null, ip);
        const { version: serverVersion } = JSON.parse(responseData);
        
        if (serverVersion && isVersionHigher(serverVersion, APP_VERSION)) {
            const updatePkg = await makeHttpRequest('GET', '/update-package', null, ip);
            return {
                hasUpdate: true,
                currentVersion: APP_VERSION,
                serverVersion: serverVersion,
                updateInfo: JSON.parse(updatePkg)
            };
        }
        return { hasUpdate: false, currentVersion: APP_VERSION, serverVersion };
    } catch (e) {
        return { hasUpdate: false, error: e.message, currentVersion: APP_VERSION };
    }
});

ipcMain.handle('test-connection', async (event, targetIp) => {
    try {
        const data = await makeHttpRequest('GET', '/ping-client', null, targetIp);
        const parsed = JSON.parse(data);
        return { success: true, version: parsed.version };
    } catch (e) {
        return { success: false, error: e.message };
    }
});

ipcMain.handle('get-local-ip', () => getLocalIpAddress());

ipcMain.handle('set-sync-mode', (event, mode, ip) => {
    syncMode = mode;
    syncTargetIp = ip || '';
    if (mode === 'SERVER') {
        startSyncServer();
    } else {
        stopSyncServer();
    }
    return true;
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1250,
    height: 850,
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    for(let id in runningProcesses) {
        try { runningProcesses[id].kill(); } catch(e){}
    }
    app.quit();
  }
});

// Helper for making HTTP requests in Client mode
function makeHttpRequest(method, reqPath, body = null, targetHost = null) {
    return new Promise((resolve, reject) => {
        const host = targetHost || syncTargetIp;
        if (!host) return reject(new Error("No target IP configured"));
        const options = {
            hostname: host,
            port: SYNC_PORT,
            path: reqPath,
            method: method,
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        });
        req.on('error', (e) => reject(e));
        req.on('timeout', () => {
            req.destroy();
            reject(new Error("Connection timeout"));
        });
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

ipcMain.handle('get-accounts', async () => {
    if (syncMode === 'CLIENT' && syncTargetIp) {
        try {
            const data = await makeHttpRequest('GET', '/accounts', null, syncTargetIp);
            if (data) return JSON.parse(data);
        } catch (e) {
            console.error("Client Sync Error:", e);
        }
    }
    
    if (fs.existsSync(accountsFile)) {
        try {
            return JSON.parse(fs.readFileSync(accountsFile, 'utf8'));
        } catch (e) {}
    }
    return [];
});

ipcMain.handle('save-accounts', async (event, accounts) => {
    if (syncMode === 'CLIENT' && syncTargetIp) {
        try {
            await makeHttpRequest('POST', '/accounts', accounts, syncTargetIp);
            fs.writeFileSync(accountsFile, JSON.stringify(accounts, null, 2), 'utf8');
            return true;
        } catch (e) {
            return false;
        }
    }

    fs.writeFileSync(accountsFile, JSON.stringify(accounts, null, 2), 'utf8');
    return true;
});

// --- GitHub Releases Auto-Update Engine ---
function checkGitHubReleases(owner = 'omarmans254-ship-it', repo = 'WhatsApp-Pro-Manager') {
    return new Promise((resolve) => {
        const url = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
        const req = https.get(url, {
            headers: { 'User-Agent': 'WhatsApp-Pro-Manager-App' },
            timeout: 8000
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    if (res.statusCode === 200) {
                        const release = JSON.parse(data);
                        const latestTag = release.tag_name ? release.tag_name.replace(/^v/, '') : '';
                        const hasUpdate = isVersionHigher(latestTag, APP_VERSION);
                        
                        let downloadUrl = release.html_url || '';
                        if (release.assets && Array.isArray(release.assets) && release.assets.length > 0) {
                            const exeAsset = release.assets.find(a => a.name.endsWith('.exe'));
                            if (exeAsset) downloadUrl = exeAsset.browser_download_url;
                        }
                        
                        resolve({
                            hasUpdate: hasUpdate,
                            currentVersion: APP_VERSION,
                            latestVersion: latestTag,
                            releaseNotes: release.body || '',
                            downloadUrl: downloadUrl,
                            releaseUrl: release.html_url
                        });
                        return;
                    }
                    resolve({ hasUpdate: false, error: `GitHub API status ${res.statusCode}` });
                } catch(e) {
                    resolve({ hasUpdate: false, error: e.message });
                }
            });
        });
        req.on('error', (err) => resolve({ hasUpdate: false, error: err.message }));
        req.on('timeout', () => { req.destroy(); resolve({ hasUpdate: false, error: 'Timeout' }); });
    });
}

ipcMain.handle('check-github-update', async (event, owner, repo) => {
    return await checkGitHubReleases(owner || 'omarmans254-ship-it', repo || 'WhatsApp-Pro-Manager');
});

ipcMain.handle('open-external', async (event, url) => {
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
        shell.openExternal(url);
        return true;
    }
    return false;
});

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        const request = (targetUrl) => {
            const client = targetUrl.startsWith('https') ? https : http;
            client.get(targetUrl, { headers: { 'User-Agent': 'WhatsApp-Pro-Manager-App' } }, (response) => {
                if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                    return request(response.headers.location);
                }
                if (response.statusCode !== 200) {
                    return reject(new Error(`Download failed with status ${response.statusCode}`));
                }
                response.pipe(file);
                file.on('finish', () => {
                    file.close(() => resolve(dest));
                });
            }).on('error', (err) => {
                fs.unlink(dest, () => reject(err));
            });
        };
        request(url);
    });
}

ipcMain.handle('download-and-install-update', async (event, downloadUrl) => {
    try {
        if (!downloadUrl) return { success: false, error: 'No download URL' };
        const tempPath = path.join(app.getPath('temp'), `WhatsApp_Setup_${Date.now()}.exe`);
        await downloadFile(downloadUrl, tempPath);
        
        spawn(tempPath, [], { detached: true, stdio: 'ignore' }).unref();
        
        setTimeout(() => {
            app.quit();
        }, 1500);
        
        return { success: true, path: tempPath };
    } catch(e) {
        return { success: false, error: e.message };
    }
});

// --- Backup & Restore ---
ipcMain.handle('backup-data', async () => {
    try {
        const zip = new AdmZip();
        if (fs.existsSync(accountsFile)) {
            zip.addLocalFile(accountsFile);
        }
        const profilesDir = path.join(dataDir, 'ChromeProfiles');
        if (fs.existsSync(profilesDir)) {
            zip.addLocalFolder(profilesDir, 'ChromeProfiles');
        }
        
        const desktopPath = app.getPath('desktop');
        const backupPath = path.join(desktopPath, `WhatsApp_Backup_${Date.now()}.zip`);
        
        zip.writeZip(backupPath);
        return { success: true, path: backupPath };
    } catch (e) {
        return { success: false, error: e.message };
    }
});

ipcMain.handle('restore-data', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
        title: 'اختر ملف النسخة الاحتياطية (zip)',
        properties: ['openFile'],
        filters: [{ name: 'Zip Archives', extensions: ['zip'] }]
    });
    
    if (canceled || filePaths.length === 0) return { success: false, canceled: true };
    
    try {
        const zip = new AdmZip(filePaths[0]);
        zip.extractAllTo(dataDir, true); // Overwrite existing
        return { success: true };
    } catch (e) {
        return { success: false, error: e.message };
    }
});

// Launch Chrome for a specific account
ipcMain.handle('launch-chrome', async (event, accountId) => {
    if (!chromeExecutable) return { success: false, error: 'Google Chrome غير مثبت على جهازك، يرجى تثبيته أولاً.' };
    
    const profilePath = path.join(app.getPath('userData'), 'ChromeProfiles', accountId);
    if (!fs.existsSync(profilePath)) fs.mkdirSync(profilePath, { recursive: true });

    // --- Generate Dynamic Extension ---
    const extDir = path.join(app.getPath('userData'), 'Extensions', accountId);
    if (!fs.existsSync(extDir)) fs.mkdirSync(extDir, { recursive: true });
    
    fs.writeFileSync(path.join(extDir, 'manifest.json'), JSON.stringify({
        name: "WA Tracker", version: "1.0", manifest_version: 3,
        content_scripts: [{ matches: ["https://web.whatsapp.com/*"], js: ["content.js"] }]
    }));
    
    fs.writeFileSync(path.join(extDir, 'content.js'), `
        setInterval(() => {
            const isLoggedIn = !!document.querySelector('#side');
            fetch('http://127.0.0.1:${extensionPort}/ping?id=${accountId}&loggedIn=' + isLoggedIn).catch(()=>{}).then(()=>null);
        }, 4000);
    `);

    if (runningProcesses[accountId]) {
        return { success: true, status: 'ALREADY_RUNNING' };
    }

    try {
        const chromeProcess = spawn(chromeExecutable, [
            `--app=https://web.whatsapp.com`,
            `--user-data-dir=${profilePath}`,
            `--no-first-run`,
            `--no-default-browser-check`,
            `--load-extension=${extDir}`,
            `--enable-low-end-device-mode`,
            `--disable-dev-shm-usage`,
            `--disable-gpu`,
            `--disable-software-rasterizer`,
            `--disable-background-networking`,
            `--disable-background-timer-throttling`,
            `--disable-backgrounding-occluded-windows`,
            `--disable-breakpad`,
            `--renderer-process-limit=2`,
            `--js-flags=--max-old-space-size=256`
        ]);

        runningProcesses[accountId] = chromeProcess;
        accountStates[accountId] = { startTime: Date.now(), loggedIn: false };

        chromeProcess.on('exit', () => {
            delete runningProcesses[accountId];
            delete accountStates[accountId];
        });
        
        return { success: true };
    } catch (e) {
        return { success: false, error: e.message };
    }
});

// Stop Chrome for a specific account (without wiping session)
ipcMain.handle('stop-chrome', async (event, accountId) => {
    if (runningProcesses[accountId]) {
        try {
            runningProcesses[accountId].kill();
            delete runningProcesses[accountId];
            delete accountStates[accountId];
            return { success: true };
        } catch (e) {
            return { success: false, error: e.message };
        }
    }
    return { success: true };
});

// Check which chrome processes are currently running
ipcMain.handle('get-status', (event) => {
    const status = {};
    for (const id in runningProcesses) {
        status[id] = { 
            state: 'RUNNING',
            startTime: accountStates[id]?.startTime || Date.now(),
            loggedIn: accountStates[id]?.loggedIn || false
        };
    }
    return status;
});

// Reset Account Session
ipcMain.handle('clear-session', async (event, accountId) => {
    if (runningProcesses[accountId]) {
        try {
            runningProcesses[accountId].kill();
            delete runningProcesses[accountId];
        } catch(e){}
    }
    
    await new Promise(r => setTimeout(r, 1000));

    const profilePath = path.join(app.getPath('userData'), 'ChromeProfiles', accountId);
    if (fs.existsSync(profilePath)) {
        try {
            fs.rmSync(profilePath, { recursive: true, force: true });
            return { success: true };
        } catch (error) {
            return { success: false, error: 'لم نتمكن من مسح الملفات لأن المتصفح ربما لا يزال قيد التشغيل في الخلفية.' };
        }
    }
    return { success: true };
});

// --- Memory & Cache Management ---
function getDirSize(dirPath) {
    let size = 0;
    if (!fs.existsSync(dirPath)) return 0;
    try {
        const files = fs.readdirSync(dirPath, { withFileTypes: true });
        for (const file of files) {
            const filePath = path.join(dirPath, file.name);
            if (file.isDirectory()) {
                size += getDirSize(filePath);
            } else {
                try { size += fs.statSync(filePath).size; } catch(e){}
            }
        }
    } catch (e) {}
    return size;
}

function cleanProfileCache(profileDir) {
    let freedBytes = 0;
    if (!fs.existsSync(profileDir)) return freedBytes;

    const relativeCacheDirs = [
        'Cache',
        'Code Cache',
        'GPUCache',
        'Crashpad',
        'ShaderCache',
        path.join('Default', 'Cache'),
        path.join('Default', 'Code Cache'),
        path.join('Default', 'GPUCache'),
        path.join('Default', 'Service Worker', 'CacheStorage'),
        path.join('Default', 'Service Worker', 'ScriptCache')
    ];

    for (const relDir of relativeCacheDirs) {
        const targetDir = path.join(profileDir, relDir);
        if (fs.existsSync(targetDir)) {
            const dirSize = getDirSize(targetDir);
            try {
                fs.rmSync(targetDir, { recursive: true, force: true });
                freedBytes += dirSize;
            } catch (e) {}
        }
    }
    return freedBytes;
}

ipcMain.handle('clean-cache', async (event, accountId) => {
    const profilesDir = path.join(app.getPath('userData'), 'ChromeProfiles');
    let totalFreed = 0;

    if (!fs.existsSync(profilesDir)) {
        return { success: true, freedMB: 0 };
    }

    if (accountId) {
        const targetProfile = path.join(profilesDir, accountId);
        totalFreed += cleanProfileCache(targetProfile);
    } else {
        const entries = fs.readdirSync(profilesDir, { withFileTypes: true });
        for (const entry of entries) {
            if (entry.isDirectory()) {
                const targetProfile = path.join(profilesDir, entry.name);
                totalFreed += cleanProfileCache(targetProfile);
            }
        }
    }

    const freedMB = (totalFreed / (1024 * 1024)).toFixed(2);
    return { success: true, freedMB: parseFloat(freedMB), freedBytes: totalFreed };
});

ipcMain.handle('get-storage-usage', async () => {
    const profilesDir = path.join(app.getPath('userData'), 'ChromeProfiles');
    let totalSize = 0;
    if (fs.existsSync(profilesDir)) {
        totalSize = getDirSize(profilesDir);
    }
    const totalMB = (totalSize / (1024 * 1024)).toFixed(2);
    return { totalMB: parseFloat(totalMB), totalBytes: totalSize };
});


