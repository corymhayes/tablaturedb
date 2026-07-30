import { sentrySvelteKit } from "@sentry/sveltekit";
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
		sentrySvelteKit({
			org: "cory-hayes",
			project: "javascript-sveltekit"
		}),
		tailwindcss(),
		sveltekit({
			adapter: adapter(),
			alias: {
				$routes: "./src/routes"
			},
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes("node_modules") ? undefined : true
      },
			experimental: {
				instrumentation: {
					server: true
				}
			},
			typescript: {
				config: (config) => ({
					...config,
					include: [...config.include, "../drizzle.config.ts"]
				})
			}
		})
	]
});
