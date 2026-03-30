import { getSession, clearSession } from "../utils/userDB.js";
import { showToast } from "../utils/toast.js";

/**
 * Generate the sidebar HTML with the active link highlighted
 * @param {string} activePage - one of: dashboard, payslips, timesheet, profile, settings
 */
export function sidebarHTML(activePage = "dashboard") {
  const links = [
    {
      id: "dashboard", href: "#dashboard", label: "Dashboard",
      icon: `<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>`
    },
    {
      id: "payslips", href: "#payslips", label: "Pay Slips",
      icon: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>`
    },
    {
      id: "timesheet", href: "#timesheet", label: "Timesheet",
      icon: `<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>`
    },
    {
      id: "profile", href: "#profile", label: "My Profile",
      icon: `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>`
    },
    {
      id: "settings", href: "#dashboard", label: "Settings", marginTop: true,
      icon: `<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>`
    },
  ];

  const linksHTML = links.map(l => {
    const active = l.id === activePage ? " active" : "";
    const mt = l.marginTop ? ' style="margin-top: auto;"' : "";
    return `<a href="${l.href}" class="sidebar__link${active}"${mt}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${l.icon}</svg>
        ${l.label}
      </a>`;
  }).join("\n      ");

  return `
  <aside class="sidebar">
    <div class="sidebar__header">
      <div class="sidebar__brand-dots"><span></span><span></span></div>
      <div class="sidebar__brand">PrecisePay</div>
    </div>
    <div class="sidebar__user">
      <div class="sidebar__avatar" id="dashAvatar">U</div>
      <div class="sidebar__user-info">
        <h4 id="dashUserName">User</h4>
        <p id="dashUserRole">Member</p>
      </div>
    </div>
    <nav class="sidebar__nav">
      ${linksHTML}
      <a href="#" class="sidebar__link" id="logoutBtn" style="color: var(--primary);">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
        Logout
      </a>
    </nav>
  </aside>`;
}

/**
 * Initialize common sidebar elements (avatar, user info, logout)
 */
export function initSidebar() {
  const session = getSession();
  if (session) {
    const avatarEl = document.getElementById("dashAvatar");
    const nameEl = document.getElementById("dashUserName");
    const roleEl = document.getElementById("dashUserRole");

    if (avatarEl) {
      if (session.avatar && session.avatar.startsWith("http")) {
        avatarEl.innerHTML = `<img src="${session.avatar}" alt="avatar" style="width:40px;height:40px;border-radius:50%;object-fit:cover;" />`;
        avatarEl.style.padding = "0";
        avatarEl.style.overflow = "hidden";
      } else {
        avatarEl.textContent = session.avatar || "U";
      }
    }
    if (nameEl) nameEl.textContent = session.name || "User";
    if (roleEl) {
      const providerBadge = session.provider !== "email" ? ` (via ${session.provider})` : "";
      roleEl.textContent = (session.role || "Member") + providerBadge;
    }
  }

  // Logout handler
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      clearSession();
      document.body.classList.remove("dashboard-active");
      showToast("Anda telah logout. Sampai jumpa! 👋", "info");
      setTimeout(() => { window.location.hash = "home"; }, 500);
    });
  }
}
