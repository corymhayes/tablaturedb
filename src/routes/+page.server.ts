import { fail, redirect } from "@sveltejs/kit";
import { ClientResponseError } from "pocketbase";
import type { PageServerLoad } from "./$types.js";

export const load = (async ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		return redirect(303, "/tabs");
	}

	return {};
}) satisfies PageServerLoad;

export const actions = {
	createAccount: async ({ locals, request }) => {
		const data = await request.formData();
		const first_name = data.get("first-name");
		const last_name = data.get("last-name");
		const email = data.get("email");
		const password = data.get("password");
		const passwordConfirm = data.get("confirm-password");

		if (!email || !password || !passwordConfirm) {
			return fail(400, { emailRequired: email === null, passwordRequired: password === null });
		}

		const account_info = {
			first_name,
			last_name,
			email,
			password,
			passwordConfirm
		};

		try {
			await locals.pb.collection("users").create(account_info);
			await locals.pb.collection("users").requestVerification(email.toString());
			await locals.pb.collection("users").authWithPassword(email.toString(), password.toString());
		} catch (err) {
			const errObj = err as ClientResponseError;
			return fail(500, { fail: true, message: errObj.data.message });
		}
	},
	login: async ({ locals, request }) => {
		const data = await request.formData();
		const email = data.get("email");
		const password = data.get("password");

		if (!email || !password) {
			return fail(400, { emailRequired: email === null, passwordRequired: password === null });
		}

		try {
			await locals.pb.collection("users").authWithPassword(email.toString(), password.toString());
		} catch (err) {
			const errObj = err as ClientResponseError;
			return fail(500, { fail: true, message: errObj.data.message });
		}
	},
	register: async ({ locals, request }) => {
		const data = await request.formData();
		const email = data.get("email") as string;
		const password = data.get("password");

		if (!email || !password) {
			return fail(400, { emailRequired: email === null, passwordRequired: password === null });
		}

		data.set("passwordConfirm", password?.toString());

		try {
			await locals.pb.collection("users").create(data);
			await locals.pb.collection("users").authWithPassword(email, password.toString());
			await locals.pb.collection('users"').requestVerification(email);
		} catch (err) {
			const errObj = err as ClientResponseError;
			return fail(500, { fail: true, message: errObj.data.message });
		}

		throw redirect(303, "/tabs");
	}
};
