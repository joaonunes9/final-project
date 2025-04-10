import { Product } from "../../models/index.js";

const productRoutes = [
  {
    method: "get",
    path: "/products",
    handler: async (req, res) => {
      const products = await Product.find();
      res.json(products);
    },
  },
  {
    method: "get",
    path: "/products/:id",
    handler: async (req, res) => {
      res.json({ name: "product 1" });
    },
  },
];

export default productRoutes;
