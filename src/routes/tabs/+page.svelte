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
	import { LayoutDashboard, Plus, Heart, Settings as SettingsIcon, LogOut } from "@lucide/svelte";
	import { toast } from "svelte-sonner";

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
		if (names?.length === 0) return "";
		if (names?.length === 1) return `${names[0][0]}`;
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
	let activeSection = $state("Overview");

	const closeAddDialog = () => (showAddDialog = false);
	const closeSettings = () => (showSettings = false);
	const closeLogOutAlert = () => (showLogOutAlert = false);
	const showFavoritesPlaceholder = () => {
		activeSection = "Favorites";
		toast.info("Favorites are coming soon");
	};
</script>

<div class="flex min-h-[calc(100vh-3rem)] w-full gap-6 font-mono">
	<aside class="hidden w-56 shrink-0 flex-col border-r border-[#292929] pr-5 lg:flex">
		<a href="/tabs" class="mb-10 px-3 text-xl font-medium">
			TABLATURE<span class="text-primary">DB</span>
		</a>

		<nav class="flex-1 space-y-1" aria-label="Dashboard navigation">
			<button
				type="button"
				class:bg-primary={activeSection === "Overview"}
				class:text-black={activeSection === "Overview"}
				class="flex w-full items-center gap-3 rounded px-3 py-2 text-left text-sm text-[#a3a3a3] transition-colors hover:bg-[#1c1c1c] hover:text-white"
				onclick={() => (activeSection = "Overview")}
			>
				<LayoutDashboard class="size-4" />
				Overview
			</button>
			<button
				type="button"
				class="flex w-full items-center gap-3 rounded px-3 py-2 text-left text-sm text-[#a3a3a3] transition-colors hover:bg-[#1c1c1c] hover:text-white"
				onclick={() => (showAddDialog = true)}
			>
				<Plus class="size-4" />
				Add a tab
			</button>
			<button
				type="button"
				class="flex w-full items-center gap-3 rounded px-3 py-2 text-left text-sm text-[#a3a3a3] transition-colors hover:bg-[#1c1c1c] hover:text-white"
				onclick={showFavoritesPlaceholder}
			>
				<Heart class="size-4" />
				Favorites
			</button>
			<button
				type="button"
				class="flex w-full items-center gap-3 rounded px-3 py-2 text-left text-sm text-[#a3a3a3] transition-colors hover:bg-[#1c1c1c] hover:text-white"
				onclick={() => (showSettings = true)}
			>
				<SettingsIcon class="size-4" />
				Settings
			</button>
		</nav>

		<div class="border-t border-[#292929] pt-4">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger
					class="flex w-full cursor-pointer items-center gap-3 rounded px-3 py-2 text-left hover:bg-[#1c1c1c]"
				>
					<Avatar.Root class="size-8">
						<Avatar.Image src={data.user?.image} alt="User avatar" />
						<Avatar.Fallback class="bg-primary text-primary-foreground">
							<span>{initials}</span>
						</Avatar.Fallback>
					</Avatar.Root>
					<span class="min-w-0 truncate text-sm">{data.user?.name}</span>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="bg-[#0a0a0a] font-mono">
					<DropdownMenu.Item onSelect={() => (showLogOutAlert = true)}>
						<LogOut class="size-4" /> Log out
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</aside>

	<section class="min-w-0 flex-1">
		<div class="flex w-full items-center justify-between pb-6">
			<div>
				<p class="text-xs uppercase tracking-[0.2em] text-[#737373]">{activeSection}</p>
				<h1 class="mt-1 uppercase text-2xl">Your tab library</h1>
			</div>
			<div class="lg:hidden">
				<DropdownMenu.Root>
					<DropdownMenu.Trigger class="cursor-pointer">
						<Avatar.Root>
							<Avatar.Image src={data.user?.image} alt="User avatar" />
							<Avatar.Fallback class="bg-primary text-primary-foreground"
								><span>{initials}</span></Avatar.Fallback
							>
						</Avatar.Root>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="bg-[#0a0a0a] font-mono">
						<DropdownMenu.Item onSelect={() => (showAddDialog = true)}>Add tab</DropdownMenu.Item>
						<DropdownMenu.Item onSelect={() => (showSettings = true)}>Settings</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item onSelect={() => (showLogOutAlert = true)}>Log out</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div>

		<DataTable data={data.tabs} {columns} />
	</section>
</div>

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
