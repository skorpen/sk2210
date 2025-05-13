import type { PageServerLoad } from './$types';
	import { platformEnv, } from '$lib/env';

export const load = (async () => {
    return {
        platformEnv,
    };
}) satisfies PageServerLoad;