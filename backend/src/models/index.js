import mongoose from "mongoose";
import { categorySchema } from "./category.js";
import { productSchema } from "./product.js";
import { userSchema } from "./user.js";

export const Category = mongoose.model("Category", categorySchema);
export const Product = mongoose.model("Product", productSchema);
export const User = mongoose.model("User", userSchema);
