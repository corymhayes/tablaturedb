<script lang="ts">
	import { enhance } from "$app/forms";
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";
	import { Label } from "$lib/components/ui/label";
	import { Pencil, Plus } from "@lucide/svelte";
	import type { Tab } from "$lib/types/Tab";

	let { tab }: { tab: Tab; type: string } = $props();
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger>
		<Button size="icon">
			<Pencil />
		</Button>
	</AlertDialog.Trigger>
	<AlertDialog.Content class="w-96">
		<AlertDialog.Header>
			<AlertDialog.Title>Edit tab</AlertDialog.Title>
		</AlertDialog.Header>
		<form action="?/update" method="POST" use:enhance>
			<div class="mb-7 flex flex-col gap-5">
				<Input type="hidden" name="id" value={tab.id} />
				<div class="flex w-full flex-col gap-1.5">
					<Label for="email">Song</Label>
					<Input type="text" name="song" value={tab.song} />
				</div>
				<div class="flex w-full flex-col gap-1.5">
					<Label for="email">Artist</Label>
					<Input type="text" name="artist" value={tab.artist} />
				</div>
				<div class="flex justify-between gap-5">
					<div class="flex w-full flex-col gap-1.5">
						<Label for="email">Tuning</Label>
						<Input type="text" name="tuning" value={tab.tuning} />
					</div>
					<div class="flex w-full flex-col gap-1.5">
						<Label for="email">Instrument</Label>
						<Input type="text" name="instrument" value={tab.instrument} />
					</div>
				</div>
				<div class="flex w-full flex-col gap-1.5">
					<Label for="email">Link</Label>
					<Input type="text" name="link" value={tab.link} />
				</div>
			</div>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<Button type="submit">Save</Button>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
