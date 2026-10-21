import type { PgAsyncDatabase } from "drizzle-orm/pg-core/async";

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
import { DATABASE_URL } from "$env/static/private";

if (!DATABASE_URL) throw new Error("DATABASE_URL is not set");

const client = neon(DATABASE_URL);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Database = PgAsyncDatabase<any, typeof schema>;
export const db = drizzle({ client, schema });
