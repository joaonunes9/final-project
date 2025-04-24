const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const register = async (email, password) => {
  return fetch(backendUrl + "/auth/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((resp) => resp.json());
};

export const login = async (email, password) => {
  return fetch(backendUrl + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((resp) => resp.json());
};
