<script lang="ts">
	import AddTab from "./add-tab.svelte";
	import DataTable from "./data-table.svelte";
	import type { RecordModel } from "pocketbase";
	import { columns } from "./columns";

	let { data } = $props();
	let open = $state(false);
</script>

<div class="m-2">
	<div class="flex justify-between">
		<h1 class="scroll-m-20 text-4xl font-bold tracking-tight lg:text-3xl">
			Tablature<span class="text-primary font-extrabold">DB</span>
		</h1>
		<div class="flex items-center gap-2">
			<AddTab bind:openDialog={open} />
		</div>
	</div>
	<DataTable data={data.tabs} {columns} />
</div>
