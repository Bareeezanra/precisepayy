/**
 * PrecisePay - User Backend Service Connector (Node.js API)
 * File ini sekarang terhubung ke EXPRESS+SQLITE Backend di port 5000.
 */

const API_BASE = "http://localhost:5000/api";

/**
 * Handle API responses (Generic Fetch)
 */
async function apiCall(endpoint, method = "GET", body = null) {
  try {
    const options = {
      method,
      headers: { "Content-Type": "application/json" },
    };
    if (body) options.body = JSON.stringify(body);

    const res = await fetch(`${API_BASE}${endpoint}`, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("API Error Fetch:", error);
    return {
      success: false,
      message: "Gagal menyambung ke server. Pastikan Backend (Node.js) menyala di terminal (npm start di folder backend).",
    };
  }
}

/**
 * Registrasi Email Lokal
 */
export async function registerUser(name, email, password) {
  return await apiCall("/auth/register", "POST", { name, email, password });
}

/**
 * Login Email Lokal + Session JWT
 */
export async function loginUser(email, password, remember = false) {
  const result = await apiCall("/auth/login", "POST", { email, password });
  if (result.success && result.token) {
    localStorage.setItem("userJWT", result.token);
    localStorage.setItem("userSessionData", JSON.stringify(result.user));
  }
  return result;
}

/**
 * Social Login (Google / Facebook) + Generate JWT
 */
export async function socialLogin(profile) {
  const result = await apiCall("/auth/social", "POST", profile);
  if (result.success && result.token) {
    localStorage.setItem("userJWT", result.token);
    localStorage.setItem("userSessionData", JSON.stringify(result.user));
  }
  return result;
}

/**
 * Ambil Total User Stats
 */
export async function getUserCount() {
  const data = await apiCall("/users/count");
  return data.success ? data.count : 0;
}

/**
 * Mengirim Permintaan Token Reset via Nodemailer (Kirim Email)
 */
export async function requestPasswordReset(email) {
  return await apiCall("/auth/forgot-password", "POST", { email });
}

/**
 * Verifikasi Kode Token Saja
 */
export async function verifyResetToken(token) {
  return await apiCall("/auth/verify-token", "POST", { token });
}

/**
 * Menggunakan Kode Reset Token + Simpan Password Baru
 */
export async function resetPassword(token, newPassword) {
  return await apiCall("/auth/reset-password", "POST", { token, newPassword });
}

/* ========================================================================== */
/*                          Manajemen Session Lokal (JWT)                     */
/* ========================================================================== */

export function isLoggedIn() {
  return !!localStorage.getItem("userJWT");
}

export function getSession() {
  const data = localStorage.getItem("userSessionData");
  return data ? JSON.parse(data) : null;
}

export function clearSession() {
  localStorage.removeItem("userJWT");
  localStorage.removeItem("userSessionData");
}
