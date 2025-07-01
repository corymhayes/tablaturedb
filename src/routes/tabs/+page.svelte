<script lang="ts">
	import AvatarMenu from "./avatar-menu.svelte";
	import DataTable from "./data-table.svelte";
	import { columns } from "./columns";

	let { data } = $props();
</script>

<div class="m-4">
	<div class="flex justify-between">
		<h1 class="scroll-m-20 text-4xl font-bold tracking-tight lg:text-3xl">
			Tablature<span class="text-primary font-extrabold">DB</span>
		</h1>
		<div class="flex items-center gap-2">
			<AvatarMenu
				data={data.addTabForm}
				settingsData={data.settingsForm}
				tunings={data.tunings}
				instruments={data.instruments}
			/>
		</div>
	</div>
	<DataTable
		data={data.tabs}
		{columns}
		editTabAction={data.editTabForm}
		deleteTabAction={data.deleteTabForm}
		tunings={data.tunings}
		instruments={data.instruments}
	/>
</div>
