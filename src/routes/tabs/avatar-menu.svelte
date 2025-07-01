<script lang="ts">
	import { enhance } from "$app/forms";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import * as Avatar from "$lib/components/ui/avatar";
	import AddTab from "./add-tab.svelte";
	import type { Infer, SuperValidated } from "sveltekit-superforms";
	import { addTabSchema, type AddTabSchema, type SettingsSchema } from "$lib/tab-schema";
	import LogOut from "./log-out.svelte";
	import Settings from "./settings.svelte";

	let {
		data,
		settingsData,
		tunings,
		instruments
	}: {
		data: SuperValidated<Infer<AddTabSchema>>;
		settingsData: SuperValidated<Infer<SettingsSchema>>;
		tunings: string[];
		instruments: string[];
	} = $props();

	let addTabOpen = $state(false);
	let logoutOpen = $state(false);
	let settingsOpen = $state(false);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Avatar.Root>
			<Avatar.Fallback>CH</Avatar.Fallback>
		</Avatar.Root>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="mr-4 w-42">
		<DropdownMenu.Item onclick={() => (addTabOpen = true)}>
			Add
			<DropdownMenu.Shortcut>N</DropdownMenu.Shortcut>
		</DropdownMenu.Item>
		<DropdownMenu.Item
			onclick={() => {
				settingsOpen = true;
			}}
		>
			Settings
			<DropdownMenu.Shortcut>⌘.</DropdownMenu.Shortcut>
		</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item
			onclick={() => {
				console.log("Menu" + logoutOpen);
				logoutOpen = true;
			}}
		>
			Log out
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<AddTab {data} {tunings} {instruments} bind:open={addTabOpen} />
<Settings data={settingsData} bind:open={settingsOpen} {tunings} {instruments} />
<LogOut bind:open={logoutOpen} />
