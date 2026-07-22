import express from "express";
import cors from "cors";
import 'dotenv/config.js';
import { clerkMiddleware , requireAuth} from '@clerk/express'
import aiRouter from "./routes/aiRoutes.js"; 
import connectCloudinary from "./configs/cloudinary.js";

const app = express();

await connectCloudinary(); // Connect to Cloudinary before starting the server

app.use(cors());
app.use(express.json());


app.use(clerkMiddleware())


app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.originalUrl);
  next();
});

app.use(requireAuth()); // Protect all routes after this middleware
console.log("mounting api router on /api/ai");

app.use("/api/ai", aiRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})