import tailwindcss from "@tailwindcss/vite";
import adapter from "@sveltejs/adapter-node";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	server: {
		watch: {
			usePolling: true,
			interval: 1000
		}
	},
	plugins: [
		tailwindcss(),
		sveltekit({
			alias: {
				$routes: "./src/routes"
			},
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes("node_modules") ? undefined : true
			},

			adapter: adapter(),

			typescript: {
				config: (config) => ({
					...config,
					include: [...config.include, "../drizzle.config.ts"]
				})
			}
		})
	]
});
