CREATE TABLE IF NOT EXISTS "students" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"dob" varchar(10) NOT NULL,
	"email" varchar(256) NOT NULL
);
