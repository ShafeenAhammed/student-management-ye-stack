import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = (roles: string[]) => (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
      const decoded: any = verifyToken(token);
      if (!roles.includes(decoded.role)) return res.status(403).json({ message: "Forbidden" });

      req.user = decoded;
      next();
      resolve();  // Resolves the promise after calling next
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
      reject(error);  // Reject the promise if there's an error
    }
  });
};
