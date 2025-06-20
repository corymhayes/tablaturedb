<script lang="ts">
	import type { Tab } from "$lib/types/Tab";
	import DeleteTab from "./delete-tab.svelte";
	import EditTab from "./edit-tab.svelte";

	let { id, tab }: { id: string; tab: Tab } = $props();
</script>

<div class="flex justify-end gap-3">
	<EditTab {tab} type="edit" />
	<DeleteTab {id} />
</div>
