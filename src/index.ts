import 'dotenv/config'
import express from "express";
import { connectDB } from './config/database.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import authRoutes from './routes/auth.js';
const app = express();

// this would be like a defer in golang
// setImmadiate is better way to do this 
// because it will not block the event loop

const DB_URL : undefined | null | string = process.env["DATABASE_URI"];
if (!DB_URL) {
   throw new Error("cant start because env not loaded");
}

app.get("/", (req, res) => {
    res.status(200).json({message:"Hello World!"});
})

app.use(express.json());

// api routes
app.use("/api/v1/auth", authRoutes);

//swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

connectDB(DB_URL).catch((err: any)=>{
  console.log(err);
})