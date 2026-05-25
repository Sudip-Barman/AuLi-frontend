import { getToken, logout } from "./auth";

export async function apiFetch(url, options = {}) {

  const token = getToken();

  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {

      console.log("Token expired");

      logout();

      window.location.href = "/";

      return null;
    }

    return response;

  } catch (error) {

    console.error("API FETCH ERROR:", error);
    throw error;

  }
}