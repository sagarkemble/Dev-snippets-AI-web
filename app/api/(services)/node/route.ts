import { NextRequest } from "next/server";
import { handleError } from "../../common/utils/error-handler.utils";
import { nodeSchema } from "../../schema/node.schema";
import ApiError from "../../common/utils/api-error.utils";
import { db } from "@/db";
import { nodesTable } from "@/db/models/node.model";
import ApiResponse from "../../common/utils/api-response.utils";
import { usersTable } from "@/db/models/users.model";
import { and, eq } from "drizzle-orm";
import { validateRequest } from "../../common/utils/zod-handler";

export async function POST(request: NextRequest) {
  try {
    const parsedData = await request.json();
    const validatedData = validateRequest(nodeSchema, parsedData);
    const {
      userId,
      parentId,
      name,
      type,
      isFavorite,
      isPublic,
      code,
      description,
      ext,
    } = validatedData;

    const [isValidUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId));
    if (!isValidUser)
      throw ApiError.notFound("User not found", [
        { user_id: "No user found with the provided user_id" },
      ]);

    if (type === "file") {
      await validateParentId(parentId, userId);
      await checkIfNodeAlreadyExists(parentId!, userId, name);
      const [fileId] = await db
        .insert(nodesTable)
        .values({
          userId,
          parentId,
          name,
          type,
          isFavorite,
          isPublic,
          code,
          description,
          ext,
        })
        .returning({ id: nodesTable.id });
      return ApiResponse.created("File created", { id: fileId.id });
    } else if (type === "folder") {
      if (parentId) {
        await validateParentId(parentId, userId);
      }
      const [folderId] = await db
        .insert(nodesTable)
        .values({
          userId,
          parentId,
          name,
          type,
          isFavorite,
          isPublic,
        })
        .returning({ id: nodesTable.id });
      return ApiResponse.created("Folder created", { id: folderId.id });
    }
  } catch (error) {
    return handleError(error);
  }
}

async function validateParentId(parentId: number | null, userId: number) {
  if (!parentId)
    throw ApiError.badRequest("Parent folder is required for files", [
      { parent_id: "parent_id must be provided for files" },
    ]);
  const isValidParent = await db
    .select()
    .from(nodesTable)
    .where(
      and(
        eq(nodesTable.id, parentId),
        eq(nodesTable.userId, userId),
        eq(nodesTable.type, "folder"),
      ),
    );
  if (parentId !== null && isValidParent.length === 0) {
    throw ApiError.notFound("Parent folder not found", [
      {
        parent_id: "No folder found with the provided parent_id for this user",
      },
    ]);
  }
}
async function checkIfNodeAlreadyExists(
  parentId: number,
  userId: number,
  name: string,
) {
  const existingNode = await db
    .select()
    .from(nodesTable)
    .where(
      and(
        eq(nodesTable.parentId, parentId),
        eq(nodesTable.userId, userId),
        eq(nodesTable.name, name),
      ),
    );

  if (existingNode.length > 0) {
    throw ApiError.conflict(
      "Node with the same name already exists in the parent folder",
      [
        {
          node_id:
            "A node with the same name already exists in the parent folder for this user",
        },
      ],
    );
  }
}
export async function GET() {
  const users = await db.select().from(usersTable);

  return Response.json(users);
}
