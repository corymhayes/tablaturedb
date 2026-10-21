import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { randomUUID } from "node:crypto";
import { eq, inArray } from "drizzle-orm";
import { testDb, testDbClient } from "./helpers/test-db";
import { insertTab, insertTuning } from "../src/lib/server/db/queries/insert";
import { selectTab, selectTabById, selectTuning } from "../src/lib/server/db/queries/select";
import { deleteTab, deleteTuning } from "../src/lib/server/db/queries/delete";
import { updateTab, updateTuning } from "../src/lib/server/db/queries/update";
import { tablatures, tunings, user } from "../src/lib/server/db/schema";

const createdUserIds: string[] = [];
const createdTuningIds: string[] = [];

describe("tab CRUD workflows", () => {
	let userId: string;

	beforeEach(async () => {
		userId = `test-user-${randomUUID()}`;
		createdUserIds.push(userId);

		await testDb.insert(user).values({
			id: userId,
			name: "CRUD Test User",
			email: `${userId}@example.com`,
			emailVerified: true
		});
	});

	it("creates, reads, updates, and deletes a tab", async () => {
		await insertTab(testDb, {
			song: "Test Song",
			artist: "Test Artist",
			tuningId: null,
			link: "https://example.com/tab",
			userId
		});

		const created = await selectTab(testDb, userId);
		expect(created).toHaveLength(1);
		expect(created[0].song).toBe("Test Song");

		const tabId = created[0].id;
		const updated = await updateTab(testDb, tabId, userId, {
			song: "Updated Song",
			artist: null,
			tuningId: null,
			link: null,
			userId
		});

		expect(updated).toHaveLength(1);

		const afterUpdate = await selectTabById(testDb, tabId, userId);
		expect(afterUpdate[0].song).toBe("Updated Song");
		expect(afterUpdate[0].artist).toBeNull();
		expect(afterUpdate[0].link).toBeNull();

		const deleted = await deleteTab(testDb, tabId, userId);
		expect(deleted).toHaveLength(1);

		const afterDelete = await selectTabById(testDb, tabId, userId);
		expect(afterDelete).toHaveLength(0);
	});
});

describe("tuning CRUD workflows", () => {
	let userId: string;

	beforeEach(async () => {
		userId = `test-user-${randomUUID()}`;
		createdUserIds.push(userId);

		await testDb.insert(user).values({
			id: userId,
			name: "CRUD Test User",
			email: `${userId}@example.com`,
			emailVerified: true
		});
	});

	it("creates, reads, updates, and deletes a custom tuning", async () => {
		const created = await insertTuning(testDb, {
			name: "Test Tuning",
			userId
		});

		expect(created).toBeDefined();
		if (!created) return;

		createdTuningIds.push(created.id);

		const visible = await selectTuning(testDb, userId);
		expect(visible.some((tuning) => tuning.id === created.id)).toBe(true);

		const updated = await updateTuning(testDb, created.id, userId, {
			name: "Updated Tuning",
			userId
		});

		expect(updated).toHaveLength(1);

		const renamed = await testDb
			.select()
			.from(tunings)
			.where(eq(tunings.id, created.id));
		expect(renamed[0].name).toBe("Updated Tuning");

		const deleted = await deleteTuning(testDb, created.id, userId);
		expect(deleted).toHaveLength(1);

		const afterDelete = await testDb
			.select()
			.from(tunings)
			.where(eq(tunings.id, created.id));
		expect(afterDelete).toHaveLength(0);
	});
});

afterAll(async () => {
	if (createdTuningIds.length > 0) {
		await testDb.delete(tunings).where(inArray(tunings.id, createdTuningIds));
	}

	if (createdUserIds.length > 0) {
		await testDb.delete(user).where(inArray(user.id, createdUserIds));
	}

	await testDbClient.end();
});
