import { z } from "zod";

const folderSchema = z.object({
  userId: z.number(),
  parentId: z.number().nullable(),
  type: z.literal("folder"),
  name: z.string().min(1, "Name is required"),
  description: z.string().max(500).optional(),
  isFavorite: z.boolean().default(false),
  isPublic: z.boolean().default(false),

  // folders cannot have these
  ext: z.undefined().optional(),
  code: z.undefined().optional(),
});

const fileSchema = z.object({
  userId: z.number(),
  parentId: z.number().nullable(),
  type: z.literal("file"),
  name: z.string().min(1, "Name is required"),
  description: z.string().max(500).optional(),
  isFavorite: z.boolean().default(false),
  isPublic: z.boolean().default(false),

  // files may have these
  ext: z.string().max(10).optional(),
  code: z.string().optional(),
});

export const nodeSchema = z.discriminatedUnion("type", [
  folderSchema,
  fileSchema,
]);

export type NodeRequest = z.infer<typeof nodeSchema>;
