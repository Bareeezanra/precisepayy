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

  const showcaseHero = document.querySelector(".showcase-hero");

  if (showcaseHero) {
    window.addEventListener("scroll", () => {
      const scrolled = window.scrollY;
      const heroHeight = showcaseHero.offsetHeight;

      if (scrolled <= heroHeight) {
        const parallaxValue = scrolled * 0.35;
        showcaseHero.style.backgroundPositionY = `calc(center + ${parallaxValue}px)`;
      }
    });
  }
});


export const showcaseTemplate = `
<!-- ======================== SHOWCASE HERO ======================== -->
    <section class="showcase-hero" id="showcase-hero">
      <div class="showcase-hero__overlay"></div>
      <div class="container">
        <div class="showcase-hero__content fade-in-up">
          <h1 class="showcase-hero__title">Succes Stories</h1>
          <p class="showcase-hero__description">
            See how leading are transforming their payroll management
            with PrecisePay
          </p>
        </div>
      </div>
    </section>

    <!-- ======================== SHOWCASE STATS ======================== -->
    <section class="showcase-stats">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item fade-in-up">
            <h2 class="stat-item__number">10,000+</h2>
            <p class="stat-item__label">Companies Trust Us</p>
          </div>
          <div class="stat-item fade-in-up" style="transition-delay: 0.1s">
            <h2 class="stat-item__number">500K+</h2>
            <p class="stat-item__label">Employees Managed</p>
          </div>
          <div class="stat-item fade-in-up" style="transition-delay: 0.2s">
            <h2 class="stat-item__number">189</h2>
            <p class="stat-item__label">Countries Supported</p>
          </div>
          <div class="stat-item fade-in-up" style="transition-delay: 0.3s">
            <h2 class="stat-item__number">99.9%</h2>
            <p class="stat-item__label">Uptime Guarantee</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================== STORIES LIST ======================== -->
    <section class="stories">
      <div class="container">
        
        <!-- Story 1: TechCorp -->
        <div class="story-card fade-in-up">
          <div class="story-card__content">
            <div class="story-company">
              <div class="story-company__logo">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <div class="story-company__info">
                <h3>TechCorp Inc.</h3>
                <p>Technology • 500+ employees</p>
              </div>
            </div>
            
            <p class="story-card__text">
              PrecisePay helped us reduce payroll processing time by 75% and
              eliminate errors completely.
            </p>
            
            <div class="story-quote">
              <div class="story-quote__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
              </div>
              <p class="story-quote__text">
                Switching to PrecisePay was the best decision we made. Our HR team
                can now focus on strategic initiatives instead of manual payroll tasks.
              </p>
              <div class="story-profile">
                <img src="../asset/Image/Person.png" alt="Sarah Zalfa" class="story-profile__img" style="object-fit:cover;object-position:top;" />
                <div class="story-profile__info">
                  <h4>Sarah Zalfa</h4>
                  <p>HR Director</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="story-card__image">
            <img src="../asset/Image/techcorpin.png" alt="TechCorp office space" />
          </div>
        </div>

        <!-- Story 2: Global Solutions -->
        <div class="story-card story-card--reverse fade-in-up">
          <div class="story-card__content">
            <div class="story-company">
              <div class="story-company__logo" style="background:#fce7f3; color:#ec4899;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </div>
              <div class="story-company__info">
                <h3>Global Solutions Ltd.</h3>
                <p>Consulting • 250+ employees</p>
              </div>
            </div>
            
            <p class="story-card__text">
              Managing payroll across 15 countries has never been easier.
              Payna handles it all seamlessly.
            </p>
            
            <div class="story-quote">
              <div class="story-quote__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
              </div>
              <p class="story-quote__text">
                The multi-currency and multi-country support is exceptional. We can
                manage our global team from one platform.
              </p>
              <div class="story-profile">
                <!-- Fallback to a part of Videoimg since we don't have all avatar images -->
                <img src="../asset/Image/Videoimg.png" alt="Michael Jchang" class="story-profile__img" style="object-fit:cover;object-position:center left;" />
                <div class="story-profile__info">
                  <h4>Michael Jchang</h4>
                  <p>Chief Finance Officer</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="story-card__image">
            <img src="../asset/Image/globalsolutions.png" alt="Global Solutions team" />
          </div>
        </div>

        <!-- Story 3: Creative Agency Co. -->
        <div class="story-card fade-in-up">
          <div class="story-card__content">
            <div class="story-company">
              <div class="story-company__logo" style="background:#f3f4f6; color:#1f2937;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 12l10 10 10-10L12 2zM2 12h20"/></svg>
              </div>
              <div class="story-company__info">
                <h3>Creative Agency Co.</h3>
                <p>Marketing • 150+ employees</p>
              </div>
            </div>
            
            <p class="story-card__text">
              The analytics and reporting features give us insights we never
              had before.
            </p>
            
            <div class="story-quote">
              <div class="story-quote__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
              </div>
              <p class="story-quote__text">
                Real-time reports and analytics help us make better financial
                decisions. The interface is beautiful and intuitive.
              </p>
              <div class="story-profile">
                <!-- Reusing person placeholder -->
                <img src="../asset/Image/Person.png" alt="Emily Rodriguez" class="story-profile__img" style="object-fit:cover;object-position:bottom left;" />
                <div class="story-profile__info">
                  <h4>Emily Rodriguez</h4>
                  <p>Operations Manager</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="story-card__image">
            <img src="../asset/Image/creativeagent.png" alt="Creative Agency meeting" />
          </div>
        </div>

        <!-- Story 4: StartUp Ventures -->
        <div class="story-card story-card--reverse fade-in-up">
          <div class="story-card__content">
            <div class="story-company">
              <div class="story-company__logo" style="background:#e0e7ff; color:#4f46e5;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <div class="story-company__info">
                <h3>StartUp Ventures</h3>
                <p>Startup • 50+ employees</p>
              </div>
            </div>
            
            <p class="story-card__text">
              Perfect for growing startups. Scales with us as we expand our
              team.
            </p>
            
            <div class="story-quote">
              <div class="story-quote__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
              </div>
              <p class="story-quote__text">
                We started with 10 employees and now have 50. Payna grew with us
                every step of the way.
              </p>
              <div class="story-profile">
                <!-- Using another section of video img -->
                <img src="../asset/Image/Videoimg.png" alt="David Kim" class="story-profile__img" style="object-fit:cover;" />
                <div class="story-profile__info">
                  <h4>David Kim</h4>
                  <p>CEO</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="story-card__image">
            <img src="../asset/Image/startupvnture.png" alt="StartUp Ventures office" />
          </div>
        </div>

      </div>
    </section>

    <!-- ======================== FOOTER ======================== -->
`;

export function initShowcase() {
  // specific initialization after injection
  const fadeElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
  setTimeout(() => {
    fadeElements.forEach(el => el.classList.add('visible'));
  }, 100);
}
