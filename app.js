import express from "express";
import chalk from "chalk";
import createDebug from "debug";
import morgan from "morgan";
import path from "path";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname } from "path";

// import products from "./data/products.json"
// import products from "./data/products.json" assert { type: "json" };
// โหลด products.json
const productsRaw = await readFile(new URL("./data/products.json", import.meta.url));
const products = JSON.parse(productsRaw);




const productRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const debug = createDebug("app");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(morgan("combined"));

//express.static เป็นการบ่งบอกว่าให้รองรับ static ไฟล์
//dirname เป็น directory เพื่อบ่งบอกว่าอยู่ path ไหน
app.use(express.static(path.join(__dirname, "/public/")));

app.set("views", "./src/views");
app.set("view engine", "ejs");

productRouter.route("/").get((req, res) => {
  res.render("products",{
    products,
  });
});

productRouter.route("/:id").get((req, res) => {
  const id = req.params.id
  res.render("product",{
    product:products[id]
  })
});

app.use("/products", productRouter);
// app.get ใช้จัดการเกี่ยวกับ request ที่เข้ามา
// ถ้าเข้ามาใน "/" จะตอบกลับผู้ใช้ยังไงดี ตอบใน {}
app.get("/", (req, res) => {
  res.render("index", {
    username: "Bankzaza",
    customers: ["Kitti", "Kittipak", "Kitty"],
  });
});

app.listen(PORT, () => {
  debug("Listening on port" + chalk.green(" : " + PORT));
});
