import express from "express";
import mongoose from "mongoose";
import loadRoutes from "./routes/index.js";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.get("/health", async (req, res) => {
  res.json({ status: "ok" });
});
app.get("/", (req, res) => res.send("Express on Vercel"));
loadRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
main()
  .then(() => {
    console.log("Mongo db successfully connected");
  })
  .catch((err) => console.log(err));
