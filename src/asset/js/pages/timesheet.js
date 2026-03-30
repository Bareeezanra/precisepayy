import { isLoggedIn } from "../utils/userDB.js";
import { showToast } from "../utils/toast.js";
import { sidebarHTML, initSidebar } from "../components/sidebar.js";

export const timesheetTemplate = `
<div class="dashboard-layout fade-in-up visible">
  ${sidebarHTML("timesheet")}

  <!-- Main Content -->
  <main class="dashboard-main">
    <div class="dashboard-header" style="margin-bottom: 24px;">
      <div>
        <h1>Timesheet</h1>
        <p>Log and track your weekly working hours.</p>
      </div>
      <button class="auth-btn" id="logTimeBtn" style="border-radius: var(--radius-full); margin-top: 0;">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        Log Time
      </button>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid" style="grid-template-columns: repeat(3, 1fr);">
      <div class="stat-card">
        <div class="stat-icon purple">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </div>
        <h3>37.5h</h3>
        <p>Approved This Week</p>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22v-4"></path><path d="M12 8V4"></path><path d="M20 12h-4"></path><path d="M8 12H4"></path><path d="M17.65 17.65l-2.82-2.82"></path><path d="M9.17 9.17L6.35 6.35"></path><path d="M17.65 6.35l-2.82 2.82"></path><path d="M9.17 14.83l-2.82 2.82"></path></svg>
        </div>
        <h3>8.0h</h3>
        <p>Pending Approval</p>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        </div>
        <h3>12 Days</h3>
        <p>PTO Balance</p>
      </div>
    </div>

    <!-- Timesheet List -->
    <div class="section-card">
      <div class="section-header">
        <h3>This Week's Log</h3>
        <select style="padding: 6px 12px; border: 1px solid var(--border); border-radius: var(--radius-sm); outline: none;">
          <option>March 24 - 30, 2026</option>
          <option>March 17 - 23, 2026</option>
        </select>
      </div>
      
      <div class="list-item">
        <div class="list-info">
          <h4 style="display: flex; gap: 8px; align-items: center;">Mon, Mar 24 <span style="font-size:0.75rem; font-weight:normal; color: var(--text-light);">• Development</span></h4>
          <p>Frontend feature implementation and bug fixes</p>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="font-weight: 700;">8.0h</span>
          <span class="status-badge approved">Approved</span>
        </div>
      </div>
      <div class="list-item">
        <div class="list-info">
          <h4 style="display: flex; gap: 8px; align-items: center;">Tue, Mar 25 <span style="font-size:0.75rem; font-weight:normal; color: var(--text-light);">• Meetings</span></h4>
          <p>Sprint Planning and Team Sync</p>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="font-weight: 700;">8.0h</span>
          <span class="status-badge approved">Approved</span>
        </div>
      </div>
      <div class="list-item">
        <div class="list-info">
          <h4 style="display: flex; gap: 8px; align-items: center;">Wed, Mar 26 <span style="font-size:0.75rem; font-weight:normal; color: var(--text-light);">• Documentation</span></h4>
          <p>Updating API docs</p>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="font-weight: 700;">7.5h</span>
          <span class="status-badge approved">Approved</span>
        </div>
      </div>
      <div class="list-item" style="border-left: 3px solid var(--accent-orange);">
        <div class="list-info">
          <h4 style="display: flex; gap: 8px; align-items: center;">Thu, Mar 27 <span style="font-size:0.75rem; font-weight:normal; color: var(--text-light);">• Development</span></h4>
          <p>Auth Flow implementation</p>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="font-weight: 700;">8.0h</span>
          <span class="status-badge" style="color: var(--accent-orange); background: #fffbeb;">Pending</span>
        </div>
      </div>
    </div>
  </main>
</div>
`;

export function initTimesheet() {
  if (!isLoggedIn()) {
    showToast("Silakan login terlebih dahulu.", "warning");
    window.location.hash = "login";
    return;
  }

  document.body.classList.add("dashboard-active");
  initSidebar();

  const logBtn = document.getElementById("logTimeBtn");
  if (logBtn) {
    logBtn.addEventListener("click", () => {
      showToast("Time logging feature is coming soon!", "info");
    });
  }
}
