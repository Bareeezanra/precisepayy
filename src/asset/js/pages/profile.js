import { getSession, isLoggedIn } from "../utils/userDB.js";
import { showToast } from "../utils/toast.js";
import { sidebarHTML, initSidebar } from "../components/sidebar.js";

export const profileTemplate = `
<div class="dashboard-layout fade-in-up visible">
  ${sidebarHTML("profile")}

  <!-- Main Content -->
  <main class="dashboard-main">
    <div class="dashboard-header" style="margin-bottom: 24px;">
      <div>
        <h1>My Profile</h1>
        <p>Manage your account settings and preferences.</p>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 24px; align-items: start;">
      <!-- Profile Card -->
      <div class="section-card" style="text-align: center; padding: 40px 24px;">
        <div id="profAvatar" style="width: 100px; height: 100px; border-radius: 50%; background: var(--accent-blue); color: var(--white); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: 700; margin: 0 auto 16px; position: relative;">
          U
          <button style="position: absolute; bottom: 0; right: 0; width: 32px; height: 32px; border-radius: 50%; background: var(--white); border: 1px solid var(--border); box-shadow: var(--shadow-sm); display: flex; align-items: center; justify-content: center; cursor: pointer;">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
          </button>
        </div>
        <h3 id="profName" style="font-size: 1.25rem; font-weight: 800; color: var(--dark); margin-bottom: 4px;">User Name</h3>
        <p id="profRole" style="color: var(--text-secondary); margin-bottom: 16px;">Senior Developer</p>
        
        <div style="display: flex; gap: 8px; justify-content: center;">
          <span id="profProvider" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background: #f1f5f9; color: var(--text-secondary); font-size: 0.8rem; font-weight: 600; border-radius: var(--radius-full);">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            Email Login
          </span>
        </div>
      </div>

      <!-- Settings Form -->
      <div class="section-card">
        <h3 style="font-size: 1.1rem; font-weight: 700; border-bottom: 1px solid var(--border); padding-bottom: 16px; margin-bottom: 24px;">Personal Information</h3>
        <form id="profileForm" class="auth-form" style="gap: 16px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" id="profInpName" value="User Name" />
            </div>
            <div class="form-group">
              <label>Job Title</label>
              <input type="text" id="profInpRole" value="Senior Developer" />
            </div>
          </div>
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" id="profInpEmail" value="user@example.com" disabled style="background:#f8fafc; cursor:not-allowed;" />
            <span style="font-size: 0.75rem; color: var(--text-light); margin-top: 4px;">Email cannot be changed directly. Contact IT support.</span>
          </div>

          <h3 style="font-size: 1.1rem; font-weight: 700; border-bottom: 1px solid var(--border); padding-bottom: 16px; margin-top: 24px; margin-bottom: 24px;">Security</h3>
          <div class="form-group">
            <label>Current Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <div class="form-group">
            <label>New Password</label>
            <input type="password" placeholder="Min. 6 character" />
          </div>
          
          <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;">
            <button type="button" class="auth-btn auth-btn--outline" style="margin-top:0; padding:10px 24px;">Cancel</button>
            <button type="submit" class="auth-btn" style="margin-top:0; padding:10px 24px;">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</div>
`;

export function initProfile() {
  if (!isLoggedIn()) {
    showToast("Silakan login terlebih dahulu.", "warning");
    window.location.hash = "login";
    return;
  }

  document.body.classList.add("dashboard-active");
  initSidebar();

  const session = getSession();
  if (session) {
    const avatarEl = document.getElementById("profAvatar");
    const nameEl = document.getElementById("profName");
    const roleEl = document.getElementById("profRole");
    const providerEl = document.getElementById("profProvider");

    const inpName = document.getElementById("profInpName");
    const inpEmail = document.getElementById("profInpEmail");
    const inpRole = document.getElementById("profInpRole");

    if (avatarEl) {
      if (session.avatar && session.avatar.startsWith("http")) {
        avatarEl.innerHTML = `<img src="${session.avatar}" alt="avatar" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" />`;
      } else {
        avatarEl.textContent = session.avatar || "U";
      }
    }

    if (nameEl) nameEl.textContent = session.name || "User";
    if (roleEl) roleEl.textContent = session.role || "Member";

    if (providerEl) {
      if (session.provider === "Google") {
        providerEl.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path></svg> Google Account`;
        providerEl.style.color = "#ea4335";
        providerEl.style.background = "#fff1f0";
      } else if (session.provider === "Facebook") {
        providerEl.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.324V1.325C24 .597 23.403 0 22.675 0z"></path></svg> Facebook Account`;
        providerEl.style.color = "#1877F2";
        providerEl.style.background = "#eef4fd";
      }
    }

    if (inpName) inpName.value = session.name || "";
    if (inpEmail) inpEmail.value = session.email || "";
    if (inpRole) inpRole.value = session.role || "Member";
  }

  const form = document.getElementById("profileForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector("button[type='submit']");
      const origText = btn.textContent;
      btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner{transform-origin:center;animation:spin .75s infinite linear}@keyframes spin{100%{transform:rotate(360deg)}}</style><circle class="spinner" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="31.4 31.4" stroke-linecap="round"/></svg>`;
      btn.disabled = true;

      // Simulate save
      setTimeout(() => {
        btn.innerHTML = origText;
        btn.disabled = false;
        showToast("Profile updated successfully! ✅", "success");
      }, 1000);
    });
  }
}
