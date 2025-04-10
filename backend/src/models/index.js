import mongoose from "mongoose";
import { categorySchema } from "./category.js";
import { productSchema } from "./product.js";

export const Category = mongoose.model("categories", categorySchema);
export const Product = mongoose.model("products", productSchema);
