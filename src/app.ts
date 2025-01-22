import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import adminRoutes from "./routes/admin.route";
import studentRoutes from "./routes/student.route";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/student", studentRoutes);

// mongoose.connect(process.env.MONGO_URI!, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
//   console.log("Connected to MongoDB Atlas");
// });
// console.log("db", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI!).then(()=>console.log("MongoDB connected...")).catch((err)=>console.log("MongoDB failed to conenct",err));

export default app;
