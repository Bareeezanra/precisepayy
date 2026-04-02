import { getSession, isLoggedIn } from "../utils/userDB.js";
import { showToast } from "../utils/toast.js";
import { sidebarHTML, initSidebar } from "../components/sidebar.js";

export const dashboardTemplate = `
<div class="dashboard-layout fade-in-up visible">
  ${sidebarHTML("dashboard")}

  <!-- Main Content -->
  <main class="dashboard-main">
    <div class="dashboard-header">
      <div>
        <h1>Dashboard</h1>
        <p id="currentDate">Monday, March 30, 2026</p>
      </div>
      <button class="notification-btn">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
      </button>
    </div>

    <!-- Welcome Banner -->
    <div class="welcome-banner">
      <div>
        <h2 id="welcomeMsg">Welcome back! 👋</h2>
        <p>Here's your summary for this month</p>
      </div>
      <div class="welcome-graphic">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="position:absolute; width: 40px; height: 40px; top:20px; left:20px; fill: white;">
          <path d="M20 20h60v60H20z" fill="none" stroke="white" stroke-width="8" stroke-linejoin="round"/>
          <path d="M20 40h60 M40 20v60" stroke="white" stroke-width="8"/>
        </svg>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
        </div>
        <h3>$4,420</h3>
        <p>Last Payment</p>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </div>
        <h3>37.5h</h3>
        <p>This Week</p>
      </div>
      <div class="stat-card">
        <div class="stat-icon red">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
        </div>
        <h3>$62,400</h3>
        <p>YTD Earnings</p>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        </div>
        <h3>12</h3>
        <p>Leave Days Left</p>
      </div>
    </div>

    <!-- Sections -->
    <div class="dashboard-sections">
      <div class="section-card">
        <div class="section-header">
          <h3>Recent Pay Slips</h3>
          <a href="#payslips">View All</a>
        </div>
        <div class="list-item"><div class="list-info"><h4>February 2026</h4><p>Net: $4,420</p></div><div class="list-action"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></div></div>
        <div class="list-item"><div class="list-info"><h4>January 2026</h4><p>Net: $4,420</p></div><div class="list-action"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></div></div>
        <div class="list-item"><div class="list-info"><h4>December 2025</h4><p>Net: $4,420</p></div><div class="list-action"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></div></div>
      </div>
      <div class="section-card">
        <div class="section-header">
          <h3>This Week</h3>
          <a href="#timesheet">View All</a>
        </div>
        <div class="list-item"><div class="list-info"><h4>Mon, Mar 3</h4><p>8.0 hours</p></div><div class="status-badge approved">Approved</div></div>
        <div class="list-item"><div class="list-info"><h4>Tue, Mar 4</h4><p>8.0 hours</p></div><div class="status-badge approved">Approved</div></div>
        <div class="list-item"><div class="list-info"><h4>Wed, Mar 5</h4><p>7.5 hours</p></div><div class="status-badge approved">Approved</div></div>
      </div>
    </div>
  </main>
</div>
`;

export function initDashboard() {
  if (!isLoggedIn()) {
    showToast("Silakan login terlebih dahulu.", "warning");
    window.location.hash = "login";
    return;
  }
   
  document.body.classList.add("dashboard-active");
  initSidebar();

  // Welcome message
  const session = getSession();
  const welcomeEl = document.getElementById("welcomeMsg");
  if (welcomeEl && session) {
    const firstName = (session.name || "User").split(" ")[0];
    welcomeEl.textContent = `Welcome back, ${firstName}! 👋`;
  }

  // Date
  const dateEl = document.getElementById("currentDate");
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  }
}
