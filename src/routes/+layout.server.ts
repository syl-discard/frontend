// src: https://authjs.dev/reference/sveltekit#managing-the-session
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	return {
		session: await event.locals.auth()
	};
};
