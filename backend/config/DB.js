import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        const Connection = await mongoose.connect(process.env.MONGO_URL);
        console.log(`DataBase Connected: ${Connection.connection.host}`);
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}