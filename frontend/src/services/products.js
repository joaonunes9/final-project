const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getProducts = async () => {
  return fetch(backendUrl + "/products").then((resp) => resp.json());
};

export const getProductBySlug = async (slug) => {
  return fetch(`${backendUrl}/products/${slug}`).then((resp) => resp.json());
};
