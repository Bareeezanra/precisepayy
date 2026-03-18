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


export const featureTemplate = `
<!-- ======================== FEATURE HERO BANNER ======================== -->
    <section class="feature-hero" id="feature-hero">
      <div class="feature-hero__overlay"></div>
      <div class="container">
        <div class="feature-hero__content fade-in-up">
          <h1 class="feature-hero__title">
            <em>Powerful Features for Your Businnes</em>
          </h1>
          <p class="feature-hero__description">
            Discover all the tools and features that make PrecisePay the best
            payroll management solution
          </p>
        </div>
      </div>
    </section>

    <!-- ======================== CORE FEATURES SECTION ======================== -->
    <section class="core-features" id="core-features">
      <div class="container">
        <div class="core-features__header fade-in-up">
          <p class="core-features__label">CORE FEATURES</p>
          <h2 class="core-features__title">Everything Your Need</h2>
          <p class="core-features__description">
            Our comprehensive suite of features designed to streamline your
            payroll process
          </p>
        </div>

        <div class="core-features__grid">
          <!-- Core Feature 1: Share Insights -->
          <div class="core-feature-card fade-in-up" id="core-feature-1">
            <div class="core-feature-card__icon core-feature-card__icon--blue">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 class="core-feature-card__title">Share Insights</h3>
            <p class="core-feature-card__text">
              Working together with your team to make decisions. Collaborate in
              real-time and share important insights across your organization.
            </p>
          </div>

          <!-- Core Feature 2: Track Leads -->
          <div class="core-feature-card fade-in-up" id="core-feature-2">
            <div class="core-feature-card__icon core-feature-card__icon--red">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <h3 class="core-feature-card__title">Track Leads</h3>
            <p class="core-feature-card__text">
              See where your money goes and comes in business. Get comprehensive
              financial tracking and reporting tools.
            </p>
          </div>

          <!-- Core Feature 3: Offline Mode -->
          <div class="core-feature-card fade-in-up" id="core-feature-3">
            <div
              class="core-feature-card__icon core-feature-card__icon--purple"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="1" y1="1" x2="23" y2="23" />
                <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
                <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
                <path d="M10.71 5.05A16 16 0 0 1 22.56 9" />
                <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <line x1="12" y1="20" x2="12.01" y2="20" />
              </svg>
            </div>
            <h3 class="core-feature-card__title">Offline Mode</h3>
            <p class="core-feature-card__text">
              Use the feature while off from internet? Sure can. Work seamlessly
              without connectivity and sync when back online.
            </p>
          </div>

          <!-- Core Feature 4: Kanban Mode -->
          <div class="core-feature-card fade-in-up" id="core-feature-4">
            <div
              class="core-feature-card__icon core-feature-card__icon--orange"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </div>
            <h3 class="core-feature-card__title">Kanban Mode</h3>
            <p class="core-feature-card__text">
              Organize the report that easy to be understand. Visual workflow
              management for better productivity.
            </p>
          </div>

          <!-- Core Feature 5: Reward System -->
          <div class="core-feature-card fade-in-up" id="core-feature-5">
            <div class="core-feature-card__icon core-feature-card__icon--green">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                />
              </svg>
            </div>
            <h3 class="core-feature-card__title">Reward System</h3>
            <p class="core-feature-card__text">
              Motivate your team working harder and receive a gift. Built-in
              incentive programs to boost team morale.
            </p>
          </div>

          <!-- Core Feature 6: 189 Country -->
          <div class="core-feature-card fade-in-up" id="core-feature-6">
            <div class="core-feature-card__icon core-feature-card__icon--pink">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path
                  d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                />
              </svg>
            </div>
            <h3 class="core-feature-card__title">189 Country</h3>
            <p class="core-feature-card__text">
              Working together worldwide people from anywhere. Multi-currency
              and multi-language support.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================== MORE FEATURES SECTION ======================== -->
    <section class="more-features" id="more-features">
      <div class="container">
        <div class="more-features__header fade-in-up">
          <p class="more-features__label">MORE FEATURE</p>
          <h2 class="more-features__title">And Much More</h2>
        </div>

        <div class="more-features__grid">
          <!-- More Feature 1: Team Management -->
          <div class="more-feature-card fade-in-up" id="more-feature-1">
            <div class="more-feature-card__icon more-feature-card__icon--red">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h4 class="more-feature-card__title">Team Management</h4>
            <p class="more-feature-card__text">
              Manage your team members, roles, and permissions with ease.
            </p>
          </div>

          <!-- More Feature 2: Advance Security -->
          <div class="more-feature-card fade-in-up" id="more-feature-2">
            <div class="more-feature-card__icon more-feature-card__icon--blue">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h4 class="more-feature-card__title">Advance Security</h4>
            <p class="more-feature-card__text">
              Enterprise grade security to protect your sensitive payroll data.
            </p>
          </div>

          <!-- More Feature 3: Fast Processing -->
          <div class="more-feature-card fade-in-up" id="more-feature-3">
            <div class="more-feature-card__icon more-feature-card__icon--green">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <h4 class="more-feature-card__title">Fast Processing</h4>
            <p class="more-feature-card__text">
              Lightning fast payroll processing makes you much more easily.
            </p>
          </div>

          <!-- More Feature 4: Time Tracking -->
          <div class="more-feature-card fade-in-up" id="more-feature-4">
            <div
              class="more-feature-card__icon more-feature-card__icon--purple"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h4 class="more-feature-card__title">Time Tracking</h4>
            <p class="more-feature-card__text">
              Integrate time tracking for accurate payroll calculations.
            </p>
          </div>

          <!-- More Feature 5: Data Backup -->
          <div class="more-feature-card fade-in-up" id="more-feature-5">
            <div class="more-feature-card__icon more-feature-card__icon--cyan">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <h4 class="more-feature-card__title">Data Backup</h4>
            <p class="more-feature-card__text">
              Automatic backups ensure your data is always safe and secure.
            </p>
          </div>

          <!-- More Feature 6: Advance Report -->
          <div class="more-feature-card fade-in-up" id="more-feature-6">
            <div
              class="more-feature-card__icon more-feature-card__icon--indigo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
            <h4 class="more-feature-card__title">Advance Report</h4>
            <p class="more-feature-card__text">
              Generate detailed reports and analytics for better insights.
            </p>
          </div>

          <!-- More Feature 7: Document Management -->
          <div class="more-feature-card fade-in-up" id="more-feature-7">
            <div
              class="more-feature-card__icon more-feature-card__icon--orange"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <h4 class="more-feature-card__title">Document Management</h4>
            <p class="more-feature-card__text">
              Store and manage all payroll related documents in one place.
            </p>
          </div>

          <!-- More Feature 8: Mobile App -->
          <div class="more-feature-card fade-in-up" id="more-feature-8">
            <div class="more-feature-card__icon more-feature-card__icon--teal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
            </div>
            <h4 class="more-feature-card__title">Mobile App</h4>
            <p class="more-feature-card__text">
              Access on the go with our mobile app. Manage payroll anywhere.
            </p>
          </div>

          <!-- More Feature 9: Customization -->
          <div class="more-feature-card fade-in-up" id="more-feature-9">
            <div class="more-feature-card__icon more-feature-card__icon--rose">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="3" />
                <path
                  d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                />
              </svg>
            </div>
            <h4 class="more-feature-card__title">Customization</h4>
            <p class="more-feature-card__text">
              Customize workflows and settings to match your business process.
            </p>
          </div>

          <!-- More Feature 10: 24/7 Support -->
          <div class="more-feature-card fade-in-up" id="more-feature-10">
            <div class="more-feature-card__icon more-feature-card__icon--amber">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                />
              </svg>
            </div>
            <h4 class="more-feature-card__title">24/7 Support</h4>
            <p class="more-feature-card__text">
              Round the clock customer support to help you anytime, anywhere.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================== FOOTER ======================== -->
`;

export function initFeature() {
  // specific initialization after injection
  const fadeElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
  setTimeout(() => {
    fadeElements.forEach(el => el.classList.add('visible'));
  }, 100);
}
