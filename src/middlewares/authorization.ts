import { decodeJWT, expressResponse } from "../utils/helper";

function authentication(req, res, next) {
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
      return next(data.userRole);
    }
  } catch (error) {
    throwSystemError(res, error);
  }
}

function adminAccessRole(role, req, res, next) {
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

function adminGuestAccessRole(role, req, res, next) {
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

function throwErrorOnAccessDenied(res, code, message, state) {
  return expressResponse(res, code, message, state);
}

function throwSystemError(res, error) {
  return expressResponse(res, 500, error.message);
}

export default { authentication, adminAccessRole, adminGuestAccessRole };
