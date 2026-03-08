import express from "express";
import cors from "cors";
import "dotenv/config";
import mailRoutes from "./routes/mailRoute.js"
const app = express();


app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:3000"],
    credentials: true,
    // secure: false,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie", "Cookie"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, _, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

app.use("/send", mailRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
