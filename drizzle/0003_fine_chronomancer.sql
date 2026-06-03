DROP TABLE "snippets" CASCADE;--> statement-breakpoint
ALTER TABLE "file_nodes" ADD COLUMN "description" varchar(500);--> statement-breakpoint
ALTER TABLE "file_nodes" ADD COLUMN "code" text;