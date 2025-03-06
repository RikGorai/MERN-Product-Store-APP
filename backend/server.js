import express from "express";
import path from "path";
import dotenv from "dotenv";
import { connectDB } from "./config/DB.js";
import productRoutes from "./routes/product.routes.js"
import cors from "cors";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const __dirname= path.resolve();

app.use("/products",productRoutes);

if(process.env.NODE_ENV==="production") {
    app.use(express.static(path.join(__dirname,"/frontend/dist")));

    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log("server started at http://localhost:"+ PORT);
})

