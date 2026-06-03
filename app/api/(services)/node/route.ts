import { NextRequest } from "next/server";
import { handleError } from "../../common/utils/error-handler.utils";
import { snippetSchema } from "../../schema/node.schema";
import ApiError from "../../common/utils/api-error.utils";
import { db } from "@/db";
import { fileNodesTable } from "@/db/models/file-node.model";
import ApiResponse from "../../common/utils/api-response.utils";
import { usersTable } from "@/db/models/users.model";
import { eq } from "drizzle-orm";
import { validateRequest } from "../../common/utils/zod-handler";

export async function POST(request: NextRequest) {
  try {
    const parsedData = await request.json();
    const validatedData = validateRequest(snippetSchema, parsedData);
    const { user_id, parent_id, name, type, is_favorite } = validatedData;
    const [isValidUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, parseInt(user_id)));
    if (!isValidUser)
      throw ApiError.notFound("User not found", [
        { user_id: "No user found with the provided user_id" },
      ]);

    const nodeId = await db
      .insert(fileNodesTable)
      .values({
        userId: parseInt(user_id),
        parentId: parent_id,
        name,
        type,
        isFavorite: is_favorite,
      })
      .returning({
        id: fileNodesTable.id,
      });
    return ApiResponse.created("Snippet created successfully", {
      id: nodeId[0].id,
    });
  } catch (error) {
    return handleError(error);
  }
}
