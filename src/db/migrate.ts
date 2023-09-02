import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./client";

migrate(db, { migrationsFolder: "./drizzle" })
  .then(() => {
    console.log("✅ Migration complete");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Migration failed", err);
    process.exit(1);
  });
