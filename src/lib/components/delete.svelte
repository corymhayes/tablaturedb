<script lang="ts">
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import { Button } from "$lib/components/ui/button";
	import { Trash2 } from "@lucide/svelte";

	let { name, resource, onDelete }: { name: string; resource: string; onDelete?: () => void } =
		$props();
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger>
		<Button variant="destructive" size="icon">
			<Trash2 class="size-4" />
		</Button>
		<!-- <Button
			variant="destructive"
			size="icon"
			aria-label={`Delete ${row.name}`}
			disabled={row.isDefault}
			onclick={() => console.log("Delete", row.id)}
		>
			<Trash2 class="size-4" />
		</Button> -->
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title class="font-mono font-light uppercase tracking-widest text-primary"
				>Are you sure?</AlertDialog.Title
			>
			<AlertDialog.Description class="text-primary-foreground font-light">
				This action cannot be undone. This will permanently delete {name} from your {resource}.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel
				class="border border-transparent bg-background text-muted-foreground hover:border-border hover:bg-background font-light text-xs"
				>Cancel</AlertDialog.Cancel
			>
			<AlertDialog.Action variant="destructive" class="text-xs" onclick={onDelete}
				>Delete</AlertDialog.Action
			>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
