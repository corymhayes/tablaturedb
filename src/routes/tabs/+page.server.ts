import { redirect } from "@sveltejs/kit";
import type { Tab } from "$lib/types/Tab";

export const load = async ({ locals }) => {
	// if no valid user return to login screen
	if (!locals.pb.authStore.isValid) {
		return redirect(303, "/");
	}

	let tabs: Tab[] = [];

	tabs = await locals.pb.collection("tabs").getFullList({
		filter: `user="${locals.pb.authStore.record?.id}"`,
		fields: "id, artist, song, tuning, capo, instrument, link",
		sort: "song"
	});

	return { tabs };
};

export const actions = {
	logout: async ({ locals }) => {
		await locals.pb.authStore.clear();
		throw redirect(303, "/");
	},
	delete: async ({ locals, request }) => {
		const data = await request.formData();
		const id = data.get("id");

		try {
			await locals.pb.collection("tabs").delete(`${id}`);
		} catch (err) {
			console.error(err);
		}
	},
	update: async ({ locals, request }) => {
		const data = await request.formData();
		const id = data.get("id");
		const song = data.get("song");
		const artist = data.get("artist");
		const tuning = data.get("tuning");
		const instrument = data.get("instrument");
		const link = data.get("link");

		const tab: Tab = {
			song: song || "",
			artist: artist || "",
			tuning: tuning || "",
			instrument: instrument || "",
			link: link || ""
		};

		// if no ID, add a user to the tab object
		if (!id) {
			tab.user = locals.pb.authStore.record?.id;
			await locals.pb.collection("tabs").create(tab);
			return { success: true };
		} else {
			await locals.pb.collection("tabs").update(`${id}`, tab);
			return { success: true };
		}
	}
};
