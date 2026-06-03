ALTER TABLE "file_nodes" DROP CONSTRAINT "file_nodes_parent_id_file_nodes_id_fk";
--> statement-breakpoint
ALTER TABLE "file_nodes" ADD CONSTRAINT "file_nodes_parent_id_file_nodes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."file_nodes"("id") ON DELETE cascade ON UPDATE no action;