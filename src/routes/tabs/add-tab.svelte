<script lang="ts">
	import { enhance } from "$app/forms";
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";
	import { Label } from "$lib/components/ui/label";
	import { Plus } from "@lucide/svelte";

	let { openDialog = $bindable() }: { openDialog: boolean } = $props();

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === "n") {
			openDialog = true;
		}
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

<AlertDialog.Root open={openDialog} onOpenChange={(open) => (openDialog = open)}>
	<AlertDialog.Trigger>
		<Button><Plus />Add Tab</Button>
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Add tab</AlertDialog.Title>
		</AlertDialog.Header>
		<form action="?/update" method="POST" use:enhance>
			<div class="mb-7 flex flex-col gap-5">
				<div class="flex w-full flex-col gap-1.5">
					<Label for="email">Song</Label>
					<Input type="text" name="song" />
				</div>
				<div class="flex w-full flex-col gap-1.5">
					<Label for="email">Artist</Label>
					<Input type="text" name="artist" />
				</div>
				<div class="flex justify-between gap-5">
					<div class="flex w-full flex-col gap-1.5">
						<Label for="email">Tuning</Label>
						<Input type="text" name="tuning" />
					</div>
					<div class="flex w-full flex-col gap-1.5">
						<Label for="email">Instrument</Label>
						<Input type="text" name="instrument" />
					</div>
				</div>
				<div class="flex w-full flex-col gap-1.5">
					<Label for="email">Link</Label>
					<Input type="text" name="link" />
				</div>
			</div>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<Button type="submit">Save</Button>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
