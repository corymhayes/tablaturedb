import { describe, expect, it } from "vitest";
import { testDb } from "./helpers/test-db";
import { updateTab } from "../src/lib/server/db/queries/update";
import { selectTabById } from "../src/lib/server/db/queries/select";

describe("tab ownership", () => {
	it("allows a user to update their own tab", async () => {
		const userId = "user_a";
		const tabId = "74190320-689f-4422-be78-571169322415";

		const result = await updateTab(testDb, tabId, userId, {
			song: "Updated Song",
			artist: null,
			tuningId: null,
			link: null,
			userId
		});

		expect(result).toHaveLength(1);

		const updatedTab = await selectTabById(testDb, tabId, userId);

		expect(updatedTab[0].song).toBe("Updated Song");
	});

	it("does not update another user's tab", async () => {
		const ownerId = "user_b";
		const attackerId = "user_a";
		const tabId = "ada53e13-42a3-4eb6-8072-3a9c0e16e157";

		const result = await updateTab(testDb, tabId, attackerId, {
			song: "Should Not Be Saved",
			artist: null,
			tuningId: null,
			link: null,
			userId: ownerId
		});

		expect(result).toHaveLength(0);

		const tab = await selectTabById(testDb, tabId, ownerId);

		expect(tab[0].song).not.toBe("Should Not Be Saved");
	});
});
