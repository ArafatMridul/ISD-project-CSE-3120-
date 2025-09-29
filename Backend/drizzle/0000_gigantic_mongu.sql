CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"userName" varchar(30) NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" text,
	"salt" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
