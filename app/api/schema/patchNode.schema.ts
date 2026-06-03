import z from "zod";

export const patchNodeSchema = z.object({
  nodeId: z.number(),
  userId: z.number().optional(),
  parentId: z.number().nullable().optional(),
  name: z.string().min(1).optional(),
  description: z.string().max(500).optional(),
  isFavorite: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  ext: z.string().max(10).optional(),
  code: z.string().optional(),
});

export type PatchNodeRequest = z.infer<typeof patchNodeSchema>;
