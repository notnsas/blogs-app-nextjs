ALTER TABLE "blogs" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "author" text NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" DROP COLUMN "content";