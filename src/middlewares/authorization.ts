import { NextFunction, Request, Response } from "express";
import { decodeJWT, expressResponse } from "../utils/helper";

export function authentication(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;

    if (!token) {
      return throwErrorOnAccessDenied(res, 401, "User not authenticated");
    }

    //decode token
    const data = decodeJWT(token);

    if (data) {
      return next(data["userRole"]);
    }
  } catch (error) {
    throwSystemError(res, error);
  }
}

export function adminAccessRole(role, req, res, next) {
  try {
    if (role == "admin") {
      return next();
    }

    return throwErrorOnAccessDenied(
      res,
      401,
      "You are not authorised to access this resource",
      false
    );
  } catch (error) {
    throwSystemError(res, error);
  }
}

export function adminGuestAccessRole(role, req, res, next) {
  try {
    if (role == "admin" || role == "guest") {
      return next();
    }

    return throwErrorOnAccessDenied(
      res,
      401,
      "You are not authorised to access this resource",
      false
    );
  } catch (error) {
    throwSystemError(res, error);
  }
}

export function throwErrorOnAccessDenied(res: Response, code: number, message: string, state?: boolean) {
  return expressResponse(res, code, message, state);
}

export function throwSystemError(res: Response, error: any) {
  return expressResponse(res, 500, error.message);
}

// export default { authentication, adminAccessRole, adminGuestAccessRole };
