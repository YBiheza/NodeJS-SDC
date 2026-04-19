CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"items" text NOT NULL,
	"totalPrice" integer NOT NULL,
	"country" text NOT NULL,
	"date" timestamp NOT NULL,
	"discount" integer NOT NULL
);
