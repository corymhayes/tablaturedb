import type { PageServerLoad } from "./$types.js";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, "/tabs");
	}
};
