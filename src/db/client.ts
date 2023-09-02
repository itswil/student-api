import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(process.env.DATABASE_URL, { ssl: "require" });
const db: PostgresJsDatabase = drizzle(queryClient);

export { db };
