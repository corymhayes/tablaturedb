import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "$lib/server/db/schema";

const connectionString = process.env.DATABASE_URL_TEST;

if (!connectionString) {
	throw new Error("DATABASE_URL_TEST is not set");
}

const client = postgres(connectionString);

export const testDb = drizzle({
	client,
	schema
});

export { client as testDbClient };
