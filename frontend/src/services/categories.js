export const getCategories = async () => {
  return fetch("http://localhost:3000/categories").then((resp) => resp.json());
};
