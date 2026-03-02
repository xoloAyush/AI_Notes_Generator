import express from 'express'
// import { configDotenv } from 'dotenv'
import { configDotenv } from 'dotenv'
configDotenv()
import connectDB from './utils/connectDB.js'
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()
const PORT = process.env.PORT || 3000

connectDB()
app.get('/', (req, res) => {
    // res.send("hello")
    res.json({ message: "AI backend is running" })
})
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"],
    // exposedHeaders: ["Content-Length", "Date"],
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
    console.log(`server runs on ${PORT}`)
})