/**
 * Hesa Adda - Shared Application Engine (js/app.js)
 * Robust session management, safe localStorage CRUD, 48-hour timer, UI badges & motion
 */

// -----------------------------------------------------------------------------
// LOCALSTORAGE REPOSITORY (All reads safely wrapped in try/catch)
// -----------------------------------------------------------------------------
const HesaStorage = {
  // --- USERS & SESSIONS ---
  getUsers: function() {
    try {
      const data = localStorage.getItem('hesa_users');
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.warn("Corrupt hesa_users reset:", e);
      return {};
    }
  },

  getUserByPhone: function(phone) {
    if (!phone) return null;
    const clean = phone.toString().trim();
    const users = this.getUsers();
    return users[clean] || null;
  },

  saveUser: function(userData) {
    try {
      if (!userData || !userData.phone) return null;
      const cleanPhone = userData.phone.toString().trim();
      const users = this.getUsers();
      users[cleanPhone] = {
        ...users[cleanPhone],
        ...userData,
        phone: cleanPhone,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('hesa_users', JSON.stringify(users));
      return users[cleanPhone];
    } catch (e) {
      console.error("Error saving user:", e);
      return null;
    }
  },

  getSession: function() {
    try {
      const s = localStorage.getItem('hesa_session');
      return s ? s.trim() : null;
    } catch (e) {
      return null;
    }
  },

  setSession: function(phone) {
    try {
      if (!phone) return;
      localStorage.setItem('hesa_session', phone.toString().trim());
    } catch (e) {
      console.error("Error setting session:", e);
    }
  },

  clearSession: function() {
    try {
      localStorage.removeItem('hesa_session');
    } catch (e) {
      console.error("Error clearing session:", e);
    }
  },

  getCurrentUser: function() {
    const sessionPhone = this.getSession();
    if (!sessionPhone) return null;
    return this.getUserByPhone(sessionPhone) || { phone: sessionPhone };
  },

  // Check session guard for Hesaathi pages (apply.html, status.html)
  requireSession: function(redirectPage = 'register.html') {
    const sessionPhone = this.getSession();
    if (!sessionPhone) {
      const target = window.location.pathname.includes('/admin/') ? '../register.html' : 'register.html';
      window.location.href = target;
      return null;
    }
    return sessionPhone;
  },

  // --- APPLICATIONS ---
  getApplications: function() {
    try {
      const data = localStorage.getItem('hesa_applications');
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) return parsed;
      }
      return typeof SAMPLE_APPLICATIONS !== 'undefined' ? [...SAMPLE_APPLICATIONS] : [];
    } catch (e) {
      console.warn("Corrupt hesa_applications fallback:", e);
      return typeof SAMPLE_APPLICATIONS !== 'undefined' ? [...SAMPLE_APPLICATIONS] : [];
    }
  },

  getApplicationById: function(id) {
    if (!id) return null;
    const apps = this.getApplications();
    return apps.find(a => a.id === id) || null;
  },

  getApplicationByPhone: function(phone) {
    if (!phone) return null;
    const clean = phone.toString().trim();
    const apps = this.getApplications();
    // Return latest application for this phone
    return apps.find(a => a.phone === clean) || null;
  },

  saveApplication: function(appData) {
    try {
      const apps = this.getApplications();
      const index = apps.findIndex(a => a.id === appData.id);
      if (index >= 0) {
        apps[index] = { ...apps[index], ...appData, updatedAt: new Date().toISOString() };
      } else {
        apps.unshift({ ...appData, submittedAt: appData.submittedAt || new Date().toISOString() });
      }
      localStorage.setItem('hesa_applications', JSON.stringify(apps));
      return appData;
    } catch (e) {
      console.error("Error saving application:", e);
      return appData;
    }
  },

  // --- ADDAS ---
  getAddas: function() {
    try {
      const data = localStorage.getItem('hesa_addas');
      return data ? JSON.parse(data) : (typeof SAMPLE_ADDAS !== 'undefined' ? [...SAMPLE_ADDAS] : []);
    } catch (e) {
      return typeof SAMPLE_ADDAS !== 'undefined' ? [...SAMPLE_ADDAS] : [];
    }
  },

  saveAdda: function(adda) {
    try {
      const addas = this.getAddas();
      const index = addas.findIndex(a => a.addaId === adda.addaId);
      if (index >= 0) {
        addas[index] = { ...addas[index], ...adda };
      } else {
        addas.unshift(adda);
      }
      localStorage.setItem('hesa_addas', JSON.stringify(addas));
      return adda;
    } catch (e) {
      return adda;
    }
  },

  getActiveApplicationId: function() {
    try {
      return localStorage.getItem('hesa_active_app_id') || 'HA-2026-001';
    } catch (e) {
      return 'HA-2026-001';
    }
  },

  setActiveApplicationId: function(id) {
    try {
      localStorage.setItem('hesa_active_app_id', id);
    } catch (e) {}
  }
};

// -----------------------------------------------------------------------------
// 48-HOUR TIMER LOGIC
// Normal (> 12 hrs): white background, black text, thin border
// Under 12 hours: yellow background, black text
// Overdue (< 0 hrs): black background, white text
// -----------------------------------------------------------------------------
function calculateTimer(submittedAtISO, status) {
  if (status === 'Approved' || status === 'Rejected') {
    return {
      text: status === 'Approved' ? 'Completed (Approved)' : 'Closed (Rejected)',
      cssClass: 'timer-normal',
      isCompleted: true,
      rawMs: 0
    };
  }

  const submittedTime = new Date(submittedAtISO || Date.now()).getTime();
  const deadline = submittedTime + (48 * 3600 * 1000);
  const remainingMs = deadline - Date.now();

  if (remainingMs <= 0) {
    const overdueMs = Math.abs(remainingMs);
    const hours = Math.floor(overdueMs / (3600 * 1000));
    const mins = Math.floor((overdueMs % (3600 * 1000)) / (60 * 1000));
    return {
      text: `Overdue by ${hours}h ${mins}m`,
      cssClass: 'timer-overdue',
      isOverdue: true,
      rawMs: remainingMs
    };
  }

  const hours = Math.floor(remainingMs / (3600 * 1000));
  const mins = Math.floor((remainingMs % (3600 * 1000)) / (60 * 1000));
  const secs = Math.floor((remainingMs % (60 * 1000)) / 1000);

  const formatted = `${hours}h ${mins < 10 ? '0' : ''}${mins}m ${secs < 10 ? '0' : ''}${secs}s`;

  if (hours < 12) {
    return {
      text: `${formatted} left`,
      cssClass: 'timer-warning',
      isWarning: true,
      rawMs: remainingMs
    };
  }

  return {
    text: `${formatted} left`,
    cssClass: 'timer-normal',
    isNormal: true,
    rawMs: remainingMs
  };
}

function renderTimerBadge(submittedAtISO, status) {
  const t = calculateTimer(submittedAtISO, status);
  return `<span class="timer ${t.cssClass}" data-timer-sub="${submittedAtISO || ''}" data-status="${status || 'Submitted'}">${t.text}</span>`;
}

function startLiveTimers() {
  setInterval(() => {
    const timerEls = document.querySelectorAll('[data-timer-sub]');
    timerEls.forEach(el => {
      const sub = el.getAttribute('data-timer-sub');
      const st = el.getAttribute('data-status');
      if (sub) {
        const info = calculateTimer(sub, st);
        el.className = `timer ${info.cssClass}`;
        el.textContent = info.text;
      }
    });
  }, 1000);
}

// -----------------------------------------------------------------------------
// STATUS BADGES
// -----------------------------------------------------------------------------
function renderStatusBadge(status) {
  const s = (status || 'Submitted').trim();
  switch (s) {
    case 'Approved':
      return `<span class="badge badge-approved">Approved</span>`;
    case 'Rejected':
      return `<span class="badge badge-rejected">&#x2715; Rejected</span>`;
    case 'Changes requested':
      return `<span class="badge badge-changes">Changes requested</span>`;
    case 'Under review':
      return `<span class="badge badge-under-review">Under review</span>`;
    case 'Submitted':
    default:
      return `<span class="badge badge-submitted">Submitted</span>`;
  }
}

// -----------------------------------------------------------------------------
// TOP "VIEW AS" BAR HELPER & SESSION LOGOUT
// -----------------------------------------------------------------------------
function renderRoleBar(activeRole, basePath = '') {
  const container = document.getElementById('role-bar-container');
  if (!container) return;

  const session = HesaStorage.getSession();
  const sessionUser = session ? HesaStorage.getUserByPhone(session) : null;
  const displayName = sessionUser?.fullname ? `${sessionUser.fullname} (+91 ${session})` : (session ? `+91 ${session}` : null);

  const roles = [
    { name: 'Hesaathi', path: `${basePath}index.html`, key: 'hesaathi' },
    { name: 'Admin', path: `${basePath}admin/dashboard.html`, key: 'admin' },
    { name: 'Manager', path: `${basePath}manager/visits.html`, key: 'manager' }
  ];

  let linksHtml = roles.map(r => {
    const isActive = r.key === activeRole ? 'active' : '';
    return `<a href="${r.path}" class="${isActive}">${r.name}</a>`;
  }).join('');

  let userStatusHtml = '';
  if (session) {
    userStatusHtml = `
      <div class="session-info">
        <span>Logged in: <strong>${displayName}</strong></span>
        <button type="button" class="btn-logout-link" onclick="handleLogout('${basePath}')">Log out</button>
      </div>
    `;
  } else {
    userStatusHtml = `
      <div class="session-info">
        <a href="${basePath}register.html" class="session-login-link">Hesaathi Sign in / Register &rarr;</a>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="role-bar">
      <div class="role-bar-inner">
        <div class="role-left">
          <span class="role-title">Demo Mode &mdash; View As:</span>
          <div class="role-links">${linksHtml}</div>
        </div>
        <div class="role-right">
          ${userStatusHtml}
        </div>
      </div>
    </div>
  `;
}

function handleLogout(basePath = '') {
  HesaStorage.clearSession();
  window.location.href = `${basePath}index.html`;
}

// Global Demo Data Reset from footer
function handleResetDemo() {
  if (confirm("Reset all Hesa Adda demo data and sessions back to initial state?")) {
    resetAllMockData();
  }
}

// -----------------------------------------------------------------------------
// LEAFLET MAP MARKER HELPERS (Black, Yellow, White with black border)
// -----------------------------------------------------------------------------
function getPinClassForStatus(status) {
  if (status === 'Approved') return 'pin-approved';
  if (status === 'Under review' || status === 'Submitted') return 'pin-review';
  return 'pin-other';
}

function createCustomPin(status) {
  if (typeof L === 'undefined') return null;
  const pinClass = getPinClassForStatus(status);
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="custom-leaflet-pin ${pinClass}">●</div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -14]
  });
}

// -----------------------------------------------------------------------------
// SUBTLE FADE-UP MOTION (Respects prefers-reduced-motion)
// -----------------------------------------------------------------------------
function initScrollFadeUp() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const targets = document.querySelectorAll('.fade-up, .card, .bento-card, .timeline-step');
  if (!targets.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(t => observer.observe(t));
}

// DOM Ready initialization
document.addEventListener('DOMContentLoaded', () => {
  startLiveTimers();
  initScrollFadeUp();
});
