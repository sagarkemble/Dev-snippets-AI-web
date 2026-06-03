import z from "zod";

export const deleteNodeSchema = z.object({
  nodeId: z.number(),
});

export type DeleteNodeRequest = z.infer<typeof deleteNodeSchema>;
