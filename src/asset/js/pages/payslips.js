import { isLoggedIn } from "../utils/userDB.js";
import { showToast } from "../utils/toast.js";
import { sidebarHTML, initSidebar } from "../components/sidebar.js";

export const payslipsTemplate = `
<div class="dashboard-layout fade-in-up visible">
  ${sidebarHTML("payslips")}

  <!-- Main Content -->
  <main class="dashboard-main">
    <div class="dashboard-header" style="margin-bottom: 24px;">
      <div>
        <h1>Pay Slips</h1>
        <p>Review and download your monthly pay slips.</p>
      </div>
      <button class="auth-btn" style="border-radius: var(--radius-full); margin-top: 0;">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        Download All
      </button>
    </div>

    <div class="section-card">
      <div class="table-responsive">
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border); color: var(--text-secondary); font-size: 0.85rem;">
              <th style="padding: 16px;">Month/Year</th>
              <th style="padding: 16px;">Gross Pay</th>
              <th style="padding: 16px;">Deductions</th>
              <th style="padding: 16px;">Net Pay</th>
              <th style="padding: 16px;">Status</th>
              <th style="padding: 16px; text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 16px; font-weight: 600;">February 2026</td>
              <td style="padding: 16px;">$5,000</td>
              <td style="padding: 16px; color: var(--primary);">-$580</td>
              <td style="padding: 16px; font-weight: 700; color: var(--accent-green);">$4,420</td>
              <td style="padding: 16px;"><span class="status-badge approved">Paid</span></td>
              <td style="padding: 16px; text-align: right;">
                <button class="list-action" style="background:none; cursor:pointer;" title="Download">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                </button>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 16px; font-weight: 600;">January 2026</td>
              <td style="padding: 16px;">$5,000</td>
              <td style="padding: 16px; color: var(--primary);">-$580</td>
              <td style="padding: 16px; font-weight: 700; color: var(--accent-green);">$4,420</td>
              <td style="padding: 16px;"><span class="status-badge approved">Paid</span></td>
              <td style="padding: 16px; text-align: right;">
                <button class="list-action" style="background:none; cursor:pointer;" title="Download">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                </button>
              </td>
            </tr>
            <tr>
              <td style="padding: 16px; font-weight: 600;">December 2025</td>
              <td style="padding: 16px;">$5,000</td>
              <td style="padding: 16px; color: var(--primary);">-$580</td>
              <td style="padding: 16px; font-weight: 700; color: var(--accent-green);">$4,420</td>
              <td style="padding: 16px;"><span class="status-badge approved">Paid</span></td>
              <td style="padding: 16px; text-align: right;">
                <button class="list-action" style="background:none; cursor:pointer;" title="Download">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</div>
`;

export function initPayslips() {
  if (!isLoggedIn()) {
    showToast("Silakan login terlebih dahulu.", "warning");
    window.location.hash = "login";
    return;
  }

  document.body.classList.add("dashboard-active");
  initSidebar();

  document.querySelectorAll(".list-action").forEach((btn) => {
    btn.addEventListener("click", () => {
      showToast("Download started...", "success");
    });
  });
}
