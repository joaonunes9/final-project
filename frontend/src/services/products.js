export const getProducts = async () => {
  return fetch("http://localhost:3000/products").then((resp) => resp.json());
};
