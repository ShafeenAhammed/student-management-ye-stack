import { Request, Response } from "express";
import * as bcrypt from "bcryptjs";
import User from "../models/user.model";
import Task from "../models/tasks.model";
import { generateToken } from "../utils/jwt.util";
import { Types } from "mongoose";

export const adminLogin = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required!" });
  }
  const admin = await User.findOne({ email, role: "admin" });
  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = generateToken(admin.id, "admin");
  return res.json({ token });
};

export const addStudent = async (req: Request, res: Response): Promise<any> => {
    const { name, email, department, password } = req.body;

    if (!name || !email || !department || !password) {
        return res.status(400).json({
          message: "All fields (name, email, department, password) are required",
        });
    }

    try {
        const existingStudent = await User.findOne({ email });
        if (existingStudent) {
        return res.status(400).json({ message: "A student with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const student = new User({
        name,
        email,
        department,
        password: hashedPassword,
        role: "student"
        });

        await student.save();

        return res.status(201).json({
        _id: student._id,    
        name: student.name,
        email: student.email,
        department: student.department,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getStudents = async (req: Request, res: Response): Promise<any> => {
    try {
      const students = await User.find({ role: "student" }).select("_id name email department");

      if (students.length === 0) {
        return res.status(404).json({ message: "No students found" });
      }
  
      return res.status(200).json(students);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
};

export const assignTask = async (req: Request, res: Response): Promise<any> => {
    const { studentId, studentEmail, title, description, dueDate } = req.body;
    
    if(!studentId || !studentEmail || !title || !description || !dueDate) {
        return res.status(400).json({
          message: "All fields are required!",
        });
    }

    try {
      const existingTask = await Task.findOne({ studentId: new Types.ObjectId(studentId), studentEmail, title });
      if (existingTask) {
        return res.status(400).json({ message: "A task with the same title already exists for this student" });
      }
  
      const task = new Task({ studentId: new Types.ObjectId(studentId), studentEmail, title, description, dueDate });
      await task.save();
  
      return res.status(201).json(task);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
};

export const getTasksForStudent = async (req: Request, res: Response): Promise<any> => {
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
