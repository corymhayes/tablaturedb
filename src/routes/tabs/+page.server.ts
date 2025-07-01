import { fail, redirect } from "@sveltejs/kit";
import type { Tab } from "$lib/types/Tab";

import { message, setError, superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import { addTabSchema, deleteTabSchema, editTabSchema, settingsSchema } from "$lib/tab-schema.js";

export const load = async ({ locals }) => {
	// if no valid user return to login screen
	if (!locals.pb.authStore.isValid) {
		return redirect(303, "/");
	}

	const addTabForm = await superValidate(zod4(addTabSchema));
	const editTabForm = await superValidate(zod4(editTabSchema));
	const deleteTabForm = await superValidate(zod4(deleteTabSchema));
	const settingsForm = await superValidate(zod4(settingsSchema));

	let tabs: Tab[] = [];
	const tunings: string[] = locals.user?.tunings;
	const instruments: string[] = locals.user?.instruments;

	tabs = await locals.pb.collection("tabs").getFullList({
		filter: `user="${locals.pb.authStore.record?.id}"`,
		fields: "id, artist, song, tuning, capo, instrument, link",
		sort: "song"
	});

	return { tabs, tunings, instruments, addTabForm, editTabForm, deleteTabForm, settingsForm };
};

export const actions = {
	logout: async ({ locals }) => {
		console.log("first");
		locals.pb.authStore.clear();
		throw redirect(303, "/");
	},
	addTab: async ({ locals, request }) => {
		const addTabForm = await superValidate(request, zod4(addTabSchema));

		console.log(addTabForm);

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
		const deleteForm = await superValidate(request, zod4(deleteTabSchema));

		try {
			await locals.pb.collection("tabs").delete(`${deleteForm.data.id}`);
		} catch {
			return setError(deleteForm, "id", "Unable to delete");
		}

		return message(deleteForm, "Tab deleted!");
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

		try {
			await locals.pb.collection("tabs").update(`${tab.id}`, tab);
		} catch {
			return setError(editTabForm, "link", "Unable to save tab");
		}

		return message(editTabForm, "Tab updated!");
	},
	addTuning: async ({ locals, request }) => {
		const settingsForm = await superValidate(request, zod4(settingsSchema));
		const prevTunings = await locals.pb.collection("users").getFullList({ fields: "tunings" });
		prevTunings[0].tunings.push(settingsForm.data.tuning);

		try {
			await locals.pb.collection("users").update(locals.user!.id, ...prevTunings);
		} catch {
			return setError(settingsForm, "Unable to save tuning");
		}

		return message(settingsForm, "Tuning added!");
	},
	deleteTuning: async ({ locals, request }) => {
		const settingsForm = await superValidate(request, zod4(settingsSchema));
		const tunings = await locals.pb.collection("users").getFullList({ fields: "tunings" });
		const tuningLoc = tunings[0].tunings.indexOf(settingsForm.data.tuning);
		tunings[0].tunings.splice(tuningLoc, 1);

		try {
			await locals.pb.collection("users").update(locals.user!.id, ...tunings);
		} catch {
			return setError(settingsForm, "Unable to delete tuning");
		}

		return message(settingsForm, "Tuning deleted!");
	},
	addInstrument: async ({ locals, request }) => {
		const settingsForm = await superValidate(request, zod4(settingsSchema));
		const prevInstruments = await locals.pb.collection("users").getFullList({ fields: "instruments" });
		prevInstruments[0].instruments.push(settingsForm.data.instrument);

		try {
			await locals.pb.collection("users").update(locals.user!.id, ...prevInstruments);
		} catch {
			return setError(settingsForm, "Unable to save instrument");
		}

		return message(settingsForm, "Tuning added!");
	},
	deleteInstrument: async ({ locals, request }) => {
		const settingsForm = await superValidate(request, zod4(settingsSchema));
		const instruments = await locals.pb.collection("users").getFullList({ fields: "instruments" });
		const instrumentLoc = instruments[0].instruments.indexOf(settingsForm.data.tuning);
		instruments[0].instruments.splice(instrumentLoc, 1);

		try {
			await locals.pb.collection("users").update(locals.user!.id, ...instruments);
		} catch {
			return setError(settingsForm, "Unable to delete tuning");
		}

		return message(settingsForm, "Tuning deleted!");
	}
};
