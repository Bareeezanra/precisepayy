import { loginUser, socialLogin, getUserCount, isLoggedIn } from "../utils/userDB.js";
import { showToast } from "../utils/toast.js";

export const loginTemplate = `
<div class="auth-page fade-in-up visible">
  <div class="auth-container">
    <div class="auth-header">
      <h2>Welcome Back</h2>
      <p>Log in to your account to continue.</p>
    </div>
    <form class="auth-form" id="loginForm">
      <div class="form-group">
        <label for="loginEmail">Email Address</label>
        <input type="email" id="loginEmail" placeholder="Enter your email" required autocomplete="email" />
      </div>
      <div class="form-group">
        <label for="loginPassword">Password</label>
        <div class="password-wrapper">
          <input type="password" id="loginPassword" placeholder="••••••••" required autocomplete="current-password" />
          <button type="button" class="password-toggle" id="toggleLoginPass" aria-label="Show password">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
          </button>
        </div>
      </div>
      <div class="form-options">
        <label class="remember-me">
          <input type="checkbox" id="rememberMe" /> Remember me
        </label>
        <a href="#forgot-password" class="forgot-password">Forgot Password?</a>
      </div>
      <button type="submit" class="auth-btn" id="loginSubmitBtn">
        <span class="btn-text">Sign In</span>
        <span class="btn-loader" style="display:none;">
          <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner{transform-origin:center;animation:spin .75s infinite linear}@keyframes spin{100%{transform:rotate(360deg)}}</style><circle class="spinner" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="31.4 31.4" stroke-linecap="round"/></svg>
        </span>
      </button>
    </form>
    
    <div class="auth-divider">
      <span>Or continue with</span>
    </div>

    <div class="auth-social">
      <button class="social-btn" id="googleLoginBtn">
        <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Google
      </button>
      <button class="social-btn" id="facebookLoginBtn">
        <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.324V1.325C24 .597 23.403 0 22.675 0z" fill="#1877F2"/>
        </svg>
        Facebook
      </button>
    </div>
    <div class="auth-footer">
      <p>Don't have an account? <a href="#register">Sign up here</a></p>
    </div>
  </div>
</div>
`;

// ====== GOOGLE OAUTH ======
// Uses Google Identity Services (GSI) - the modern approach
// You need to replace this CLIENT_ID with your own from Google Cloud Console
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

function initGoogleSignIn() {
  // Check if Google Identity Services script is loaded
  if (typeof google !== "undefined" && google.accounts) {
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleCredentialResponse,
      auto_select: false,
    });

    const googleBtn = document.getElementById("googleLoginBtn");
    if (googleBtn) {
      googleBtn.addEventListener("click", () => {
        google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // Fallback: open popup
            google.accounts.oauth2.initTokenClient({
              client_id: GOOGLE_CLIENT_ID,
              scope: "email profile",
              callback: (tokenResponse) => {
                if (tokenResponse.access_token) {
                  fetchGoogleProfile(tokenResponse.access_token);
                }
              },
            }).requestAccessToken();
          }
        });
      });
    }
  } else {
    // Google SDK not loaded - use OAuth redirect as fallback
    const googleBtn = document.getElementById("googleLoginBtn");
    if (googleBtn) {
      googleBtn.addEventListener("click", () => {
        if (GOOGLE_CLIENT_ID.includes("YOUR_")) {
          showToast("Google Client ID belum dikonfigurasi. Silakan setup di Google Cloud Console.", "warning", 5000);
          return;
        }
        // Redirect-based OAuth  
        const redirectUri = encodeURIComponent(window.location.origin + window.location.pathname);
        const scope = encodeURIComponent("email profile");
        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`;
        window.location.href = url;
      });
    }
  }
}

async function handleGoogleCredentialResponse(response) {
  // Decode JWT from Google
  const payload = decodeJWT(response.credential);
  if (payload) {
    const result = await socialLogin({
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
      provider: "Google",
    });
    if (result.success) {
      showToast(`Selamat datang, ${payload.name}! 🎉`, "success");
      setTimeout(() => {
        window.location.hash = "dashboard";
      }, 800);
    }
  }
}

async function fetchGoogleProfile(accessToken) {
  try {
    const res = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const profile = await res.json();
    const result = await socialLogin({
      name: profile.name,
      email: profile.email,
      picture: profile.picture,
      provider: "Google",
    });
    if (result.success) {
      showToast(`Selamat datang, ${profile.name}! 🎉`, "success");
      setTimeout(() => {
        window.location.hash = "dashboard";
      }, 800);
    }
  } catch (err) {
    showToast("Gagal mendapatkan profil Google.", "error");
  }
}

// ====== FACEBOOK OAUTH ======
// You need to replace this APP_ID with your own from Facebook Developers
const FACEBOOK_APP_ID = "YOUR_FACEBOOK_APP_ID";

function initFacebookLogin() {
  const fbBtn = document.getElementById("facebookLoginBtn");
  if (!fbBtn) return;

  fbBtn.addEventListener("click", () => {
    if (typeof FB !== "undefined") {
      FB.login(
        (response) => {
          if (response.authResponse) {
            FB.api("/me", { fields: "name,email,picture.width(100)" }, async (profile) => {
              const result = await socialLogin({
                name: profile.name,
                email: profile.email,
                picture: profile.picture?.data?.url,
                provider: "Facebook",
              });
              if (result.success) {
                showToast(`Selamat datang, ${profile.name}! 🎉`, "success");
                setTimeout(() => {
                  window.location.hash = "dashboard";
                }, 800);
              }
            });
          } else {
            showToast("Login Facebook dibatalkan.", "warning");
          }
        },
        { scope: "email,public_profile" }
      );
    } else {
      if (FACEBOOK_APP_ID.includes("YOUR_")) {
        showToast("Facebook App ID belum dikonfigurasi. Silakan setup di Facebook Developers Console.", "warning", 5000);
        return;
      }
      // Redirect-based OAuth fallback
      const redirectUri = encodeURIComponent(window.location.origin + window.location.pathname);
      const url = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${redirectUri}&response_type=token&scope=email,public_profile`;
      window.location.href = url;
    }
  });
}

// JWT decoder helper
function decodeJWT(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function initLogin() {
  // If already logged in, redirect
  if (isLoggedIn()) {
    window.location.hash = "dashboard";
    return;
  }

  // Toggle password visibility
  const toggleBtn = document.getElementById("toggleLoginPass");
  const passInput = document.getElementById("loginPassword");
  if (toggleBtn && passInput) {
    toggleBtn.addEventListener("click", () => {
      const isPassword = passInput.type === "password";
      passInput.type = isPassword ? "text" : "password";
      toggleBtn.innerHTML = isPassword
        ? `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`
        : `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
    });
  }

  // Form submit
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;
      const submitBtn = document.getElementById("loginSubmitBtn");
      const btnText = submitBtn.querySelector(".btn-text");
      const btnLoader = submitBtn.querySelector(".btn-loader");

      // Show loading
      btnText.style.display = "none";
      btnLoader.style.display = "inline-flex";
      submitBtn.disabled = true;

      // Simulate network delay
      await new Promise((r) => setTimeout(r, 800));

      const result = await loginUser(email, password);

      btnText.style.display = "inline";
      btnLoader.style.display = "none";
      submitBtn.disabled = false;

      if (result.success) {
        showToast("Login berhasil! Mengalihkan ke dashboard... 🎉", "success");
        setTimeout(() => {
          window.location.hash = "dashboard";
        }, 1000);
      } else {
        showToast(result.message, "error");
      }
    });
  }

  // Social login
  initGoogleSignIn();
  initFacebookLogin();

  // Check for OAuth redirect tokens in URL hash
  checkOAuthRedirect();
}

function checkOAuthRedirect() {
  const hash = window.location.hash;
  if (hash.includes("access_token=")) {
    const params = new URLSearchParams(hash.substring(hash.indexOf("access_token")));
    const token = params.get("access_token");
    if (token) {
      // Try Google first
      fetchGoogleProfile(token).catch(() => {
        showToast("OAuth redirect berhasil tapi gagal mendapatkan profil.", "warning");
      });
    }
  }
}
