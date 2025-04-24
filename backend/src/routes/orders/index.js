import { z } from "zod";
import { Product } from "../../models/index.js";

export const orderSchema = z
  .object({
    email: z.string().email(),
    products: z.array(
      z.object({
        _id: z.string(),
        quantity: z.number(),
      })
    ),
  })
  .strict();

const orderRoutes = [
  {
    method: "post",
    path: "/orders",
    handler: async (req, res) => {
      try {
        const result = orderSchema.safeParse(req.body);
        if (!result.success) {
          return res
            .status(400)
            .json({ message: "Bad user input", issues: result.error.issues });
        }

        const productIds = result.data.products.map((product) => product._id);

        const products = await Product.find({
          _id: { $in: productIds },
        });

        if (products.length !== productIds) {
          return res
            .status(400)
            .json({ message: "Some product were not found" });
        }

        return res.status(200).json({ products });
      } catch {
        return res.status(500).json({ message: "Internal error" });
      }
    },
  },
];

export default orderRoutes;
