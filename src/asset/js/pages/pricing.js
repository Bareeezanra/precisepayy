// ===========================
// PrecisePay - Pricing Page JavaScript
// ===========================

document.addEventListener("DOMContentLoaded", () => {
  // ---- Navbar Scroll Effect ----
  const navbar = document.querySelector(".navbar");

  const handleNavbarScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleNavbarScroll);
  handleNavbarScroll();

  // ---- Hamburger Menu Toggle ----
  const hamburger = document.querySelector(".navbar__hamburger");
  const navMenu = document.querySelector(".navbar__menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("open");
      document.body.style.overflow = navMenu.classList.contains("open")
        ? "hidden"
        : "";
    });

    // Close menu on link click
    navMenu.querySelectorAll(".navbar__link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  // ---- Scroll Reveal Animations ----
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-in-up").forEach((el) => {
    observer.observe(el);
  });

  // ---- Pricing Toggle Logic ----
  const btnMonthly = document.getElementById("btnMonthly");
  const btnAnnual = document.getElementById("btnAnnual");
  const priceAmounts = document.querySelectorAll(".pricing-card__price .amount");

  if (btnMonthly && btnAnnual) {
    btnMonthly.addEventListener("click", () => {
      if (!btnMonthly.classList.contains("active")) {
        btnMonthly.classList.add("active");
        btnAnnual.classList.remove("active");
        updatePrices("monthly");
      }
    });

    btnAnnual.addEventListener("click", () => {
      if (!btnAnnual.classList.contains("active")) {
        btnAnnual.classList.add("active");
        btnMonthly.classList.remove("active");
        updatePrices("annual");
      }
    });
  }

  function updatePrices(planType) {
    priceAmounts.forEach(amountEl => {
      // Small animation
      amountEl.style.opacity = 0;
      
      setTimeout(() => {
        const monthlyPrice = parseInt(amountEl.getAttribute("data-monthly"));
        if (planType === "monthly") {
          amountEl.textContent = monthlyPrice;
        } else {
          // Calculate 20% discount from monthly price
          const discountedPrice = Math.floor(monthlyPrice * 0.8);
          amountEl.textContent = discountedPrice;
        }
        amountEl.style.opacity = 1;
      }, 200); // Wait for fade out
    });
  }
  
  // Initialize price transition style
  priceAmounts.forEach(amountEl => {
    amountEl.style.transition = "opacity 0.2s ease";
  });
});
