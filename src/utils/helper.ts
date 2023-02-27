import { Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../config";

export const signJWT = (userId, userRole) => {
  try {
    return jwt.sign({ userId, userRole }, config.SECRET, { expiresIn: "1hr" });
  } catch (error) {
    throw error;
  }
};

export const decodeJWT = (token: string) => {
  try {
    const payload = jwt.verify(token, config.SECRET);
    return payload;
  } catch (error) {
    throw error;
  }
};

export const expressResponse = (res: Response, statusCode: number, message: string, state?: boolean, data = null) => {
  return res.status(statusCode || 500).json({
    success: !!state || false,
    message: message || "Something bad happened, please conatact admin",
    data,
  });
};


