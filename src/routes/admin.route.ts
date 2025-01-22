import { Router, Request, Response } from "express";
import { adminLogin, addStudent, assignTask, getStudents, getTasksForStudent } from "../controllers/admin.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router: Router = Router();

router.post("/login", (req: Request, res: Response) => adminLogin(req, res));
router.post("/students", authMiddleware(["admin"]), (req: Request, res: Response) => addStudent(req, res));
router.get("/students", authMiddleware(["admin"]), (req: Request, res: Response) => getStudents(req, res));
router.post("/tasks", authMiddleware(["admin"]), (req: Request, res: Response) => assignTask(req, res));
router.get("/tasks", authMiddleware(["admin"]), (req: Request, res: Response) => getTasksForStudent(req, res));

export default router;
