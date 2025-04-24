import mongoose from "mongoose";

export const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  slug: {
    type: String,
    lowercase: true,
    unique: true,
    require: true,
    index: true,
  },
});
