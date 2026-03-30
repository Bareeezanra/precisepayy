/**
 * UserDB - localStorage-based user database
 * Stores users with hashed passwords and tracks total registrations
 */

const DB_KEY = "precisepay_users";
const SESSION_KEY = "precisepay_session";

function getUsers() {
  try {
    const data = localStorage.getItem(DB_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(DB_KEY, JSON.stringify(users));
}

// Simple hash for demo purposes (in production use bcrypt on backend)
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "precisepay_salt_2026");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Register a new user
 * @returns {{ success: boolean, message: string }}
 */
export async function registerUser(name, email, password) {
  const users = getUsers();

  // Check if email already exists
  const existing = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (existing) {
    return { success: false, message: "Email sudah terdaftar. Silakan login." };
  }

  // Validate password strength
  if (password.length < 6) {
    return { success: false, message: "Password minimal 6 karakter." };
  }

  const hashedPass = await hashPassword(password);

  const newUser = {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: hashedPass,
    provider: "email",
    avatar: name.trim().charAt(0).toUpperCase() + (name.trim().split(" ")[1] || "").charAt(0).toUpperCase(),
    role: "Senior Developer",
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  return { success: true, message: "Registrasi berhasil! Silakan login.", user: newUser };
}

/**
 * Login with email and password
 * @returns {{ success: boolean, message: string, user?: object }}
 */
export async function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (!user) {
    return { success: false, message: "Email tidak ditemukan. Silakan daftar terlebih dahulu." };
  }

  if (user.provider !== "email") {
    return {
      success: false,
      message: `Akun ini terdaftar menggunakan ${user.provider}. Silakan login dengan ${user.provider}.`,
    };
  }

  const hashedPass = await hashPassword(password);
  if (user.password !== hashedPass) {
    return { success: false, message: "Password salah. Coba lagi atau reset password." };
  }

  // Create session
  setSession(user);

  return { success: true, message: "Login berhasil!", user };
}

/**
 * Login/Register with social provider (Google/Facebook)
 */
export function socialLogin(profile) {
  const users = getUsers();
  let user = users.find(
    (u) => u.email.toLowerCase() === profile.email.toLowerCase()
  );

  if (!user) {
    // Auto-register
    user = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      name: profile.name,
      email: profile.email.toLowerCase(),
      password: null,
      provider: profile.provider,
      avatar: profile.picture || (profile.name.charAt(0).toUpperCase() + (profile.name.split(" ")[1] || "").charAt(0).toUpperCase()),
      role: "User",
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    saveUsers(users);
  }

  setSession(user);
  return { success: true, user };
}

/**
 * Request password reset
 */
export function requestPasswordReset(email) {
  const users = getUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (!user) {
    return { success: false, message: "Email tidak ditemukan di sistem kami." };
  }

  if (user.provider !== "email") {
    return {
      success: false,
      message: `Akun ini menggunakan ${user.provider}. Reset password tidak diperlukan.`,
    };
  }

  // Generate a reset token (simulated)
  const resetToken = Date.now().toString(36) + Math.random().toString(36).substr(2, 8);
  user.resetToken = resetToken;
  user.resetExpiry = Date.now() + 3600000; // 1 hour
  saveUsers(users);

  return {
    success: true,
    message: `Link reset password telah dikirim ke ${email}. Silakan cek inbox email Anda.`,
    token: resetToken,
  };
}

/**
 * Reset password with token
 */
export async function resetPassword(token, newPassword) {
  const users = getUsers();
  const user = users.find((u) => u.resetToken === token);

  if (!user) {
    return { success: false, message: "Token reset tidak valid." };
  }

  if (Date.now() > user.resetExpiry) {
    return { success: false, message: "Token reset sudah kadaluarsa. Silakan request ulang." };
  }

  if (newPassword.length < 6) {
    return { success: false, message: "Password minimal 6 karakter." };
  }

  user.password = await hashPassword(newPassword);
  delete user.resetToken;
  delete user.resetExpiry;
  saveUsers(users);

  return { success: true, message: "Password berhasil direset! Silakan login." };
}

/**
 * Get total registered user count
 */
export function getUserCount() {
  return getUsers().length;
}

/**
 * Session management
 */
export function setSession(user) {
  const session = {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
    provider: user.provider,
    token: "jwt_" + Date.now().toString(36) + "_" + Math.random().toString(36).substr(2, 12),
    loginAt: new Date().toISOString(),
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession() {
  try {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function isLoggedIn() {
  return getSession() !== null;
}
