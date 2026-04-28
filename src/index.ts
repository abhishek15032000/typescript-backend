import 'dotenv/config'
import express from "express";
import { connectDB, disconnectDB } from './config/database';
const app = express();

// this would be like a defer in golang
// setImmadiate is better way to do this 
// because it will not block the event loop
setImmediate(async() : Promise<void> =>{
  await disconnectDB();
})

const DB_URL : undefined | null | string = process.env["DATABASE_URI"];
if (!DB_URL) {
   throw new Error("cant start because env not loaded");
}
connectDB(DB_URL);

app.get("/", (req, res) => {
    res.status(200).json({message:"Hello World!"});
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});