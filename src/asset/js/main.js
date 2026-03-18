document.addEventListener("DOMContentLoaded", () => {
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

    navMenu.querySelectorAll(".navbar__link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        const navHeight = navbar.offsetHeight;
        const targetPosition =
          target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  });

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right")
    .forEach((el) => {
      observer.observe(el);
    });

  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar__link");

  const handleActiveNav = () => {
    const scrollPos = window.scrollY + navbar.offsetHeight + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", handleActiveNav);

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
        }, 3000);
      }
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  const trustedLogos = document.querySelectorAll(".trusted__logo");
  trustedLogos.forEach((logo, index) => {
    logo.style.animationDelay = `${index * 0.15}s`;
  });
});
