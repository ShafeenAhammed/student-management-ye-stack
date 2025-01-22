import mongoose, { Schema, Document, Types } from "mongoose";

interface Task extends Document {
  studentId: Types.ObjectId;
  title: string;
  dueDate: Date;
  status: "pending" | "overdue" | "completed";
}

const TaskSchema: Schema = new Schema({
  studentId: { type: Types.ObjectId, ref: "User", required: true },
  studentEmail: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ["pending", "overdue", "completed"], default: "pending" }
});

export default mongoose.model<Task>("Task", TaskSchema);
