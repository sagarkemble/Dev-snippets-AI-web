CREATE TYPE "public"."node_type" AS ENUM('file', 'folder');--> statement-breakpoint
CREATE TABLE "file_nodes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "file_nodes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"parent_id" integer,
	"name" varchar(255) NOT NULL,
	"type" "node_type" NOT NULL,
	"is_favorite" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "file_nodes_user_id_parent_id_name_unique" UNIQUE("user_id","parent_id","name")
);
--> statement-breakpoint
CREATE TABLE "snippets" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "snippets_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"node_id" integer NOT NULL,
	"title" varchar(255),
	"description" text,
	"ext" varchar(10),
	"code" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "snippets_node_id_unique" UNIQUE("node_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "file_nodes" ADD CONSTRAINT "file_nodes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "file_nodes" ADD CONSTRAINT "file_nodes_parent_id_file_nodes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."file_nodes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "snippets" ADD CONSTRAINT "snippets_node_id_file_nodes_id_fk" FOREIGN KEY ("node_id") REFERENCES "public"."file_nodes"("id") ON DELETE cascade ON UPDATE no action;