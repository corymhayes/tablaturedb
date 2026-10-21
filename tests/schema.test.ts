import { describe, expect, it } from "vitest";
import { addTabSchema } from "$lib/schema";

describe("addTabSchema", () => {
	it("requires a song name", () => {
		const result = addTabSchema.safeParse({
			song: "  ",
			artist: "",
			tuning: "",
			link: ""
		});

		expect(result.success).toBe(false);
	});

	it("allows a missing artist", () => {
		const result = addTabSchema.safeParse({
			song: "Fight Fire with Fire",
			artist: "",
			tuning: "",
			link: ""
		});

		expect(result.success).toBe(true);

		if (result.success) {
			expect(result.data.artist).toBe(null);
			expect(result.data.link).toBe(null);
		}
	});
});
