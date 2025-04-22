export const getProducts = async () => {
  return fetch("http://localhost:3000/products").then((resp) => resp.json());
};

export const getProductBySlug = async (slug) => {
  return fetch(`http://localhost:3000/products/${slug}`).then((resp) =>
    resp.json()
  );
};
