// utils/error-handler.ts
import ApiError from "./api-error.utils";

export function handleError(error: unknown) {
  if (error instanceof ApiError) {
    return Response.json(
      {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          status: error.statusCode,
          details: error.details ?? [],
        },
      },
      { status: error.statusCode },
    );
  }

  console.error(error);

  return Response.json(
    {
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
        status: 500,
        details: [],
      },
    },
    { status: 500 },
  );
}
