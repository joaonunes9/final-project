import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    require: true,
  },
});
