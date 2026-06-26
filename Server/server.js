import express from "express";
import cors from "cors";
import 'dotenv/config.js';
import { clerkMiddleware , requireAuth} from '@clerk/express'
import aiRouter from "./routes/aiRoutes.js"; 

const app = express();

app.use(cors());
app.use(express.json());


app.use(clerkMiddleware())

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.use(requireAuth()); // Protect all routes after this middleware

app.use("/api/ai", aiRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})