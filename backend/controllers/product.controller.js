import Product from "../models/product.model.js";
import mongoose from "mongoose";


export const allProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        res.send(products);

    } catch (error) {
        console.log("error in fetching products:", error.message);
        res.status(500).json({ success: false, message: "server error" });
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;
    

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "please provide all the fields" });
    }
    const newProduct = await new Product(product);

    try {
        await newProduct.save();
        res.status(200).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("error in creating product", error.message);
        res.status(500).json({ success: false, message: "server error" });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return req.status(404).json({ success: false, message: "invalid id" });
    }
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "please provide all the fields" });
    }

    try {
        const data = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: data });
    } catch (error) {
        console.log("error in updating products:", error.message);
        res.status(500).json({ success: false, message: "server error" });
    }
};

export const deleteProduct = async (req, res) => {
        
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return req.status(404).json({ success: false, message: "invalid id" });
    };
    try {
        const deleteItem = await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, data: deleteItem });
    } catch (error) {
        console.log("error in fetching products:", error.message);
        res.status(500).json({ success: false, message: "server error" });
    }
};