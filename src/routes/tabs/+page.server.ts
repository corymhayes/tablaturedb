import type { Actions, PageServerLoad } from "./$types";
import { auth } from "$lib/server/auth";
import { error, redirect } from "@sveltejs/kit";
import { zod4 } from "sveltekit-superforms/adapters";
import { fail, message, superValidate } from "sveltekit-superforms";
import {
	addTabSchema,
	updateTabSchema,
	deleteTabSchema,
	changeEmailSchema,
	changePasswordSchema,
	addTuningSchema,
	editTuningSchema
} from "$lib/schema";
import { insertTab, insertTuning } from "$lib/server/db/queries/insert";
import { selectTab, selectTabById, selectTuning, selectUniqueTuning } from "$lib/server/db/queries/select";
import { updateTab, updateTuning } from "$lib/server/db/queries/update";
import { deleteTab, deleteTuning } from "$lib/server/db/queries/delete";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, "/");
	}

	const addTabForm = await superValidate(zod4(addTabSchema));
	const updateTabForm = await superValidate(zod4(updateTabSchema));
	const changeEmail = await superValidate(zod4(changeEmailSchema));
	const newPassword = await superValidate(zod4(changePasswordSchema));
	const addTuningForm = await superValidate(zod4(addTuningSchema));
	const editTuningForm = await superValidate(zod4(editTuningSchema));
	const tabs = await selectTab(event.locals.user.id);
	const tunings = await selectTuning(event.locals.user.id);

	return {
		user: event.locals.user,
		tabs,
		tunings,
		form: addTabForm,
		updateTabForm,
		changeEmail,
		newPassword,
		addTuningForm,
		editTuningForm
	};
};

export const actions: Actions = {
	signOut: async (event) => {
		await auth.api.signOut({
			headers: event.request.headers
		});

		return redirect(302, "/");
	},
	addTab: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(addTabSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await insertTab({
				song: form.data.song,
				artist: form.data.artist,
				tuningId: form.data.tuning,
				link: form.data.link,
				userId: locals.user.id
			});
		} catch (error) {
			return fail(500, { form });
		}

		return { form };
	},
	updateTab: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(updateTabSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

    try {
      const exisiting = await selectTabById(form.data.id, locals.user.id)
      if (exisiting.length === 0) {
        return fail(404, { form });
      }

			await updateTab(form.data.id, {
				song: form.data.song,
				artist: form.data.artist,
				tuningId: form.data.tuning,
				link: form.data.link,
				userId: locals.user.id
			});
		} catch (error) {
			return fail(500, { form });
		}

		return { form };
	},
	deleteTab: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(deleteTabSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

    try {
      const exisiting = await selectTabById(form.data.id, locals.user.id)
      if (exisiting.length === 0) {
        return fail(404, { form });
      }
			await deleteTab(form.data.id);
		} catch (error) {
			return fail(500, { form });
		}

		return { success: true };
	},
	addTuning: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(addTuningSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const existing = await selectUniqueTuning(locals.user.id, form.data.tuning);

		if (existing.length > 0) {
			return error(409, "Tuning already exists");
		}

		try {
			const result = await insertTuning({
				name: form.data.tuning,
				userId: locals.user.id
			});

			return { form, newTuningId: result?.id };
		} catch (error) {
			return fail(500, { form });
		}
	},
	editTuning: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(editTuningSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { id, name } = form.data;

		try {
			await updateTuning(id, { name });
		} catch (error) {
			return fail(500, { form });
		}

		return { form };
	},
	deleteTuning: async ({ request }) => {
		const data = await request.formData();
		const id = data.get("id");

		if (!id || typeof id !== "string") {
			return fail(400, { message: "Invalid tuning id" });
		}

		try {
			await deleteTuning(id);
		} catch (error) {
			return fail(500, { message: "Failed to delete tuning" });
		}

		return { success: true };
	},
	changeEmail: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(changeEmailSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const verified = await auth.api.verifyPassword({
			body: {
				password: form.data.currentPassword
			},
			headers: request.headers
		});

		if (!verified.status) {
			return message(form, "Invalid password", { status: 400 });
		}

		// check if email is already in use
		const result = await auth.api.changeEmail({
			body: {
				newEmail: form.data.email,
				callbackURL: "/tabs"
			},
			headers: request.headers
		});

		return message(form, "Email verification sent");
	},
	changePassword: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(changePasswordSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await auth.api.changePassword({
				body: {
					newPassword: form.data.newPassword,
					currentPassword: form.data.currentPassword,
					revokeOtherSessions: true
				},
				headers: request.headers
			});
		} catch (error) {
			return fail(500, { form });
		}

		return { form };
	}
};
