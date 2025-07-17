import { connect } from "mongoose";

export const connectDB = async () => {
    try {
        await connect(process.env.MONGODB_URI);
        console.log("Database Connected");
    } catch (error) {
        console.error("Database connection error: " + error);
    }
}