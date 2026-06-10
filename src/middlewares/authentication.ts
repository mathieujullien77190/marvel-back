import type { NextFunction, Response } from "express";
import { User } from "../models/User";
import { HttpError } from "./error";
import { CustomRequest } from "../types";
import { assertToken } from "../helpers/assertions";
import { extractUserPublicData } from "../helpers/formatters";

const isAuthenticated = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.headers.authorization) {
    const user = await User.findOne({
      token: assertToken(req.headers.authorization),
    });

    if (!user) {
      throw new HttpError("Unauthorized", 401);
    } else {
      req.user = extractUserPublicData(user);
      next();
    }
  } else {
    throw new HttpError("Unauthorized", 401);
  }
};

export default isAuthenticated;
