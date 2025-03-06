import express from "express";
import { allProduct, createProduct, deleteProduct, updateProduct } from "../controllers/product.controller.js";
const Router = express.Router();


Router.get("/", allProduct);

Router.post("/", createProduct);

Router.put("/:id",updateProduct);

Router.delete("/:id",deleteProduct);

export default Router;
