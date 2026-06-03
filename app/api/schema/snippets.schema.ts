import { z } from "zod";

export const snippetSchema = z.object({
  user_id: z.string(),
  parent_id: z.number().nullable(),
  name: z.string().min(1, "Name is required"),
  type: z.enum(["folder", "file"]),
  is_favorite: z.boolean(),
  description: z.string().optional(),
  ext: z.string().max(10).optional(),
  code: z.string().min(1, "Code is required"),
});

export type SnippetRequest = z.infer<typeof snippetSchema>;
