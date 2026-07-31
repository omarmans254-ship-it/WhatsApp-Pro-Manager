const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  clearSession: (accountId) => ipcRenderer.invoke('clear-session', accountId),
  launchChrome: (accountId) => ipcRenderer.invoke('launch-chrome', accountId),
  stopChrome: (accountId) => ipcRenderer.invoke('stop-chrome', accountId),
  getStatus: () => ipcRenderer.invoke('get-status'),
  getAccounts: () => ipcRenderer.invoke('get-accounts'),
  saveAccounts: (accounts) => ipcRenderer.invoke('save-accounts', accounts),
  backupData: () => ipcRenderer.invoke('backup-data'),
  restoreData: () => ipcRenderer.invoke('restore-data'),
  checkSecurity: () => ipcRenderer.invoke('check-security'),
  setPin: (pin) => ipcRenderer.invoke('set-pin', pin),
  verifyPin: (pin) => ipcRenderer.invoke('verify-pin', pin),
  getLocalIp: () => ipcRenderer.invoke('get-local-ip'),
  setSyncMode: (mode, ip) => ipcRenderer.invoke('set-sync-mode', mode, ip),
  cleanCache: (accountId) => ipcRenderer.invoke('clean-cache', accountId),
  getStorageUsage: () => ipcRenderer.invoke('get-storage-usage'),
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  checkAppUpdate: (targetIp) => ipcRenderer.invoke('check-app-update', targetIp),
  getConnectedClients: () => ipcRenderer.invoke('get-connected-clients'),
  autoDiscoverServer: () => ipcRenderer.invoke('auto-discover-server'),
  testConnection: (targetIp) => ipcRenderer.invoke('test-connection', targetIp),
  checkGitHubUpdate: (owner, repo) => ipcRenderer.invoke('check-github-update', owner, repo),
  openExternal: (url) => ipcRenderer.invoke('open-external', url)
});



