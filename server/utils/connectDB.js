import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("MongoDB Connected Successfully ✅");
    } catch (err) {
        console.error("MongoDB Connection Failed ❌");
        console.error(err.message);
        process.exit(1);   // stop server if DB fails
    }
};

export default connectDB;