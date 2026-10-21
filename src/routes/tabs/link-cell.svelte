<script lang="ts">
	let { link }: { link: string | null } = $props();
</script>

{#if link}
	<a
		href={link}
		target="_blank"
		rel="external noopener noreferrer"
		class="underline underline-offset-4">{link}</a
	>
{:else}
	<span></span>
{/if}
