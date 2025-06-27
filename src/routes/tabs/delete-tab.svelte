<script lang="ts">
	import Input from "$lib/components/input.svelte";
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import Button from "$lib/components/ui/button/button.svelte";
	import type { DeleteTabSchema } from "$lib/tab-schema";
	import { Trash } from "@lucide/svelte";
	import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
	import { toast } from "svelte-sonner";

	let { id, song, data }: { id: string; song: string; data: SuperValidated<Infer<DeleteTabSchema>> } = $props();

	let open = $state(false);

	const handleClick = () => {
		open = true;
	};

	const {
		form: deleteTabForm,
		errors: deleteTabErrors,
		constraints: deleteTabConstraints,
		enhance: deleteTabEnhance
	} = superForm(data, {
		id: id,
		onUpdated({ form }) {
			if (form.valid) {
				toast.success(form.message);
				open = false;
			}
		}
	});

	deleteTabForm.update(($form) => {
		$form.id = id;
		return $form;
	});
</script>

<AlertDialog.Root {open}>
	<AlertDialog.Trigger>
		<Button size="icon" variant="secondary" onclick={handleClick}><Trash /></Button>
	</AlertDialog.Trigger>
	<AlertDialog.Content class="w-100 leading-3">
		<AlertDialog.Header>
			<AlertDialog.Title>Delete {song}</AlertDialog.Title>
			<AlertDialog.Description class="mb-3">
				Are you sure? This will permanently delete <span class="text-white">{song}</span> from your account.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<form action="?/delete" method="POST" use:deleteTabEnhance class="flex gap-2">
				<Input
					name="id"
					type="hidden"
					bind:value={$deleteTabForm.id}
					errors={$deleteTabErrors.id}
					constraints={$deleteTabConstraints.id}
				/>
				<Button variant="destructive" type="submit">Delete</Button>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			</form>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
