import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  dob: varchar("dob", { length: 10 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
});
