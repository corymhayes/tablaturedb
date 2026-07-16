<script lang="ts">
	import type { PageServerData } from "./$types";
	import { setContext, untrack } from "svelte";
	import DataTable from "./data-table.svelte";
	import { columns } from "./columns.ts";
	import AddTab from "./add-tab.svelte";
	import LogOutAlert from "./log-out-alert.svelte";
	import Settings from "./settings.svelte";

	import * as Avatar from "$lib/components/ui/avatar";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

	let { data }: { data: PageServerData } = $props();
	setContext(
		"form",
		untrack(() => data.updateTabForm)
	);
	setContext(
		"editTuning",
		untrack(() => data.editTuningForm)
	);
	setContext(
		"addTuning",
		untrack(() => data.addTuningForm)
	);

	let initials = $derived.by(() => {
		let names = data.user?.name.split(" ");
		return `${names[0][0]}${names[1][0]}`;
	});

	let tuningsState = $state({ items: data.tunings });
	$effect(() => {
		tuningsState.items = data.tunings;
	});
	setContext("tunings", tuningsState);

	let showAddDialog = $state(false);
	let showSettings = $state(false);
	let showLogOutAlert = $state(false);

	const closeAddDialog = () => (showAddDialog = false);
	const closeSettings = () => (showSettings = false);
	const closeLogOutAlert = () => (showLogOutAlert = false);
</script>

<div class="flex w-full items-center justify-between border-b px-6 pb-6">
	<h1 class="text-2xl font-bold tracking-[-5%]">Tablature<span class="text-primary">DB</span></h1>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger class="cursor-pointer">
			<Avatar.Root>
				<Avatar.Image src={data.user?.image} alt="User avatar" />
				<Avatar.Fallback class="bg-primary text-primary-foreground">
					<span>{initials}</span>
				</Avatar.Fallback>
			</Avatar.Root>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Item onSelect={() => (showAddDialog = true)}>Add Tab</DropdownMenu.Item>
			<DropdownMenu.Item onSelect={() => (showSettings = true)}>Settings</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item onSelect={() => (showLogOutAlert = true)}>Log out</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>

<DataTable data={data.tabs} {columns} />
<AddTab {showAddDialog} {closeAddDialog} form={data.form} tunings={data.tunings} />
<Settings
	{showSettings}
	{closeSettings}
	email={data.changeEmail}
	password={data.newPassword}
	addTuning={data.addTuningForm}
	tunings={data.tunings}
/>
<LogOutAlert {showLogOutAlert} {closeLogOutAlert} />
