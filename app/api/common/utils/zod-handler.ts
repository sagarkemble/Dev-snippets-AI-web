import { z } from "zod";
import ApiError from "./api-error.utils";

export function validateRequest<T extends z.ZodType>(
  schema: T,
  data: unknown,
): z.infer<T> {
  const result = schema.safeParse(data);

  if (!result.success) {
    const formattedErrors = result.error.issues.map((issue) => ({
      [issue.path.join(".")]: issue.message,
    }));

    throw ApiError.badRequest("Validation failed", formattedErrors);
  }

  return result.data;
}
