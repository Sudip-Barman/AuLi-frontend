export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  localStorage.setItem("token", token);

  // notify app
  window.dispatchEvent(new Event("auth-change"));
}

export function logout() {
  localStorage.removeItem("token");

  // notify app
  window.dispatchEvent(new Event("auth-change"));
}

export function isLoggedIn() {
  const token = getToken();

  return token && token !== "undefined" && token !== "null";
}