<script lang="ts">
	import EditTab from "./edit-tab.svelte";
	import DeleteTab from "./delete-tab.svelte";

	let { id, tab } = $props();
</script>

<div class="flex items-center justify-end gap-3 pr-4">
	<EditTab {tab} />
	<DeleteTab {id} song={tab.song} />
</div>
