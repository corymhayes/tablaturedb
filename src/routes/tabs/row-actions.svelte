<script lang="ts">
	import type { Tab } from "$lib/types/Tab";
	import type { Infer, SuperValidated } from "sveltekit-superforms";
	import DeleteTab from "./delete-tab.svelte";
	import EditTab from "./edit-tab.svelte";
	import type { DeleteTabSchema, EditTabSchema } from "$lib/tab-schema";

	let {
		id,
		tab,
		editTabAction,
		deleteTabAction,
		tunings,
		instruments
	}: {
		id: string;
		tab: Tab;
		editTabAction: SuperValidated<Infer<EditTabSchema>>;
		deleteTabAction: SuperValidated<Infer<DeleteTabSchema>>;
		tunings: string[];
		instruments: string[];
	} = $props();
</script>

<div class="flex justify-end gap-2">
	<EditTab {tab} data={editTabAction} {tunings} {instruments} />
	<DeleteTab {id} data={deleteTabAction} />
</div>
