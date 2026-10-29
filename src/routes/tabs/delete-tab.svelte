<script lang="ts">
	import { enhance } from "$app/forms";
	import { toast } from "svelte-sonner";
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import { Trash } from "@lucide/svelte";
	import { Spinner } from "$lib/components/ui/spinner";
	const { id, song }: { id: string; song: string } = $props();
	let loading = $state(false);
	let open = $state(false);
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Trigger>
		<!-- <Trash size={16} class="cursor-pointer hover:text-primary" /> -->
		<span class="group relative block size-4 cursor-pointer">
			<img
				src="/trash-simple-fill.svg"
				alt="Edit tab"
				class="absolute inset-0 size-full opacity-100 transition-opacity duration-250 ease-in-out group-hover:opacity-0"
			/>
			<img
				src="/trash-simple-fill-hover.svg"
				alt=""
				aria-hidden="true"
				class="absolute inset-0 size-full opacity-0 transition-opacity duration-250 ease-in-out group-hover:opacity-100"
			/>
		</span>
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete Tab</AlertDialog.Title>
			<AlertDialog.Description>Are you sure you want to delete {song}?</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<form
				method="POST"
				action="?/deleteTab"
				onsubmit={() => (loading = true)}
				use:enhance={() => {
					return async ({ result, update }) => {
						if (result.type === "success") {
							update();
							loading = false;
							open = false;
							toast.success("Tab deleted successfully");
						}
					};
				}}
			>
				<input type="hidden" name="id" value={id} />
				<AlertDialog.Action type="submit" variant="destructive" disabled={loading}>
					{#if loading}
						<Spinner />
					{:else}
						Delete
					{/if}
				</AlertDialog.Action>
			</form>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
