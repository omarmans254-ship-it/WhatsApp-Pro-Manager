document.addEventListener('DOMContentLoaded', () => {
const i18n = {
    ar: {
        app_title: 'مدير واتساب المتقدم', vault_title: 'خزنة الأمان', vault_subtitle: 'الرجاء إدخال الرقم السري (PIN)', my_accounts: 'حساباتي', add_account_btn: 'إضافة حساب جديد', search_placeholder: 'ابحث بالاسم أو الرقم...', select_all: 'تحديد الكل', start_chrome: 'تشغيل كروم', dashboard_title: 'لوحة التحكم', dashboard_subtitle: 'يتم تشغيل الحسابات في متصفحات خارجية لضمان أفضل أداء.', network_btn: 'الشبكة المحلية', clean_cache_btn: 'تنظيف الذاكرة', clean_cache_title: 'تنظيف الذاكرة المؤقتة (Cache)', backup_btn: 'نسخة احتياطية', restore_btn: 'استعادة البيانات', total_accounts: 'إجمالي الحسابات', active_accounts: 'الحسابات النشطة الآن', system_logs: 'سجل النظام (System Logs)', add_modal_title: 'إضافة حساب جديد', account_name_label: 'اسم الحساب', account_name_placeholder: 'مثال: حساب العمل، خدمة العملاء...', account_phone_label: 'رقم الهاتف', cancel_btn: 'إلغاء', save_btn: 'حفظ وإضافة', network_modal_title: 'إعدادات المزامنة المحلية (LAN)', network_modal_subtitle: 'مزامنة الحسابات بين الأجهزة في نفس الشركة (بدون إنترنت).', server_title: '🖥️ الجهاز الرئيسي (السيرفر)', start_server_btn: 'تشغيل كسيرفر أساسي', client_title: '💻 الارتباط كسيرفر فرعي (عميل)', auto_discover_btn: '🔍 البحث التلقائي عن السيرفر', test_conn_btn: '⚡ فحص الاتصال', server_ip_label: 'أدخل الـ IP الخاص بالجهاز الرئيسي:', server_ip_placeholder: 'مثال: 192.168.1.5', connect_client_btn: 'ارتباط بالسيرفر', disconnect_btn: 'إلغاء المزامنة والعودة للوضع المحلي', status_waiting: 'يحتاج مسح ⏳', status_scanned: 'متصل ✔️', no_accounts: 'لا توجد حسابات.<br>اضغط على أيقونة <strong>(+) المضيئة</strong> للإضافة.', sys_started: 'تم تشغيل لوحة تحكم مدير واتساب بنجاح.', btn_start_server_active: 'شغال كسيرفر الآن ✔️', btn_client_active: 'متصل بنجاح ✔️', toast_server_started: 'تم تشغيل السيرفر بنجاح!', toast_ip_required: 'يرجى إدخال IP السيرفر', toast_connected: 'تم الارتباط بالسيرفر بنجاح!', toast_disconnected: 'تم قطع المزامنة والعودة للوضع المحلي.', toast_account_added: 'تم إضافة الحساب بنجاح!', toast_fill_fields: 'يرجى إدخال اسم الحساب أولاً!', toast_invalid_phone: 'عفواً، صيغة رقم الهاتف غير صحيحة.', toast_backup_success: 'تم إنشاء النسخة الاحتياطية على سطح المكتب!', toast_backup_failed: 'فشل النسخ:', toast_restore_success: 'تمت استعادة حساباتك بنجاح!', toast_restore_failed: 'حدث خطأ أثناء استعادة البيانات.', toast_please_select: 'يرجى تحديد حساب واحد على الأقل أولاً.', change_pin_btn: 'تغيير PIN', log_sys: 'النظام', log_launching: 'جاري طلب تشغيل المتصفح...', log_already_running: 'المتصفح قيد التشغيل بالفعل.', log_launch_success: 'تم فتح نافذة المتصفح بنجاح.', log_launch_fail: 'فشل التشغيل:', toast_launch_err: 'حدث خطأ أثناء تشغيل', action_launch: 'فتح المتصفح', action_stop: 'إغلاق المتصفح', action_reset: 'إعادة تعيين (مسح بيانات المتصفح)', action_delete: 'حذف الحساب من القائمة', chart_active: 'نشط', chart_closed: 'مغلق', vault_setup: 'إعداد لأول مرة', vault_setup_sub: 'أدخل 4 أرقام لإنشاء رقمك السري (PIN)', toast_cache_cleaned: 'تم تنظيف الذاكرة المؤقتة وتحرير {mb} ميجابايت بنجاح!', log_cleaning_cache: 'جاري فحص وتنظيف الذاكرة المؤقتة للمتصفحات...'
    },
    en: {
        app_title: 'WhatsApp Pro Manager', vault_title: 'Security Vault', vault_subtitle: 'Please enter your PIN', my_accounts: 'My Accounts', add_account_btn: 'Add New Account', search_placeholder: 'Search by name or number...', select_all: 'Select All', start_chrome: 'Launch Chrome', dashboard_title: 'Dashboard', dashboard_subtitle: 'Accounts run in external browsers for optimal performance.', network_btn: 'LAN Sync', clean_cache_btn: 'Clean Cache', clean_cache_title: 'Clean Temporary Cache Files', backup_btn: 'Backup', restore_btn: 'Restore Data', total_accounts: 'Total Accounts', active_accounts: 'Active Accounts', system_logs: 'System Logs', add_modal_title: 'Add New Account', account_name_label: 'Account Name', account_name_placeholder: 'e.g., Work Account, Support...', account_phone_label: 'Phone Number', cancel_btn: 'Cancel', save_btn: 'Save & Add', network_modal_title: 'LAN Sync Settings', network_modal_subtitle: 'Sync accounts across devices in the same office (Offline).', server_title: '🖥️ Main Device (Host Server)', start_server_btn: 'Start as Host Server', client_title: '💻 Connect as Sub-Client', auto_discover_btn: '🔍 Auto-Discover Server', test_conn_btn: '⚡ Test Connection', server_ip_label: 'Enter Host Server IP Address:', server_ip_placeholder: 'e.g., 192.168.1.5', connect_client_btn: 'Connect to Server', disconnect_btn: 'Disconnect & Return to Local Mode', status_waiting: 'Needs Scan ⏳', status_scanned: 'Connected ✔️', no_accounts: 'No accounts found.<br>Click the bright <strong>(+) icon</strong> to add one.', sys_started: 'WhatsApp Manager Dashboard started successfully.', btn_start_server_active: 'Running as Server ✔️', btn_client_active: 'Connected ✔️', toast_server_started: 'Server started successfully!', toast_ip_required: 'Please enter the server IP.', toast_connected: 'Connected to server successfully!', toast_disconnected: 'Disconnected. Returned to local mode.', toast_account_added: 'Account added successfully!', toast_fill_fields: 'Please enter the account name first!', toast_invalid_phone: 'Sorry, the phone number format is incorrect.', toast_backup_success: 'Backup created on Desktop successfully!', toast_backup_failed: 'Backup failed:', toast_restore_success: 'Accounts restored successfully!', toast_restore_failed: 'An error occurred while restoring data.', toast_please_select: 'Please select at least one account first.', change_pin_btn: 'Change PIN', log_sys: 'System', log_launching: 'Requesting browser launch...', log_already_running: 'Browser is already running.', log_launch_success: 'Browser window opened successfully.', log_launch_fail: 'Launch failed:', toast_launch_err: 'An error occurred while launching', action_launch: 'Open Browser', action_stop: 'Close Browser', action_reset: 'Reset (Clear Browser Data)', action_delete: 'Delete Account from List', chart_active: 'Active', chart_closed: 'Closed', vault_setup: 'First Time Setup', vault_setup_sub: 'Enter 4 digits to create your PIN', toast_cache_cleaned: 'Cache cleaned! Freed {mb} MB successfully.', log_cleaning_cache: 'Scanning & cleaning temporary browser cache...'
    }
};

let currentLang = localStorage.getItem("wa_manager_lang") || "ar";

function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("wa_manager_lang", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (i18n[lang][key]) el.innerHTML = i18n[lang][key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (i18n[lang][key]) el.setAttribute("placeholder", i18n[lang][key]);
    });
    document.querySelectorAll("[data-i18n-title]").forEach(el => {
        const key = el.getAttribute("data-i18n-title");
        if (i18n[lang][key]) el.setAttribute("title", i18n[lang][key]);
    });
    const toggleBtn = document.getElementById("lang-toggle-btn");
    if (toggleBtn) {
        toggleBtn.innerHTML = lang === "ar" ? "English 🇺🇸" : "العربية 🇸🇦";
        toggleBtn.style.fontFamily = lang === "en" ? "'Inter', sans-serif" : "'Cairo', sans-serif";
    }
    if (typeof dashboardChart !== 'undefined' && dashboardChart) {
       dashboardChart.data.labels = [i18n[lang].chart_active, i18n[lang].chart_closed];
       dashboardChart.update();
    }
    if (typeof renderAccounts === 'function') renderAccounts();
}

  const accountsList = document.getElementById('accounts-list');
  
  // Dashboard Elements
  const totalAccountsCount = document.getElementById('total-accounts-count');
  const activeAccountsCount = document.getElementById('active-accounts-count');
  const logsContainer = document.getElementById('logs-container');
  const clearLogsBtn = document.getElementById('clear-logs-btn');

  // Modal Elements
  const modal = document.getElementById('add-modal');
  const openModalBtn = document.getElementById('open-modal-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const cancelModalBtn = document.getElementById('cancel-modal-btn');
  const submitAccountBtn = document.getElementById('submit-account-btn');
  const newAccountNameInput = document.getElementById('new-account-name');
  const newAccountNumberInput = document.getElementById('new-account-number');

  // Search & Themes
  const searchInput = document.getElementById('search-input');
  const themeSelect = document.getElementById('theme-select');

  // Multi-select Actions
  const selectAllCb = document.getElementById('select-all-cb');
  const startSelectedBtn = document.getElementById('start-selected-btn');
  
  const backupBtn = document.getElementById('backup-btn');
  const restoreBtn = document.getElementById('restore-btn');
  const cleanCacheBtn = document.getElementById('clean-cache-btn');

  let accounts = [];
  let currentRunningStatuses = {}; // Cache from main process
  let dashboardChart = null;
  
  // --- Security Vault Logic ---
  const vaultContainer = document.getElementById('security-vault');
  const mainApp = document.getElementById('main-app');
  const vaultTitle = document.getElementById('vault-title');
  const vaultSubtitle = document.getElementById('vault-subtitle');
  const pinDots = document.querySelectorAll('.pin-dot');
  const numBtns = document.querySelectorAll('.num-btn[data-val]');
  const pinClear = document.getElementById('pin-clear');
  const pinEnter = document.getElementById('pin-enter');
  const changePinBtn = document.getElementById('change-pin-btn');
  
  let currentPin = '';
  let isSettingPin = false;
  let isChangingPin = false;



  async function checkSecurityState() {
      if (vaultContainer) vaultContainer.style.display = 'none';
      if (mainApp) mainApp.style.display = 'flex';
      initApp();
  }


  function updateDots(error = false) {
      pinDots.forEach((dot, i) => {
          dot.className = 'pin-dot';
          if (error) {
              dot.classList.add('error');
          } else if (i < currentPin.length) {
              dot.classList.add('filled');
          }
      });
  }

  function handleNumClick(val) {
      if (currentPin.length < 4) {
          currentPin += val;
          updateDots();
      }
  }

  numBtns.forEach(btn => {
      btn.addEventListener('click', () => handleNumClick(btn.dataset.val));
  });

  pinClear.addEventListener('click', () => {
      currentPin = '';
      updateDots();
  });

  pinEnter.addEventListener('click', async () => {
      if (currentPin.length !== 4) return;
      
      if (isSettingPin) {
          await window.electronAPI.setPin(currentPin);
          if (isChangingPin) {
              showToast(currentLang === 'ar' ? 'تم تغيير الرقم السري بنجاح!' : 'PIN changed successfully!', 'success');
              isChangingPin = false;
          }
          unlockApp();
      } else {
          const isValid = await window.electronAPI.verifyPin(currentPin);
          if (isValid) {
              unlockApp();
          } else {
              // Error animation
              document.querySelector('.vault-box').classList.add('shake');
              updateDots(true);
              setTimeout(() => {
                  document.querySelector('.vault-box').classList.remove('shake');
                  currentPin = '';
                  updateDots();
              }, 400);
          }
      }
  });
  
  document.addEventListener('keydown', (e) => {
      if (vaultContainer.style.display !== 'none') {
          if (e.key >= '0' && e.key <= '9') handleNumClick(e.key);
          if (e.key === 'Backspace') pinClear.click();
          if (e.key === 'Enter') pinEnter.click();
      }
  });

  function unlockApp() {
      vaultContainer.style.display = 'none';
      mainApp.style.display = 'flex';
      initApp();
  }

  // Initialize App (Runs after unlock)
  async function initApp() {
      // Migrate or load from secure storage
      accounts = await window.electronAPI.getAccounts();
      
      // If accounts is empty, it might be first run or locked.
      // But we are guaranteed unlocked here.
      if (accounts.length === 0) {
          const ls = JSON.parse(localStorage.getItem('whatsapp_accounts_v2')) || [];
          if (ls.length > 0) {
              accounts = ls;
              await window.electronAPI.saveAccounts(accounts);
          }
      }
      
      initChart();
      renderAccounts();
      updateDashboardStats();
      startStatusPoller();
      startUptimeTicker();
      
      addLog(i18n[currentLang].log_sys, i18n[currentLang].sys_started, 'success');
  }

  // --- Themes System ---
  const themeChartColors = {
      night: '#9d4edd',
      gold: '#ffb703',
      fire: '#ff2a5f',
      matrix: '#00ff66',
      ice: '#00e5ff',
      sakura: '#ff70a6',
      ghost: '#e0e0e0',
      aurora: '#00f5d4',
      sunset: '#ff6b35',
      ocean: '#0096c7',
      espresso: '#d4a373',
      synthwave: '#f15bb5'
  };

  function applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('wa_manager_theme', theme);
      if (themeSelect) themeSelect.value = theme;
      if (typeof dashboardChart !== 'undefined' && dashboardChart && dashboardChart.data) {
          dashboardChart.data.datasets[0].backgroundColor[0] = themeChartColors[theme] || '#9d4edd';
          dashboardChart.update();
      }
  }
  const savedTheme = localStorage.getItem('wa_manager_theme') || 'night';
  applyTheme(savedTheme);

  if (themeSelect) {
      themeSelect.addEventListener('change', (e) => applyTheme(e.target.value));
  }

  // --- Search System ---
  if (searchInput) {
      searchInput.addEventListener('input', () => renderAccounts());
  }

  // Check security vault on startup
  checkSecurityState();

  const langToggleBtn = document.getElementById('lang-toggle-btn');
  if (langToggleBtn) {
      langToggleBtn.addEventListener('click', () => {
          applyLanguage(currentLang === 'ar' ? 'en' : 'ar');
      });
  }
  applyLanguage(currentLang);
  
  async function displayAppVersion() {
      try {
          const version = await window.electronAPI.getAppVersion();
          const badge = document.getElementById('app-version-badge');
          if (badge) badge.textContent = 'v' + version;
      } catch(e) {}
  }

  async function initNetwork() {
      const savedMode = localStorage.getItem('wa_sync_mode') || 'LOCAL';
      const savedIp = localStorage.getItem('wa_sync_ip') || '';
      await window.electronAPI.setSyncMode(savedMode, savedIp);
  }
  
  displayAppVersion();
  initNetwork();

  let isUpdating = false;

  async function checkForInstantAutoUpdate(showNoUpdateToast = false) {
      if (isUpdating) return;
      try {
          const res = await window.electronAPI.checkGitHubUpdate();
          if (res && res.hasUpdate && res.downloadUrl) {
              isUpdating = true;
              showToast(currentLang === 'ar' ? `🚀 يتوفر تحديث جديد v${res.latestVersion}! جاري التنزيل والتثبيت التلقائي...` : `🚀 New update v${res.latestVersion} found! Auto-installing...`, 'success');
              addLog(i18n[currentLang].log_sys, `تم اكتشاف تحديث v${res.latestVersion}. جاري التثبيت التلقائي...`, 'success');
              const dlRes = await window.electronAPI.downloadAndInstallUpdate(res.downloadUrl);
              if (!dlRes.success) {
                  window.electronAPI.openExternal(res.downloadUrl);
              }
          } else if (showNoUpdateToast) {
              showToast(currentLang === 'ar' ? `أنت تستخدم أحدث إصدار v${res.currentVersion || '1.0.0'}` : `You are using the latest version v${res.currentVersion || '1.0.0'}`, 'success');
          }
      } catch(e) {}
  }

  // Trigger instant check 2 seconds after startup
  setTimeout(() => checkForInstantAutoUpdate(false), 2000);
  // Check periodically every 5 minutes
  setInterval(() => checkForInstantAutoUpdate(false), 300000);

  const githubUpdateBtn = document.getElementById('github-update-btn');
  if (githubUpdateBtn) {
      githubUpdateBtn.addEventListener('click', async () => {
          showToast(currentLang === 'ar' ? 'جاري فحص تحديثات GitHub...' : 'Checking GitHub updates...', 'info');
          await checkForInstantAutoUpdate(true);
      });
  }

  // --- Add Account Modal Logic ---
  if (openModalBtn) {
      openModalBtn.addEventListener('click', () => {
          newAccountNameInput.value = '';
          newAccountNumberInput.value = '';
          modal.classList.add('active');
          setTimeout(() => {
            if (newAccountNumberInput) newAccountNumberInput.focus();
          }, 100);
      });
  }
  if (closeModalBtn) closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));
  if (cancelModalBtn) cancelModalBtn.addEventListener('click', () => modal.classList.remove('active'));
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });

  // Global Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
      // Escape to close modal
      if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
          modal.classList.remove('active');
      }
      // Ctrl+F to focus search
      if (e.ctrlKey && e.key === 'f') {
          e.preventDefault();
          if (searchInput) searchInput.focus();
      }
      // Ctrl+N to add new account
      if (e.ctrlKey && e.key === 'n') {
          e.preventDefault();
          if (openModalBtn) openModalBtn.click();
      }
  });

  if (submitAccountBtn) {
      submitAccountBtn.addEventListener('click', async () => {
          let name = newAccountNameInput.value.trim();
          let phone = newAccountNumberInput.value.trim();

          // If user didn't enter a name, use phone number as name
          if (!name) name = phone;
          
          if (!name && !phone) return showToast(i18n[currentLang].toast_fill_fields, 'error');

          const newAccount = {
              id: 'acc_' + Date.now(),
              name: name,
              phone: phone || ''
          };

          try {
              if (!accounts) accounts = [];
              accounts.push(newAccount);
              localStorage.setItem('whatsapp_accounts_v2', JSON.stringify(accounts));
              await window.electronAPI.saveAccounts(accounts);
              renderAccounts();
              updateDashboardStats();
              
              // Reset input values
              newAccountNameInput.value = '';
              newAccountNumberInput.value = '';
              
              modal.classList.remove('active');
              showToast(i18n[currentLang].toast_account_added, 'success');
              addLog(i18n[currentLang].log_sys, `تم إضافة حساب جديد: ${name}`, 'success');
          } catch(e) {
              console.error(e);
              showToast('Error saving account: ' + e.message, 'error');
          }
      });
  }

  if (newAccountNameInput) {
      newAccountNameInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && submitAccountBtn) submitAccountBtn.click();
      });
  }
  if (newAccountNumberInput) {
      newAccountNumberInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && submitAccountBtn) submitAccountBtn.click();
      });
  }

  // --- Toast System ---
  function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `neon-toast ${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.3s forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // --- Dashboard Logs System ---
  function addLog(accountName, message, type = 'info') {
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    
    const time = new Date().toLocaleTimeString('ar-EG');
    
    logEntry.innerHTML = `
        <span class="log-time">[${time}]</span>
        <strong>${accountName}:</strong> 
        <span class="log-msg ${type}">${message}</span>
    `;
    logsContainer.prepend(logEntry); // Add to top
    
    // keep max 50 logs
    if(logsContainer.children.length > 50) {
        logsContainer.removeChild(logsContainer.lastChild);
    }
  }

  clearLogsBtn.addEventListener('click', () => {
      logsContainer.innerHTML = '';
      addLog(i18n[currentLang].log_sys, currentLang === 'ar' ? 'تم مسح السجل.' : 'Logs cleared.', 'info');
  });

  function updateDashboardStats() {
      totalAccountsCount.textContent = accounts.length;
      const activeCount = Object.keys(currentRunningStatuses).length;
      activeAccountsCount.textContent = activeCount;
      
      if (dashboardChart) {
          dashboardChart.data.datasets[0].data = [activeCount, accounts.length - activeCount];
          dashboardChart.update();
      }
  }

  function initChart() {
      const ctx = document.getElementById('analytics-chart').getContext('2d');
      dashboardChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
              labels: ['نشط', 'مغلق'],
              datasets: [{
                  data: [0, accounts.length],
                  backgroundColor: ['#00ff88', '#2a2a35'],
                  borderWidth: 0,
                  hoverOffset: 4
              }]
          },
          options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                  legend: { position: 'right', labels: { color: '#8892b0', font: { family: 'Cairo' } } }
              },
              cutout: '75%'
          }
      });
  }

  // --- Backup & Restore ---
  backupBtn.addEventListener('click', async () => {
      addLog(i18n[currentLang].log_sys, currentLang === 'ar' ? 'جاري إعداد النسخة الاحتياطية...' : 'Preparing backup...', 'info');
      showToast(currentLang === 'ar' ? 'يتم الآن ضغط ملفاتك وتأمينها...' : 'Compressing and securing files...', 'info');
      const res = await window.electronAPI.backupData();
      if (res.success) {
          addLog(i18n[currentLang].log_sys, currentLang === 'ar' ? 'تم حفظ النسخة بنجاح على سطح المكتب' : 'Backup saved to desktop.', 'success');
          showToast(i18n[currentLang].toast_backup_success, 'success');
      } else {
          addLog(i18n[currentLang].log_sys, i18n[currentLang].toast_backup_failed + ' ' + res.error, 'error');
      }
  });

  restoreBtn.addEventListener('click', async () => {
      addLog(i18n[currentLang].log_sys, currentLang === 'ar' ? 'بانتظار تحديد ملف النسخة الاحتياطية...' : 'Waiting for backup file selection...', 'info');
      const res = await window.electronAPI.restoreData();
      if (res.success) {
          addLog(i18n[currentLang].log_sys, currentLang === 'ar' ? 'تمت استعادة البيانات بنجاح! سيتم إعادة التحميل.' : 'Data restored! Reloading...', 'success');
          showToast(i18n[currentLang].toast_restore_success, 'success');
          setTimeout(() => location.reload(), 1500);
      } else if (!res.canceled) {
          addLog(i18n[currentLang].log_sys, currentLang === 'ar' ? `فشل الاستعادة: ${res.error}` : `Restore failed: ${res.error}`, 'error');
          showToast(i18n[currentLang].toast_restore_failed, 'error');
      }
  });

  if (cleanCacheBtn) {
      cleanCacheBtn.addEventListener('click', async () => {
          addLog(i18n[currentLang].log_sys, i18n[currentLang].log_cleaning_cache, 'info');
          showToast(currentLang === 'ar' ? 'جاري فحص وتنظيف الملفات المؤقتة...' : 'Scanning & cleaning temporary files...', 'info');
          try {
              const res = await window.electronAPI.cleanCache();
              if (res.success) {
                  const msg = i18n[currentLang].toast_cache_cleaned.replace('{mb}', res.freedMB);
                  addLog(i18n[currentLang].log_sys, msg, 'success');
                  showToast(msg, 'success');
              } else {
                  addLog(i18n[currentLang].log_sys, currentLang === 'ar' ? 'حدث خطأ أثناء تنظيف الذاكرة' : 'Error cleaning cache', 'error');
              }
          } catch(e) {
              addLog(i18n[currentLang].log_sys, currentLang === 'ar' ? 'فشل تنظيف الذاكرة المؤقتة' : 'Failed to clean cache', 'error');
          }
      });
  }



  // --- Modal Logic ---
  function openModal() {
    modal.classList.add('active');
    newAccountNameInput.value = '';
    newAccountNumberInput.value = '';
    setTimeout(() => newAccountNameInput.focus(), 100);
  }

  // --- Handle Checkboxes & Multi-start ---
  selectAllCb.addEventListener('change', (e) => {
    const checkboxes = document.querySelectorAll('.account-checkbox');
    checkboxes.forEach(cb => cb.checked = e.target.checked);
  });

  startSelectedBtn.addEventListener('click', () => {
    const checkedBoxes = document.querySelectorAll('.account-checkbox:checked');
    if (checkedBoxes.length === 0) {
      showToast('يرجى تحديد حساب واحد على الأقل أولاً.', 'error');
      return;
    }
    checkedBoxes.forEach(cb => {
      const id = cb.dataset.id;
      const acc = accounts.find(a => a.id === id);
      if(acc) launchChrome(id, acc.name);
    });
  });

  function renderAccounts() {
    accountsList.innerHTML = '';
    
    let filteredAccounts = accounts;
    if (searchInput && searchInput.value) {
        const term = searchInput.value.toLowerCase();
        filteredAccounts = accounts.filter(a => a.name.toLowerCase().includes(term) || a.phone.includes(term));
    }

    if (filteredAccounts.length === 0) {
      accountsList.innerHTML = '<li style="padding: 30px 20px; text-align: center; color: var(--text-muted); line-height: 1.8;">' + i18n[currentLang].no_accounts + '</li>';
      return;
    }

    filteredAccounts.forEach(acc => {
      const statusObj = currentRunningStatuses[acc.id];
      const isRunning = statusObj && statusObj.state === 'RUNNING';
      const li = document.createElement('li');
      li.className = 'account-item' + (isRunning ? ' active' : '');
      li.onclick = (e) => {
        if (!e.target.closest('.account-actions') && !e.target.closest('.neon-checkbox-label')) {
            launchChrome(acc.id, acc.name);
        }
      };

      // Checkbox
      const checkboxLabel = document.createElement('label');
      checkboxLabel.className = 'neon-checkbox-label';
      checkboxLabel.innerHTML = `
        <input type="checkbox" class="account-checkbox" data-id="${acc.id}">
        <span class="neon-checkbox"></span>
      `;

      // Status Dot
      const statusDot = document.createElement('div');
      statusDot.id = `status_${acc.id}`;
      statusDot.className = 'status-dot' + (isRunning ? ' status-running' : '');
      statusDot.title = isRunning ? 'المتصفح قيد التشغيل' : 'المتصفح مغلق';

      // Account Details
      const detailsDiv = document.createElement('div');
      detailsDiv.className = 'account-details';

      const nameDiv = document.createElement('div');
      nameDiv.className = 'account-name';
      nameDiv.textContent = acc.name;

      const phoneDiv = document.createElement('div');
      phoneDiv.className = 'account-phone';
      phoneDiv.textContent = acc.phone;
      phoneDiv.dir = 'ltr';

      const metaDiv = document.createElement('div');
      metaDiv.style.marginTop = '4px';
      
      if (isRunning) {
          const uptimeBadge = document.createElement('span');
          uptimeBadge.className = 'uptime-badge';
          uptimeBadge.setAttribute('data-starttime', statusObj.startTime);
          uptimeBadge.textContent = '00:00:00';
          
          const loginBadge = document.createElement('span');
          loginBadge.className = 'login-badge ' + (statusObj.loggedIn ? 'scanned' : 'waiting');
          loginBadge.textContent = statusObj.loggedIn ? i18n[currentLang].status_scanned : i18n[currentLang].status_waiting;
          
          metaDiv.appendChild(uptimeBadge);
          metaDiv.appendChild(loginBadge);
      }

      detailsDiv.appendChild(nameDiv);
      detailsDiv.appendChild(phoneDiv);
      if (isRunning) detailsDiv.appendChild(metaDiv);

      // Account Actions (Launch, Reset, Delete)
      const actionsDiv = document.createElement('div');
      actionsDiv.className = 'account-actions';

      // Launch / Stop Chrome btn
      const actionBtn = document.createElement('button');
      if (isRunning) {
          actionBtn.className = 'action-icon btn-stop';
          actionBtn.title = 'إغلاق المتصفح';
          actionBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><rect x="6" y="6" width="12" height="12"></rect></svg>';
          actionBtn.onclick = (e) => {
            e.stopPropagation();
            stopAccount(acc.id, acc.name);
          };
      } else {
          actionBtn.className = 'action-icon btn-launch';
          actionBtn.title = 'فتح المتصفح';
          actionBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>';
          actionBtn.onclick = (e) => {
            e.stopPropagation();
            launchChrome(acc.id, acc.name);
          };
      }

      // Reset (Clear Profile)
      const resetBtn = document.createElement('button');
      resetBtn.className = 'action-icon btn-reset';
      resetBtn.title = 'إعادة تعيين (مسح بيانات المتصفح)';
      resetBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M3 2v6h6"></path><path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path><path d="M21 22v-6h-6"></path><path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path></svg>';
      resetBtn.onclick = async (e) => {
        e.stopPropagation();
        if (confirm(`تحذير: سيتم إغلاق متصفح "${acc.name}" ومسح جميع بيانات الجلسة (Logout) الخاصة به تماماً.\nهل ترغب بالمتابعة؟`)) {
          await resetAccount(acc.id, acc.name);
        }
      };

      // Delete
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'action-icon btn-delete';
      deleteBtn.title = 'حذف الحساب من القائمة';
      deleteBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>';
      deleteBtn.onclick = async (e) => {
        e.stopPropagation();
        if (confirm(`هل أنت متأكد من حذف الحساب "${acc.name}" بشكل دائم؟ سيتم حذف ملفات المتصفح أيضاً.`)) {
          await deleteAccount(acc.id, acc.name);
        }
      };

      actionsDiv.appendChild(actionBtn);
      actionsDiv.appendChild(resetBtn);
      actionsDiv.appendChild(deleteBtn);

      li.appendChild(checkboxLabel);
      li.appendChild(statusDot);
      li.appendChild(detailsDiv);
      li.appendChild(actionsDiv);
      accountsList.appendChild(li);
    });
  }

  // --- External Chrome Interaction ---

  async function launchChrome(id, name) {
      addLog(name, i18n[currentLang].log_launching, 'info');
      try {
          const res = await window.electronAPI.launchChrome(id);
          if (res.success) {
              if (res.status === 'ALREADY_RUNNING') {
                  addLog(name, i18n[currentLang].log_already_running, 'info');
              } else {
                  addLog(name, i18n[currentLang].log_launch_success, 'success');
              }
              // Force fast re-poll
              setTimeout(async () => {
                  currentRunningStatuses = await window.electronAPI.getStatus();
                  renderAccounts();
                  updateDashboardStats();
              }, 500);
          } else {
              addLog(name, i18n[currentLang].log_launch_fail + ' ' + res.error, 'error');
              showToast(i18n[currentLang].toast_launch_err + ' ' + name, 'error');
          }
      } catch (err) {
          addLog(name, currentLang === 'ar' ? 'خطأ في الاتصال بالنظام.' : 'Error connecting to system.', 'error');
      }
  }

  async function stopAccount(id, name) {
      addLog(name, currentLang === 'ar' ? 'جاري إغلاق المتصفح...' : 'Closing browser...', 'info');
      try {
          const res = await window.electronAPI.stopChrome(id);
          if (res.success) {
              addLog(name, currentLang === 'ar' ? 'تم إغلاق المتصفح بنجاح.' : 'Browser closed successfully.', 'success');
              // trigger fast re-poll
              const statuses = await window.electronAPI.getStatus();
              currentRunningStatuses = statuses;
              renderAccounts();
              updateDashboardStats();
          } else {
              addLog(name, currentLang === 'ar' ? `فشل الإغلاق: ${res.error}` : `Failed to close: ${res.error}`, 'error');
          }
      } catch (err) {}
  }

  async function resetAccount(id, name) {
    addLog(name, currentLang === 'ar' ? 'جاري إغلاق المتصفح ومسح الملفات...' : 'Closing browser and wiping files...', 'info');
    try {
      const res = await window.electronAPI.clearSession(id);
      if(res.success) {
          addLog(name, currentLang === 'ar' ? 'تمت إعادة تعيين الحساب بنجاح.' : 'Account reset successfully.', 'success');
      } else {
          addLog(name, currentLang === 'ar' ? `فشل المسح: ${res.error}` : `Reset failed: ${res.error}`, 'error');
          showToast(currentLang === 'ar' ? `خطأ في إعادة التعيين: ${res.error}` : `Error during reset: ${res.error}`, 'error');
      }
    } catch (e) {}
  }

  async function deleteAccount(id, name) {
    addLog(name, currentLang === 'ar' ? 'جاري الحذف النهائي...' : 'Deleting permanently...', 'info');
    try {
      await window.electronAPI.clearSession(id);
    } catch (e) {}
    
    accounts = accounts.filter(a => a.id !== id);
    localStorage.setItem('whatsapp_accounts_v2', JSON.stringify(accounts));
    await window.electronAPI.saveAccounts(accounts);
    renderAccounts();
    updateDashboardStats();
    addLog(i18n[currentLang].log_sys, currentLang === 'ar' ? `تم حذف حساب "${name}" بالكامل.` : `Account "${name}" deleted completely.`, 'info');
  }

  // --- Status Polling System (Reads from Main Process) ---
  function startStatusPoller() {
    setInterval(async () => {
        try {
            const statuses = await window.electronAPI.getStatus();
            
            // Check if status changed to re-render ONLY if needed to prevent flickering
            let changed = false;
            if (Object.keys(statuses).length !== Object.keys(currentRunningStatuses).length) changed = true;
            else {
                for (let key in statuses) {
                    if (!currentRunningStatuses[key] || 
                        statuses[key].state !== currentRunningStatuses[key].state ||
                        statuses[key].loggedIn !== currentRunningStatuses[key].loggedIn) {
                        changed = true;
                    }
                }
            }

            if (changed) {
                currentRunningStatuses = statuses;
                renderAccounts();
                updateDashboardStats();
            }
        } catch(e) {}
    }, 2000); // Fast 2-second check
  }

  // --- Uptime Ticker ---
  function startUptimeTicker() {
      setInterval(() => {
          const badges = document.querySelectorAll('.uptime-badge');
          const now = Date.now();
          badges.forEach(badge => {
              const start = parseInt(badge.getAttribute('data-starttime'));
              if (start) {
                  const diff = Math.floor((now - start) / 1000);
                  const h = String(Math.floor(diff / 3600)).padStart(2, '0');
                  const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
                  const s = String(diff % 60).padStart(2, '0');
                  badge.textContent = `${h}:${m}:${s}`;
              }
          });
      }, 1000);
  }
});
