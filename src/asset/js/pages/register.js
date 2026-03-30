import { registerUser, socialLogin, getUserCount, isLoggedIn } from "../utils/userDB.js";
import { showToast } from "../utils/toast.js";

export const registerTemplate = `
<div class="auth-page fade-in-up visible">
  <div class="auth-container">
    <div class="auth-header">
      <h2>Create Account</h2>
      <p>Join us to start managing your payroll like an expert.</p>
      <div class="auth-user-count" id="regUserCount"></div>
    </div>
    <form class="auth-form" id="registerForm">
      <div class="form-group">
        <label for="regName">Full Name</label>
        <input type="text" id="regName" placeholder="John Doe" required autocomplete="name" />
      </div>
      <div class="form-group">
        <label for="regEmail">Email Address</label>
        <input type="email" id="regEmail" placeholder="Enter your email" required autocomplete="email" />
      </div>
      <div class="form-group">
        <label for="regPassword">Password</label>
        <div class="password-wrapper">
          <input type="password" id="regPassword" placeholder="Min. 6 karakter" required minlength="6" autocomplete="new-password" />
          <button type="button" class="password-toggle" id="toggleRegPass" aria-label="Show password">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </button>
        </div>
        <div class="password-strength" id="passwordStrength">
          <div class="strength-bars">
            <div class="strength-bar"></div>
            <div class="strength-bar"></div>
            <div class="strength-bar"></div>
            <div class="strength-bar"></div>
          </div>
          <span class="strength-text" id="strengthText"></span>
        </div>
      </div>
      <div class="form-group">
        <label for="regConfirmPassword">Confirm Password</label>
        <div class="password-wrapper">
          <input type="password" id="regConfirmPassword" placeholder="Min. 6 karakter" required minlength="6" autocomplete="new-password" />
          <button type="button" class="password-toggle" id="toggleRegConfirmPass" aria-label="Show password">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </button>
        </div>
      </div>
      <div class="form-options">
        <label class="remember-me">
          <input type="checkbox" id="agreeTerms" required /> I agree to the <a href="#" style="color: var(--primary); font-weight: 600;">Terms & Conditions</a>
        </label>
      </div>
      <button type="submit" class="auth-btn" id="regSubmitBtn">
        <span class="btn-text">Create Account</span>
        <span class="btn-loader" style="display:none;">
          <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner{transform-origin:center;animation:spin .75s infinite linear}@keyframes spin{100%{transform:rotate(360deg)}}</style><circle class="spinner" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="31.4 31.4" stroke-linecap="round"/></svg>
        </span>
      </button>
    </form>
    
    <div class="auth-divider">
      <span>Or continue with</span>
    </div>

    <div class="auth-social">
      <button class="social-btn" id="regGoogleBtn">
        <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Google
      </button>
      <button class="social-btn" id="regFacebookBtn">
        <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.324V1.325C24 .597 23.403 0 22.675 0z" fill="#1877F2"/>
        </svg>
        Facebook
      </button>
    </div>
    <div class="auth-footer">
      <p>Already have an account? <a href="#login">Sign in</a></p>
    </div>
  </div>
</div>
`;

function checkPasswordStrength(password) {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { label: "", color: "" },
    { label: "Lemah", color: "#ef4444" },
    { label: "Sedang", color: "#f59e0b" },
    { label: "Baik", color: "#3b82f6" },
    { label: "Kuat", color: "#10b981" },
    { label: "Sangat Kuat", color: "#059669" },
  ];

  return { score: Math.min(score, 4), ...levels[Math.min(score, 5)] };
}

export function initRegister() {
  // If already logged in, redirect
  if (isLoggedIn()) {
    window.location.hash = "dashboard";
    return;
  }

  // Show user count
  const countEl = document.getElementById("regUserCount");
  const count = getUserCount();
  if (countEl && count > 0) {
    countEl.innerHTML = `<span class="user-count-badge">👥 Bergabung dengan ${count} user lainnya</span>`;
  }

  // Password strength indicator
  const passInput = document.getElementById("regPassword");
  const strengthBars = document.querySelectorAll(".strength-bar");
  const strengthText = document.getElementById("strengthText");

  if (passInput) {
    passInput.addEventListener("input", () => {
      const val = passInput.value;
      const { score, label, color } = checkPasswordStrength(val);
      
      strengthBars.forEach((bar, i) => {
        if (i < score) {
          bar.style.background = color;
        } else {
          bar.style.background = "#e5e7eb";
        }
      });
      
      if (strengthText) {
        strengthText.textContent = val.length > 0 ? label : "";
        strengthText.style.color = color;
      }
    });
  }

  // Toggle password visibility
  const toggleBtn = document.getElementById("toggleRegPass");
  if (toggleBtn && passInput) {
    toggleBtn.addEventListener("click", () => {
      const isPassword = passInput.type === "password";
      passInput.type = isPassword ? "text" : "password";
      toggleBtn.innerHTML = isPassword
        ? `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
        : `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    });
  }

  // Toggle confirm password visibility
  const toggleConfirmBtn = document.getElementById("toggleRegConfirmPass");
  const confirmPassInput = document.getElementById("regConfirmPassword");
  if (toggleConfirmBtn && confirmPassInput) {
    toggleConfirmBtn.addEventListener("click", () => {
      const isPassword = confirmPassInput.type === "password";
      confirmPassInput.type = isPassword ? "text" : "password";
      toggleConfirmBtn.innerHTML = isPassword
        ? `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
        : `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    });
  }

  // Form submit
  const form = document.getElementById("registerForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("regName").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const password = document.getElementById("regPassword").value;
      const confirmPassword = document.getElementById("regConfirmPassword").value;
      const agreeTerms = document.getElementById("agreeTerms").checked;
      const submitBtn = document.getElementById("regSubmitBtn");
      const btnText = submitBtn.querySelector(".btn-text");
      const btnLoader = submitBtn.querySelector(".btn-loader");

      // Validations
      if (!agreeTerms) {
        showToast("Anda harus menyetujui Terms & Conditions.", "warning");
        return;
      }

      if (password !== confirmPassword) {
        showToast("Password dan konfirmasi password tidak sama.", "error");
        return;
      }

      if (password.length < 6) {
        showToast("Password minimal 6 karakter.", "warning");
        return;
      }

      // Show loading
      btnText.style.display = "none";
      btnLoader.style.display = "inline-flex";
      submitBtn.disabled = true;

      // Simulate network delay
      await new Promise((r) => setTimeout(r, 1000));

      const result = await registerUser(name, email, password);

      btnText.style.display = "inline";
      btnLoader.style.display = "none";
      submitBtn.disabled = false;

      if (result.success) {
        showToast(`🎉 ${result.message} Total user terdaftar: ${getUserCount()}`, "success", 5000);
        // Redirect to login after showing success
        setTimeout(() => {
          window.location.hash = "login";
        }, 2000);
      } else {
        showToast(result.message, "error");
      }
    });
  }

  // Social buttons
  setupSocialRegister();
}

function setupSocialRegister() {
  const googleBtn = document.getElementById("regGoogleBtn");
  if (googleBtn) {
    googleBtn.addEventListener("click", () => {
      if (typeof google !== "undefined" && google.accounts) {
        google.accounts.id.prompt();
      } else {
        showToast("Google OAuth belum dikonfigurasi. Silakan daftar dengan email.", "warning", 5000);
      }
    });
  }

  const fbBtn = document.getElementById("regFacebookBtn");
  if (fbBtn) {
    fbBtn.addEventListener("click", () => {
      if (typeof FB !== "undefined") {
        FB.login((response) => {
          if (response.authResponse) {
            FB.api("/me", { fields: "name,email,picture.width(100)" }, (profile) => {
              const result = socialLogin({
                name: profile.name,
                email: profile.email,
                picture: profile.picture?.data?.url,
                provider: "Facebook",
              });
              if (result.success) {
                showToast(`Akun berhasil dibuat dengan Facebook! 🎉 Total: ${getUserCount()} users`, "success", 5000);
                setTimeout(() => { window.location.hash = "dashboard"; }, 1500);
              }
            });
          }
        }, { scope: "email,public_profile" });
      } else {
        showToast("Facebook OAuth belum dikonfigurasi. Silakan daftar dengan email.", "warning", 5000);
      }
    });
  }
}
