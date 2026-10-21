import { describe, expect, it } from "vitest";
import { sql } from "drizzle-orm";
import { testDb } from "./helpers/test-db";

describe("test database", () => {
	it("connects to local PostgreSQL", async () => {
		const result = await testDb.execute(sql`select 1 as value`);

		expect(result[0].value).toBe(1);
	});
});
