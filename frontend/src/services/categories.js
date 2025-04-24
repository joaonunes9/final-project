const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getCategories = async () => {
  return fetch(backendUrl + "/categories").then((resp) => resp.json());
};
