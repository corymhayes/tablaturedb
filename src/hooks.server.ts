import { redirect } from "@sveltejs/kit";
import PocketBase from "pocketbase";
import { env } from "$env/dynamic/private";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

export const authentication: Handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(env.PB_URL);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get("cookie") || "");

	const model = event.locals.pb.authStore.record;

	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection("users").authRefresh();
			event.locals.user = structuredClone(model);
			event.locals.user!.isSuperuser = event.locals.pb.authStore.isSuperuser;
		}
	} catch {
		event.locals.pb.authStore.clear();
		event.locals.user = null;
	}

	const res = await resolve(event);

	res.headers.set("set-cookie", event.locals.pb.authStore.exportToCookie({ secure: false }));

	return res;
};

const unprotectedPrefix = ["/login"];

export const authorization: Handle = async ({ event, resolve }) => {
	if (
		!unprotectedPrefix.some((path) => event.url.pathname.startsWith(path)) &&
		event.url.pathname !== "/"
	) {
		const loggedIn = await event.locals.pb.authStore;

		if (!loggedIn) {
			throw redirect(303, "/login");
		}
	}

	const result = await resolve(event);
	return result;
};

export const handle = sequence(authentication, authorization);
