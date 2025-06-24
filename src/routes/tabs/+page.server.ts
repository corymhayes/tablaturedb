import { fail, redirect } from "@sveltejs/kit";
import type { Tab } from "$lib/types/Tab";

import { message, setError, superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import { addTabSchema, deleteTabSchema, editTabSchema } from "$lib/tab-schema.js";

export const load = async ({ locals }) => {
	// if no valid user return to login screen
	if (!locals.pb.authStore.isValid) {
		return redirect(303, "/");
	}

	const addTabForm = await superValidate(zod4(addTabSchema));
	const editTabForm = await superValidate(zod4(editTabSchema));
	const deleteTabForm = await superValidate(zod4(deleteTabSchema));

	let tabs: Tab[] = [];

	tabs = await locals.pb.collection("tabs").getFullList({
		filter: `user="${locals.pb.authStore.record?.id}"`,
		fields: "id, artist, song, tuning, capo, instrument, link",
		sort: "song"
	});

	return { tabs, addTabForm, editTabForm, deleteTabForm };
};

export const actions = {
	logout: async ({ locals }) => {
		await locals.pb.authStore.clear();
		throw redirect(303, "/");
	},
	addTab: async ({ locals, request }) => {
		const addTabForm = await superValidate(request, zod4(addTabSchema));

		if (!addTabForm.valid) {
			return fail(400, { addForm: addTabForm });
		}

		const tab: Tab = {
			song: addTabForm.data.song,
			artist: addTabForm.data.artist,
			tuning: addTabForm.data.tuning,
			instrument: addTabForm.data.instrument,
			link: addTabForm.data.link,
			user: locals.pb.authStore.record?.id
		};

		try {
			await locals.pb.collection("tabs").create(tab);
		} catch {
			return setError(addTabForm, "link", "Unable to save tab");
		}

		return message(addTabForm, "Tab added!");
	},
	delete: async ({ locals, request }) => {
		const deleteForm = await superValidate(request, zod4(deleteTabSchema), {
			id: ""
		});

		try {
			await locals.pb.collection("tabs").delete(`${deleteForm.data.id}`);
			return { deleteForm };
		} catch {
			return setError(deleteForm, "id", "Unable to delete");
		}
	},
	edit: async ({ locals, request }) => {
		const editTabForm = await superValidate(request, zod4(editTabSchema));

		if (!editTabForm.valid) {
			return fail(400, { addForm: editTabForm });
		}

		const tab: Tab = {
			id: editTabForm.data.id,
			song: editTabForm.data.song,
			artist: editTabForm.data.artist,
			tuning: editTabForm.data.tuning,
			instrument: editTabForm.data.instrument,
			link: editTabForm.data.link
		};

		// if no ID, add a user to the tab object
		try {
			await locals.pb.collection("tabs").update(`${tab.id}`, tab);
		} catch {
			return setError(editTabForm, "link", "Unable to save tab");
		}

		return message(editTabForm, "Tab updated!");
	}
};
