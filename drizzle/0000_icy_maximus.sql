CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"item" text NOT NULL,
	"totalPrice" real NOT NULL,
	"country" text NOT NULL,
	"date" timestamp NOT NULL,
	"discount" real NOT NULL,
	"finalPrice" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shipments" (
	"id" serial PRIMARY KEY NOT NULL,
	"targetWarehouse" text NOT NULL,
	"ingredient_id" text NOT NULL,
	"unit" integer NOT NULL,
	"date" timestamp NOT NULL
);
