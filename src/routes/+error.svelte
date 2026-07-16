<script lang="ts">
	import { page } from "$app/state";
	import { Button } from "$lib/components/ui/button/index.js";
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center gap-10">
	<h1 class="text-3xl font-bold tracking-tighter">
		Tablature<span class="text-primary">DB</span>
	</h1>
	<p class="bg-muted p-6"><code>{page.status}</code> — {page.error?.message}</p>
	<Button href="/">Go home</Button>
</div>
