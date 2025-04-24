import { z } from "zod";
import { Product, Order } from "../../models/index.js";
import Stripe from "stripe";

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

        // Busca produtos no banco
        const products = await Product.find({
          _id: { $in: productIds },
        });

        // Verifica se a quantidade de produtos enviados bate com os retornados pelo BE
        if (products.length !== productIds.length) {
          return res.status(400).json({ message: "Invalid product IDs" });
        }

        // Monta a order para salvar no mongo db
        const orderProducts = result.data.products.map((product) => {
          const backendProduct = products.find(
            (item) => item._id.toString() === product._id
          );

          return {
            productId: backendProduct._id,
            name: backendProduct.name,
            price: backendProduct.price,
            quantity: product.quantity, // quantidade enviada pelo FE
            iva: 23, // Valor definido - mas pode ser dinânico
          };
        });

        const order = await Order.create({
          user: "67fed2f975ff6b15b3095842", // trocar pelo user id do middleware
          email: result.data.email,
          products: orderProducts,
          paymentStatus: "pending",
          stripePaymentId: null,
          totalAmount: orderProducts.reduce(
            (acc, curr) => curr.price * curr.quantity + acc,
            0
          ),
        });

        // Monta o pagamento no stripe
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const lineItems = result.data.products.map((product) => {
          const backendProduct = products.find(
            (item) => item._id.toString() === product._id
          );
          return {
            price_data: {
              currency: "eur",
              product_data: {
                name: backendProduct?.name ?? "",
              },
              unit_amount: parseInt(backendProduct.price * 100), // amount in cents
            },
            quantity: product.quantity,
          };
        });

        const FRONTEND_URL = process.env.FRONTEND_URL;
        const session = await stripe.checkout.sessions.create({
          mode: "payment",
          line_items: lineItems,
          success_url: `${FRONTEND_URL}/checkout/success?orderId=${order._id.toString()}`,
          cancel_url: `${FRONTEND_URL}/checkout/cancel?orderId=${order._id.toString()}`,
        });

        return res.status(200).json({ payment_url: session.url });
      } catch {
        return res.status(500).json({ message: "Internal error" });
      }
    },
  },
];

export default orderRoutes;
