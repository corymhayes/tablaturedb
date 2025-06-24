<script lang="ts">
	let { children } = $props();
	import { Toaster } from "$lib/components/ui/sonner";
</script>

{@render children()}

<Toaster />
