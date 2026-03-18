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

  document
    .querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right")
    .forEach((el) => {
      observer.observe(el);
    });

  const coreFeatureCards = document.querySelectorAll(".core-feature-card");
  coreFeatureCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });
  const moreFeatureCards = document.querySelectorAll(".more-feature-card");
  moreFeatureCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.08}s`;
  });
  const featureHero = document.querySelector(".feature-hero");

  if (featureHero) {
    window.addEventListener("scroll", () => {
      const scrolled = window.scrollY;
      const heroHeight = featureHero.offsetHeight;

      if (scrolled <= heroHeight) {
        const parallaxValue = scrolled * 0.35;
        featureHero.style.backgroundPositionY = `calc(center + ${parallaxValue}px)`;
      }
    });
  }

  coreFeatureCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = `translateY(-6px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  const countryCard = document.querySelector(
    "#core-feature-6 .core-feature-card__title",
  );
  if (countryCard && countryCard.textContent.includes("189")) {
    let hasAnimated = false;

    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            animateCounter(countryCard, 189, 1500);
            countObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    countObserver.observe(countryCard);
  }

  function animateCounter(element, target, duration) {
    const originalText = element.textContent;
    const suffix = originalText.replace(/[\d,]+/, "").trim();
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      element.textContent = `${current} ${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = originalText;
      }
    }

    requestAnimationFrame(update);
  }
});
