import { Category, Product } from "../../models/index.js";
import { z } from "zod";

const RegexMongoObjectId = /^[0-9a-fA-F]{24}$/;

const idSchema = z.string().regex(RegexMongoObjectId, {
  message: "Invalid ObjectId format",
});

const slugSchema = z.string().toLowerCase();

const productSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
    price: z.number().min(0),
    images: z.array(z.string()),
    sku: z.string(),
    slug: z.string().toLowerCase(),
    categoryId: z.string().regex(RegexMongoObjectId),
    isActive: z.boolean().default(true),
  })
  .strict();

const productRoutes = [
  {
    method: "get",
    path: "/products",
    handler: async (req, res) => {
      const products = await Product.find().populate(["category"]);
      return res.status(200).json(products);
    },
  },
  {
    method: "get",
    path: "/products/:slug",
    handler: async (req, res) => {
      try {
        const { slug } = req.params;

        const response = slugSchema.safeParse(slug);
        if (!response.success) {
          return res
            .status(400)
            .json({ message: "Bad user input", issues: response.error.issues });
        }

        const product = await Product.findOne({ slug: response.data }).populate(
          ["category"]
        );

        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }

        return res.json(product);
      } catch {
        return res.status(500).json({ message: "Internal error" });
      }
    },
  },
  {
    method: "post",
    path: "/products",
    handler: async (req, res) => {
      try {
        const response = productSchema.safeParse(req.body);

        if (!response.success) {
          return res
            .status(400)
            .json({ message: "Bad user input", issues: response.error.issues });
        }

        const category = await Category.findById(response.data.categoryId);

        if (!category) {
          return res.status(404).json({ message: "Category not found" });
        }

        const product = await Product.create({
          ...response.data,
          category: response.data.categoryId,
        });

        return res.status(200).json(product);
      } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal error" });
      }
    },
  },
];

export default productRoutes;
