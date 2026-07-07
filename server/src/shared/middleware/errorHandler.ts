// ——— Imports —————————————————————————————————————————————————————————————————————————————————————
import type { Request, Response, NextFunction } from "express";
import { NODE_ENV } from "@/config/env.js";
import { AppError } from "@/shared/utils/customErrors.js";

// ——— Helpers —————————————————————————————————————————————————————————————————————————————————————
const errorResponse = (
  res: Response,
  statusCode: number = 500,
  message: string,
) => {
  const error = { ok: false, message };
  res.status(statusCode).json(error);
};

// ——— Error Handlers ——————————————————————————————————————————————————————————————————————————————
export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (error instanceof AppError) {
    errorResponse(res, error.statusCode, error.message);
    return;
  }

  // Fallback for unknown errors
  console.log(`Unexpected Error: ${error}`);
  const message =
    NODE_ENV === "production"
      ? "Something when wrong"
      : error instanceof Error
        ? error.message
        : "Unknown Error";
  errorResponse(res, 500, message);
};
