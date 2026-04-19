ALTER TABLE "orders" RENAME COLUMN "items" TO "item";--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "totalPrice" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "discount" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "finalPrice" real NOT NULL;