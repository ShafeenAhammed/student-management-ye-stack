import { Router } from "express";
import { studentLogin, viewTasks, updateTaskStatus } from "../controllers/student.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", studentLogin);
router.get("/tasks", authMiddleware(["student"]), viewTasks);
router.patch("/tasks/:taskId", authMiddleware(["student"]), updateTaskStatus);

export default router;
