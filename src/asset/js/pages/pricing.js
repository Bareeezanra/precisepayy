
export const pricingTemplate = `
<!-- ======================== PRICING HEADER ======================== -->
    <section class="pricing-header fade-in-up">
      <div class="container text-center">
        <p class="pricing-header__label">PRICING PLANS</p>
        <h1 class="pricing-header__title">Choose Your Perfect Plan</h1>
        <p class="pricing-header__description">
          Transparent pricing with no hidden fees. All plans include core features.
        </p>
        
        <div class="pricing-toggle-wrapper">
          <div class="pricing-toggle">
            <button class="pricing-toggle__btn active" id="btnMonthly">Monthly</button>
            <button class="pricing-toggle__btn" id="btnAnnual">Annual <span>(Save 20%)</span></button>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================== PRICING CARDS ======================== -->
    <section class="pricing-plans">
      <div class="container">
        <div class="pricing-grid">
          
          <!-- Starter Plan -->
          <div class="pricing-card fade-in-up">
            <div class="pricing-card__icon pricing-card__icon--purple">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <h3 class="pricing-card__title">Starter</h3>
            <p class="pricing-card__subtitle">Perfect for small businesses just getting started</p>
            <div class="pricing-card__price">
              <span class="currency">$</span>
              <span class="amount" data-monthly="29" data-annual="23">29</span>
              <span class="period">/ month</span>
            </div>
            
            <ul class="pricing-card__features">
              <li class="included">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                Up to 10 employees
              </li>
              <li class="included">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                Basic Payroll processing
              </li>
              <li class="included">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                Email support
              </li>
              <li class="included">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                Monthly Report
              </li>
              <li class="included">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                Mobile App Access
              </li>
              <li class="excluded">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                Advanced Analytics
              </li>
              <li class="excluded">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                Multi-currency support
              </li>
              <li class="excluded">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                API access
              </li>
              <li class="excluded">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                Dedicated account manager
              </li>
            </ul>
            
            <button class="pricing-card__btn pricing-card__btn--outline">Get Started</button>
          </div>

          <!-- Professional Plan -->
          <div class="pricing-card pricing-card--popular fade-in-up" style="transition-delay: 0.1s">
            <div class="pricing-card__badge">Most Popular</div>
            <div class="pricing-card__icon pricing-card__icon--blue">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <h3 class="pricing-card__title">Professional</h3>
            <p class="pricing-card__subtitle">Ideal for growing businesses with more needs</p>
            <div class="pricing-card__price">
              <span class="currency">$</span>
              <span class="amount" data-monthly="79" data-annual="63">79</span>
              <span class="period">/ month</span>
            </div>
            
            <ul class="pricing-card__features">
              <li class="included">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                Up to 50 employees
              </li>
              <li class="included">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                Basic Payroll processing
              </li>
              <li class="included">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                Email support
              </li>
              <li class="included">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                Monthly Report
              </li>
              <li class="included">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                Mobile App Access
              </li>
              <li class="included">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                Advanced Analytics
              </li>
              <li class="included">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                Multi-currency support
              </li>
              <li class="excluded">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                API access
              </li>
              <li class="excluded">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                Dedicated account manager
              </li>
            </ul>
            
            <button class="pricing-card__btn pricing-card__btn--solid">Get Started</button>
          </div>

          <!-- Enterprise Plan -->
          <div class="pricing-card fade-in-up" style="transition-delay: 0.2s">
            <div class="pricing-card__icon pricing-card__icon--orange">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            </div>
            <h3 class="pricing-card__title">Enterprise</h3>
            <p class="pricing-card__subtitle">For large organizations with complex needs</p>
            <div class="pricing-card__price">
              <span class="currency">$</span>
              <span class="amount" data-monthly="199" data-annual="159">199</span>
              <span class="period">/ month</span>
            </div>
            
            <ul class="pricing-card__features">
              <li class="included">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                Unlimited employees
              </li>
              <li class="included">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                Basic Payroll processing
              </li>
              <li class="included">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                Email support
              </li>
              <li class="included">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                Monthly Report
              </li>
              <li class="included">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                Mobile App Access
              </li>
              <li class="included">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                Advanced Analytics
              </li>
              <li class="included">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                Multi-currency support
              </li>
              <li class="included">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                API access
              </li>
              <li class="included">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                Dedicated account manager
              </li>
            </ul>
            
            <button class="pricing-card__btn pricing-card__btn--outline">Get Started</button>
          </div>
          
        </div>
      </div>
    </section>

    <!-- ======================== FAQ SECTION ======================== -->
    <section class="faq">
      <div class="container fade-in-up">
        <div class="faq__header text-center">
          <p class="faq__label">FAQ</p>
          <h2 class="faq__title">Frequently Asked Questions</h2>
        </div>

        <div class="faq__grid">
          <!-- FAQ 1 -->
          <div class="faq-card">
            <h3 class="faq-card__question">Can I change my plan later?</h3>
            <p class="faq-card__answer">
              Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
            </p>
          </div>
          
          <!-- FAQ 2 -->
          <div class="faq-card">
            <h3 class="faq-card__question">What payment methods do you accept?</h3>
            <p class="faq-card__answer">
              We accept all major credit cards, debit cards, and bank transfers. Enterprise customers can also request invoicing.
            </p>
          </div>

          <!-- FAQ 3 -->
          <div class="faq-card">
            <h3 class="faq-card__question">Is there a free trial?</h3>
            <p class="faq-card__answer">
              Yes, we offer a 14-day free trial for all plans. No credit card required to start.
            </p>
          </div>

          <!-- FAQ 4 -->
          <div class="faq-card">
            <h3 class="faq-card__question">What happens to my data if I cancel?</h3>
            <p class="faq-card__answer">
              You can export all your data at any time. We keep your data for 90 days after cancellation in case you want to return.
            </p>
          </div>

          <!-- FAQ 5 -->
          <div class="faq-card">
            <h3 class="faq-card__question">Do you offer discounts for annual billing?</h3>
            <p class="faq-card__answer">
              Yes! Save 20% when you choose annual billing instead of monthly payments.
            </p>
          </div>

          <!-- FAQ 6 -->
          <div class="faq-card">
            <h3 class="faq-card__question">Is my data secure?</h3>
            <p class="faq-card__answer">
              Absolutely. We use bank-level encryption and comply with all major data protection regulations including GDPR and SOC 2.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================== FOOTER ======================== -->
    <!-- Reusing same footer from other pages -->
`;

export function initPricing() {
  const fadeElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
  setTimeout(() => {
    fadeElements.forEach(el => el.classList.add('visible'));
  }, 100);

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
}
