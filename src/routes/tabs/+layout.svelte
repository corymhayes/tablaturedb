<script lang="ts">
	let { children } = $props();
</script>

<main class="h-screen w-screen py-6 px-4 sm:px-10">
	{@render children()}
</main>
