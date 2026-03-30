import { homeTemplate, initHome } from "./pages/home.js";
import { featureTemplate, initFeature } from "./pages/feature.js";
import { showcaseTemplate, initShowcase } from "./pages/showcase.js";
import { pricingTemplate, initPricing } from "./pages/pricing.js";
import { loginTemplate, initLogin } from "./pages/login.js";
import { registerTemplate, initRegister } from "./pages/register.js";
import { forgotPasswordTemplate, initForgotPassword } from "./pages/forgotPassword.js";
import { dashboardTemplate, initDashboard } from "./pages/dashboard.js";
import { payslipsTemplate, initPayslips } from "./pages/payslips.js";
import { timesheetTemplate, initTimesheet } from "./pages/timesheet.js";
import { profileTemplate, initProfile } from "./pages/profile.js";

document.addEventListener("DOMContentLoaded", () => {
  const appContainer = document.getElementById("app");
  if (!appContainer) return;

  const routes = {
    home: { template: homeTemplate, init: initHome },
    feature: { template: featureTemplate, init: initFeature },
    showcase: { template: showcaseTemplate, init: initShowcase },
    pricing: { template: pricingTemplate, init: initPricing },
    login: { template: loginTemplate, init: initLogin },
    register: { template: registerTemplate, init: initRegister },
    "forgot-password": { template: forgotPasswordTemplate, init: initForgotPassword },
    dashboard: { template: dashboardTemplate, init: initDashboard },
    payslips: { template: payslipsTemplate, init: initPayslips },
    timesheet: { template: timesheetTemplate, init: initTimesheet },
    profile: { template: profileTemplate, init: initProfile },
  };

  // Pages that hide navbar/footer
  const fullscreenPages = ["dashboard", "payslips", "timesheet", "profile"];
  // Pages that are auth pages (hide navbar/footer too)
  const authPages = ["login", "register", "forgot-password"];

  function loadRoute(route) {
    if (!routes[route]) {
      route = "home";
    }

    // Clean up dashboard-active class
    document.body.classList.remove("dashboard-active");

    // Handle nav/footer visibility
    const navbar = document.getElementById("navbar");
    const footer = document.getElementById("footer");

    if (fullscreenPages.includes(route)) {
      document.body.classList.add("dashboard-active");
      if (navbar) navbar.style.display = "none";
      if (footer) footer.style.display = "none";
    } else if (authPages.includes(route)) {
      if (navbar) navbar.style.display = "";
      if (footer) footer.style.display = "none";
    } else {
      if (navbar) navbar.style.display = "";
      if (footer) footer.style.display = "";
    }

    appContainer.innerHTML = routes[route].template;

    if (typeof routes[route].init === "function") {
      routes[route].init();
    }

    if (route === "home") {
      setupProductivityForm();
    }

    updateNavbarActiveState(route);

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  }

  function handleRoute() {
    let hash = window.location.hash.substring(1);
    if (!hash || hash === "") hash = "home";
    loadRoute(hash);
  }

  window.addEventListener("hashchange", handleRoute);

  handleRoute();

  setupNavbar();
});

function setupNavbar() {
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".navbar__hamburger");
  const navMenu = document.querySelector(".navbar__menu");
  const navLinks = document.querySelectorAll(".navbar__link");

  const handleNavbarScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleNavbarScroll, { passive: true });

  requestAnimationFrame(() => {
    handleNavbarScroll();
  });

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("open");
      document.body.style.overflow = navMenu.classList.contains("open")
        ? "hidden"
        : "";
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }
}

function updateNavbarActiveState(currentRoute) {
  const navLinks = document.querySelectorAll(".navbar__link");
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("data-nav") === currentRoute) {
      link.classList.add("active");
    }
  });
}

function setupProductivityForm() {
  const playBtn = document.querySelector(".productivity__play-btn");
  if (playBtn) {
    playBtn.addEventListener("click", () => {
      alert("Video player coming soon!");
    });
  }
  const emailForm = document.querySelector(".productivity__form");
  if (emailForm) {
    emailForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = emailForm.querySelector(".productivity__input");
      const email = emailInput.value.trim();

      if (email && isValidEmail(email)) {
        const btn = emailForm.querySelector(".productivity__form-btn");
        btn.textContent = "Subscribed!";
        btn.style.background = "#10B981";
        emailInput.value = "";

        setTimeout(() => {
          btn.textContent = "Get Started";
          btn.style.background = "";
          window.location.hash = "login";
        }, 1000);
      }
    });
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
