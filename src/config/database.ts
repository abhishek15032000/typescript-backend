import 'dotenv/config'
import mongoose from 'mongoose'
// mongodb connection

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 sec

export const connectDB = async (uri:string) : Promise<void> => {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      console.log(`DB connect attempt ${retries + 1}`);

      await mongoose.connect(uri);

      await mongoose.connection.db?.admin().ping();

      process.on("SIGINT",async() : Promise<void> => {
        await mongoose.connection.close();
        console.log("DB connection closed");
        process.exit(0);
      })
      process.on("SIGTERM", async() : Promise<void>=>{
        await mongoose.connection.close();
        console.log("DB connection closed");
        process.exit(0);
      })

      console.log("✅ DB connected");
      return;
    } catch (err) {
      retries++;
      console.error(`❌ Attempt ${retries} failed:`, err);

      if (retries >= MAX_RETRIES) {
        console.error("🚨 Max retries reached. Exiting...");
        process.exit(1);
      }

      // wait before retry
      await new Promise((res) => setTimeout(res, RETRY_DELAY));
    }
  }
};
