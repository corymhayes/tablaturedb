<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import { Button } from "$lib/components/ui/button";
	import { Plus, X, Settings2 } from "@lucide/svelte";
	import Input from "$lib/components/input.svelte";
	import { superForm, type SuperValidated, type Infer } from "sveltekit-superforms";
	import { ScrollArea } from "$lib/components/ui/scroll-area";
	import { Label } from "$lib/components/ui/label";
	import type { SettingsSchema } from "$lib/tab-schema";

	let {
		data,
		open = $bindable(false),
		tunings,
		instruments
	}: { data: SuperValidated<Infer<SettingsSchema>>; open: boolean; tunings: string[]; instruments: string[] } = $props();

	const { form, errors, constraints, enhance } = superForm(data);

	function handleKeyDown(e: KeyboardEvent) {
		if (e.metaKey && e.key === ".") {
			open = true;
		}
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Settings</Dialog.Title>
		</Dialog.Header>

		<div class="mb-7 flex gap-10">
			<div class="w-1/2">
				<Label>Tunings</Label>

				<form action="?/addTuning" method="POST" use:enhance>
					<div class="mb-2 flex items-end gap-2">
						<Input
							name="tuning"
							type="text"
							bind:value={$form.tuning}
							errors={$errors.tuning}
							constraints={$constraints.tuning}
						/>
						<Button size="icon" class="h-9 w-11" type="submit">
							<Plus />
						</Button>
					</div>
				</form>

				<ScrollArea class="mt-2 h-50 rounded-md">
					<form action="?/deleteTuning" method="POST" use:enhance>
						<ul class="list-outside">
							{#each tunings as tuning}
								<li class="flex items-center justify-between rounded-md border-b p-2 last:border-none">
									{tuning}
									<Button type="submit" size="icon" class="bg-background">
										<X size="18" class="text-primary-foreground/35" />
									</Button>
									<input type="hidden" name="tuning" value={tuning} />
								</li>
							{/each}
						</ul>
					</form>
				</ScrollArea>
			</div>

			<div class="w-1/2">
				<Label>Instruments</Label>

				<form action="?/addInstrument" method="POST" use:enhance>
					<div class="mb-2 flex items-end gap-2">
						<Input
							name="instrument"
							type="text"
							bind:value={$form.instrument}
							errors={$errors.instrument}
							constraints={$constraints.instrument}
						/>
						<Button size="icon" class="h-9 w-11" type="submit">
							<Plus />
						</Button>
					</div>
				</form>

				<ScrollArea class="mt-2 h-50 rounded-md">
					<form action="?/deleteInstrument" method="POST" use:enhance>
						<ul class="list-outside">
							{#each instruments as instrument}
								<li class="flex items-center justify-between rounded-md border-b p-2 last:border-none">
									{instrument}
									<Button type="submit" size="icon" class="bg-background">
										<X size="18" class="hover:text-primary-foreground/35" />
									</Button>
									<input type="hidden" name="tuning" value={instrument} />
								</li>
							{/each}
						</ul>
					</form>
				</ScrollArea>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
