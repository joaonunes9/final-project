import { Category } from "../../models/index.js";

const categoryRoutes = [
  {
    method: "get",
    path: "/categories",
    handler: async (req, res) => {
      const categories = await Category.find();
      return res.status(200).json(categories);
    },
  },
];

export default categoryRoutes;
