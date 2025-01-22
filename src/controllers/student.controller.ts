import { Request, Response } from "express";
import User from "../models/user.model";
import Task from "../models/tasks.model";
import * as bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.util";

export const studentLogin = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  const student = await User.findOne({ email, role: "student" });
  if (!student ) {
    return res.status(404).json({ message: "Student not found!" });
  }
  if (!(await bcrypt.compare(password, student.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = generateToken(student.id, "student");
  return res.json({ token });
};

export const viewTasks = async (req: Request, res: Response): Promise<any> => {
    const { studentEmail } = req.query;
  
    try {  
      const currentDate = new Date();
      await Task.updateMany(
        {
          studentEmail,
          dueDate: { $lt: currentDate },
          status: "pending"
        },
        {
          $set: { status: "overdue" }
        }
      );

      const tasks = await Task.find({ studentEmail});
  
      if (tasks.length === 0) {
        return res.status(404).json({ message: "No tasks found for this student" });
      }
  
      return res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
};

// export const updateTaskStatus = async (req: Request, res: Response): Promise<any> => {
//   const { taskId, status } = req.body;
//   const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
//   return res.json(task);
// };

export const updateTaskStatus = async (req: Request, res: Response): Promise<any> => {
    const { status } = req.body;
    const { taskId } = req.params;
    try {
      const task = await Task.findById(taskId);
      
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      const currentDate = new Date()
  
      const timeDifference = currentDate.getTime() - task.dueDate.getTime();
      const daysOverdue = timeDifference / (1000 * 3600 * 24);
      
      if (daysOverdue >= 3) {
        return res.status(400).json({ message: "Cannot update status for tasks overdue by 3 or more days" });
      }
  
      task.status = status;
      await task.save();
  
      return res.json(task);
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };
