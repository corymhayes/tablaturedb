<script lang="ts">
	import { enhance } from "$app/forms";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import * as Avatar from "$lib/components/ui/avatar";
	import AddTab from "./add-tab-old.svelte";

	let { form } = $props();
	let open = $state(false);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Avatar.Root>
			<Avatar.Fallback>CH</Avatar.Fallback>
		</Avatar.Root>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-42">
		<DropdownMenu.Item onclick={() => (open = true)}>
			Add
			<DropdownMenu.Shortcut>N</DropdownMenu.Shortcut>
		</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<form method="post" action="?/logout" use:enhance>
			<DropdownMenu.Item onclick={() => form.submit()}>
				<button type="submit">Log out</button>
			</DropdownMenu.Item>
		</form>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<AddTab bind:openDialog={open} />
