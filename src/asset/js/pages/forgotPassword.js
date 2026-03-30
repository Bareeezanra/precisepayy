import { requestPasswordReset, resetPassword } from "../utils/userDB.js";
import { showToast } from "../utils/toast.js";

export const forgotPasswordTemplate = `
<div class="auth-page fade-in-up visible">
  <div class="auth-container">
    <!-- Step 1: Enter Email -->
    <div id="forgotStep1">
      <div class="auth-header">
        <div class="auth-icon-circle">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <h2>Forgot Password?</h2>
        <p>No worries, we'll send you reset instructions to your email.</p>
      </div>
      <form class="auth-form" id="forgotForm">
        <div class="form-group">
          <label for="forgotEmail">Email Address</label>
          <input type="email" id="forgotEmail" placeholder="Enter your registered email" required autocomplete="email" />
        </div>
        <button type="submit" class="auth-btn" id="forgotSubmitBtn">
          <span class="btn-text">Send Reset Link</span>
          <span class="btn-loader" style="display:none;">
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner{transform-origin:center;animation:spin .75s infinite linear}@keyframes spin{100%{transform:rotate(360deg)}}</style><circle class="spinner" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="31.4 31.4" stroke-linecap="round"/></svg>
          </span>
        </button>
      </form>
      <div class="auth-footer">
        <p><a href="#login">← Back to Sign In</a></p>
      </div>
    </div>

    <!-- Step 2: Email Sent Confirmation -->
    <div id="forgotStep2" style="display: none;">
      <div class="auth-header">
        <div class="auth-icon-circle auth-icon-circle--success">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>
        <h2>Check Your Email</h2>
        <p>We sent a password reset link to <strong id="sentEmail"></strong></p>
      </div>
      <div class="email-sent-info">
        <p>Didn't receive the email? Check your spam folder or</p>
        <button class="auth-btn auth-btn--outline" id="resendBtn">Resend Email</button>
      </div>
      <div class="auth-divider">
        <span>Or reset here (demo)</span>
      </div>
      <!-- Demo: Reset form inline (normally this would be via email link) -->
      <form class="auth-form" id="resetForm">
        <div class="form-group">
          <label for="newPassword">New Password</label>
          <div class="password-wrapper">
            <input type="password" id="newPassword" placeholder="Min. 6 karakter" required minlength="6" />
            <button type="button" class="password-toggle" id="toggleNewPass" aria-label="Show password">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </button>
          </div>
        </div>
        <div class="form-group">
          <label for="confirmNewPassword">Confirm New Password</label>
          <input type="password" id="confirmNewPassword" placeholder="••••••••" required minlength="6" />
        </div>
        <button type="submit" class="auth-btn">Reset Password</button>
      </form>
      <div class="auth-footer">
        <p><a href="#login">← Back to Sign In</a></p>
      </div>
    </div>

    <!-- Step 3: Success -->
    <div id="forgotStep3" style="display: none;">
      <div class="auth-header">
        <div class="auth-icon-circle auth-icon-circle--success">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h2>Password Reset! ✅</h2>
        <p>Your password has been successfully reset. You can now login with your new password.</p>
      </div>
      <a href="#login" class="auth-btn" style="display: block; text-align: center; text-decoration: none;">
        Continue to Sign In
      </a>
    </div>
  </div>
</div>
`;

let currentResetToken = null;

export function initForgotPassword() {
  // Step 1: Submit email
  const forgotForm = document.getElementById("forgotForm");
  if (forgotForm) {
    forgotForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("forgotEmail").value.trim();
      const submitBtn = document.getElementById("forgotSubmitBtn");
      const btnText = submitBtn.querySelector(".btn-text");
      const btnLoader = submitBtn.querySelector(".btn-loader");

      btnText.style.display = "none";
      btnLoader.style.display = "inline-flex";
      submitBtn.disabled = true;

      await new Promise((r) => setTimeout(r, 1200));

      const result = requestPasswordReset(email);

      btnText.style.display = "inline";
      btnLoader.style.display = "none";
      submitBtn.disabled = false;

      if (result.success) {
        currentResetToken = result.token;
        showToast(result.message, "success", 5000);

        // Show step 2
        document.getElementById("forgotStep1").style.display = "none";
        document.getElementById("forgotStep2").style.display = "block";
        document.getElementById("sentEmail").textContent = email;
      } else {
        showToast(result.message, "error");
      }
    });
  }

  // Resend button
  const resendBtn = document.getElementById("resendBtn");
  if (resendBtn) {
    resendBtn.addEventListener("click", () => {
      showToast("Email reset password telah dikirim ulang!", "info");
      resendBtn.disabled = true;
      resendBtn.textContent = "Email Sent ✓";
      setTimeout(() => {
        resendBtn.disabled = false;
        resendBtn.textContent = "Resend Email";
      }, 30000);
    });
  }

  // Step 2: Reset password
  const resetForm = document.getElementById("resetForm");
  if (resetForm) {
    resetForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const newPass = document.getElementById("newPassword").value;
      const confirmPass = document.getElementById("confirmNewPassword").value;

      if (newPass !== confirmPass) {
        showToast("Password dan konfirmasi password tidak sama.", "error");
        return;
      }

      if (!currentResetToken) {
        showToast("Token reset tidak valid. Silakan request ulang.", "error");
        return;
      }

      const result = await resetPassword(currentResetToken, newPass);

      if (result.success) {
        showToast(result.message, "success", 5000);
        // Show step 3
        document.getElementById("forgotStep2").style.display = "none";
        document.getElementById("forgotStep3").style.display = "block";
        currentResetToken = null;
      } else {
        showToast(result.message, "error");
      }
    });
  }

  // Toggle password visibility
  const toggleBtn = document.getElementById("toggleNewPass");
  const passInput = document.getElementById("newPassword");
  if (toggleBtn && passInput) {
    toggleBtn.addEventListener("click", () => {
      const isPassword = passInput.type === "password";
      passInput.type = isPassword ? "text" : "password";
      toggleBtn.innerHTML = isPassword
        ? `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
        : `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    });
  }
}
