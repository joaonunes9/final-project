import { User } from "../../models/index.js";
import bcrypt from "bcryptjs";
import { authSchema } from "./schemas.js";
import { generateToken } from "../../utils/auth.js";

const authRoutes = [
  {
    method: "post",
    path: "/auth/sign-up",
    handler: async (req, res) => {
      try {
        const result = authSchema.safeParse(req.body);

        if (!result.success) {
          return res
            .status(400)
            .json({ message: "Bad user input", issues: result.error.issues });
        }

        const user = await User.findOne({ email: result.data.email });
        if (user) {
          return res.status(400).json({ message: "User already exists" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(result.data.password, salt);

        const newUser = await User.create({
          email: result.data.email,
          password: hashedPassword,
        });

        const token = generateToken(newUser);

        return res.status(200).json({ accessToken: token });
      } catch {
        return res.status(500).json({ message: "Internal error" });
      }
    },
  },
  {
    method: "post",
    path: "/auth/login",
    handler: async (req, res) => {
      try {
        const result = authSchema.safeParse(req.body);

        if (!result.success) {
          return res
            .status(400)
            .json({ message: "Bad user input", issues: result.error.issues });
        }

        const user = await User.findOne({ email: result.data.email });
        if (!user) {
          return res
            .status(400)
            .json({ message: "Email or credentials invalid" });
        }

        const isPasswordValid = bcrypt.compareSync(
          result.data.password,
          user.password
        );

        if (!isPasswordValid) {
          return res
            .status(400)
            .json({ message: "Email or credentials invalid" });
        }

        const token = generateToken(user);

        return res.status(200).json({ accessToken: token });
      } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal error" });
      }
    },
  },
];

export default authRoutes;
