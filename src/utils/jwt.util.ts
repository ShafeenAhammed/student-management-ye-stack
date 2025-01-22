import * as jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || "secret";

export const generateToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};
