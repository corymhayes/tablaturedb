import { PUBLIC_APP_ENV } from "$env/static/public";
import * as Sentry from "@sentry/sveltekit";

Sentry.init({
	dsn: "https://04a47adc4a1fc60fc3a9a3dd5344a8bd@o4511824610983936.ingest.us.sentry.io/4511824615899136",
	environment: PUBLIC_APP_ENV,
	tracesSampleRate: 1.0,

	// Enable logs to be sent to Sentry
	enableLogs: true

	// uncomment the line below to enable Spotlight (https://spotlightjs.com)
	// spotlight: import.meta.env.DEV,
});
