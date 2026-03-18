

export const homeTemplate = `
<!-- ======================== HERO SECTION ======================== -->
    <section class="hero" id="home">
      <div class="container">
        <div class="hero__content fade-in-left">
          <h1 class="hero__title">Manage Payroll<br />Like an Expert</h1>
          <p class="hero__description">
            PrecisePay is helping you to setting up the payroll without required
            any finance skills or knowledge before
          </p>
          <a href="#" class="hero__cta">Get Started</a>
        </div>

        <div class="hero__image fade-in-right">
          <div class="hero__image-wrapper">
            <img
              src="../asset/Image/Person.png"
              alt="Business professional using PrecisePay"
            />

            <!-- Floating Card: Analytics -->
            <div class="hero__floating-card hero__floating-card--analytics">
              <div class="card-icon card-icon--blue">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                  <path d="M22 12A10 10 0 0 0 12 2v10z" />
                </svg>
              </div>
              <div class="card-info">
                <h4>Analytics</h4>
                <p>Real time report</p>
              </div>
            </div>

            <!-- Floating Card: Bulk Export -->
            <div class="hero__floating-card hero__floating-card--export">
              <div class="card-icon card-icon--dark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
              <div class="card-info">
                <h4>Bulk Export</h4>
                <p>Work faster 100%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================== TRUSTED BY ======================== -->
    <section class="trusted" id="trusted">
      <div class="container fade-in-up">
        <div class="trusted__label">
          <p>Trusted by<br /><strong>Global Companies</strong></p>
        </div>
        <div class="trusted__logos">
          <!-- Apple -->
          <div class="trusted__logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="24"
              viewBox="0 0 384 512"
              fill="currentColor"
            >
              <path
                d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-62.1 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
              />
            </svg>
            Apple
          </div>
          <!-- Adobe -->
          <div class="trusted__logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425h-3.71zm-6.508 0H1.5V1.376l5.958 21.248zM16.542 1.376H22.5v21.248l-5.958-21.248z"
              />
            </svg>
            Adobe
          </div>
          <!-- Slack -->
          <div class="trusted__logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.27 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.163 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.163 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.163 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.27a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.315A2.528 2.528 0 0 1 24 15.163a2.528 2.528 0 0 1-2.522 2.523h-6.315z"
              />
            </svg>
            Slack
          </div>
          <!-- Spotify -->
          <div class="trusted__logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
              />
            </svg>
            Spotify
          </div>
          <!-- Google -->
          <div class="trusted__logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </div>
        </div>
      </div>
    </section>

    <!-- ======================== FEATURES SECTION ======================== -->
    <section class="features" id="features">
      <div class="container">
        <div class="features__header fade-in-up">
          <p class="features__subtitle">Work Better</p>
          <h2 class="features__title">For Your Business</h2>
          <p class="features__description">
            We did research what your company needs and here we are providing
            all of them just for you
          </p>
        </div>

        <div class="features__grid">
          <!-- Feature 1 -->
          <div class="feature-card fade-in-up">
            <div class="feature-card__icon feature-card__icon--blue">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
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
            <div>
              <h3 class="feature-card__title">Share Insights</h3>
              <p class="feature-card__description">
                Working together with your team to make decisions
              </p>
            </div>
          </div>

          <!-- Feature 2 -->
          <div class="feature-card fade-in-up">
            <div class="feature-card__icon feature-card__icon--red">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
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
            <div>
              <h3 class="feature-card__title">Track Leads</h3>
              <p class="feature-card__description">
                See where your money goes and comes in business
              </p>
            </div>
          </div>

          <!-- Feature 3 -->
          <div class="feature-card fade-in-up">
            <div class="feature-card__icon feature-card__icon--purple">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
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
            <div>
              <h3 class="feature-card__title">Offline Mode</h3>
              <p class="feature-card__description">
                Use the feature while off from internet? sure can
              </p>
            </div>
          </div>

          <!-- Feature 4 -->
          <div class="feature-card fade-in-up">
            <div class="feature-card__icon feature-card__icon--green">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
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
            <div>
              <h3 class="feature-card__title">Kanban Mode</h3>
              <p class="feature-card__description">
                Organize the report that easy to be understand
              </p>
            </div>
          </div>

          <!-- Feature 5 -->
          <div class="feature-card fade-in-up">
            <div class="feature-card__icon feature-card__icon--orange">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
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
            <div>
              <h3 class="feature-card__title">Reward System</h3>
              <p class="feature-card__description">
                Motivate your team working harder and receive a gift
              </p>
            </div>
          </div>

          <!-- Feature 6 -->
          <div class="feature-card fade-in-up">
            <div class="feature-card__icon feature-card__icon--pink">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
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
            <div>
              <h3 class="feature-card__title">189 Country</h3>
              <p class="feature-card__description">
                Working together worldwide people from anywhere
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================== PRODUCTIVITY SECTION ======================== -->
    <section class="productivity" id="showcase">
      <div class="container">
        <div class="productivity__media fade-in-left">
          <img src="../asset/Image/Videoimg.png" alt="Boost productivity" />
          <div class="productivity__play-btn" id="playBtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        <div class="productivity__content fade-in-right">
          <p class="productivity__subtitle">Save More Time</p>
          <h2 class="productivity__title">And Boost Productivity</h2>
          <p class="productivity__description">
            Your employees can bring any success into your business, so we need
            to take care of them
          </p>
          <form class="productivity__form" id="emailForm">
            <input
              type="email"
              class="productivity__input"
              placeholder="Email Address"
              required
            />
            <button type="submit" class="productivity__form-btn">
              Get Started
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- ======================== FOOTER ======================== -->
`;

export function initHome() {
  // specific initialization after injection
  const fadeElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
  setTimeout(() => {
    fadeElements.forEach(el => el.classList.add('visible'));
  }, 100);
}
