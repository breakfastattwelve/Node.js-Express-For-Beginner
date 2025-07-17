import express from "express";
import { readFile } from "fs/promises";
// โหลด products.json
const productsRaw = await readFile(new URL("../data/products.json", import.meta.url));
const products = JSON.parse(productsRaw);

const productsRouter = express.Router();

productsRouter.route("/").get((req, res) => {
  res.render("products",{
    products,
  });
});

productsRouter.route("/:id").get((req, res) => {
  const id = req.params.id
  res.render("product",{
    product:products[id]
  })
});

module.exports = productsRouter;