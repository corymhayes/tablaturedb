<script lang="ts">
	import { authClient } from "$routes/auth-client";
	import * as Dialog from "$lib/components/ui/dialog";
	import * as Form from "$lib/components/ui/form";
	import { Input } from "$lib/components/ui/input";
	import * as Card from "$lib/components/ui/card";
	import { Separator } from "$lib/components/ui/separator";
	import { EllipsisVertical } from "@lucide/svelte/icons";
	import { ScrollArea } from "$lib/components/ui/scroll-area";

	import { superForm } from "sveltekit-superforms";
	import { zod4Client } from "sveltekit-superforms/adapters";
	import { changeEmailSchema, changePasswordSchema, addTuningSchema } from "$lib/schema.js";
	import * as Sidebar from "$lib/components/ui/sidebar";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import DeleteTuning from "./delete-tuning.svelte";
	import { toast } from "svelte-sonner";
	import EditTuning from "./edit-tuning.svelte";
	import type { SelectTuning } from "$lib/server/db/schema";
	import { Spinner } from "$lib/components/ui/spinner";

	let { showSettings, closeSettings, email, password, addTuning, tunings } = $props();

	const changeEmail = superForm(email, {
		validators: zod4Client(changeEmailSchema),
		onSubmit() {
			loading = true;
		},
		onResult() {
		  loading = false
		},
		onUpdate({ form }) {
			if (form.valid) {
				changeEmail.reset();
			}
		},
		async onUpdated({ form }) {
			if (form.valid) {
				toast.success("Email updated");
			}
		},
	});

	const newPassword = superForm(password, {
		validators: zod4Client(changePasswordSchema),
		onSubmit() {
			loading = true;
		},
		onResult() {
		  loading = false
		},
		onUpdate({ form }) {
			if (form.valid) {
				newPassword.reset();
			}
		}
	});

	const tuningForm = superForm(addTuning, {
		id: "add-tuning-settings",
		validators: zod4Client(addTuningSchema),
		onSubmit({ cancel }) {
			loading = true;
			if (checkTuningExists()) {
				cancel();
				toast.error("Tuning already exists");
			}
		},
		onResult() {
		  loading = false
		},
		onUpdate({ form }) {
			if (form.valid) {
				tuningForm.reset();
				toast.success("Tuning added");
			}
		},
		onError({ result }) {
			toast.error(result.error.message);
		}
	});

	const { form: changeEmailForm, enhance: changeEmailEnhance } = changeEmail;
	const { form: newPasswordForm, enhance: newPasswordEnhance } = newPassword;
	const { form: addTuningForm, enhance: addTuningEnhance } = tuningForm;

	let currentSetting = $state("account");
	let showDeleteTuning = $state(false);
	let showEditTuning = $state(false);
	let tuningId = $state("");
	let selectedTuning: SelectTuning | null = $state(null);
  let loading = $state(false);

	const closeTuningDelete = () => (showDeleteTuning = false);
	const closeTuningEdit = () => (showEditTuning = false);

	const checkTuningExists = () => {
		return tunings.some((t) => t.name === $addTuningForm.tuning);
	};
</script>

<Dialog.Root bind:open={showSettings} onOpenChange={closeSettings}>
	<Dialog.Content class="overflow-hidden p-0 md:max-h-125 md:max-w-175">
		<Sidebar.Provider class="items-start">
			<Sidebar.Root collapsible="none" variant="inset" class="hidden md:flex">
				<Sidebar.Content>
					<Sidebar.Inset>
						<Sidebar.Group>
							<Sidebar.GroupContent>
								<Sidebar.Menu>
									<Sidebar.MenuItem>
										<Sidebar.MenuButton
											onclick={() => (currentSetting = "account")}
											isActive={currentSetting === "account"}
										>
											Account settings
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
									<Sidebar.MenuItem>
										<Sidebar.MenuButton
											onclick={() => (currentSetting = "tunings")}
											isActive={currentSetting === "tunings"}
										>
											Tunings
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
								</Sidebar.Menu>
							</Sidebar.GroupContent>
						</Sidebar.Group>
					</Sidebar.Inset>
				</Sidebar.Content>
			</Sidebar.Root>
			<ScrollArea
				class="-mr-3 flex h-133 flex-1 flex-col overflow-scroll px-4 pb-8 whitespace-nowrap"
			>
				{#if currentSetting === "account"}
					<Card.Root class="mb-1 ring-0">
						<Card.Header>
							<Card.Title>Change email</Card.Title>
						</Card.Header>
						<Card.Content>
							<form method="POST" class="space-y-4" action="?/changeEmail" use:changeEmailEnhance>
								<Form.Field form={changeEmail} name="email">
									<Form.Control>
										{#snippet children({ props })}
											<Form.Label>Email</Form.Label>
											<div class="flex gap-2">
												<Input
													{...props}
													type="email"
													bind:value={$changeEmailForm.email}
													required
												/>
											</div>
										{/snippet}
									</Form.Control>
									<Form.FieldErrors />
								</Form.Field>
								<Form.Field form={changeEmail} name="currentPassword">
									<Form.Control>
										{#snippet children({ props })}
											<Form.Label>Password</Form.Label>
											<div class="flex gap-2">
												<Input
													{...props}
													type="password"
													bind:value={$changeEmailForm.currentPassword}
													required
												/>
											</div>
										{/snippet}
									</Form.Control>
									<Form.FieldErrors />
								</Form.Field>
								<Form.Button disabled={loading}>
									{#if loading}
										<Spinner />
									{:else}
										Add
									{/if}
								</Form.Button>
							</form>
						</Card.Content>
					</Card.Root>
					<Separator />
					<Card.Root class="ring-0">
						<Card.Header>
							<Card.Title>Change password</Card.Title>
						</Card.Header>
						<Card.Content>
							<form
								method="POST"
								action="?/changePassword"
								class="space-y-4"
								use:newPasswordEnhance
							>
								<Form.Field form={newPassword} name="currentPassword">
									<Form.Control>
										{#snippet children({ props })}
											<Form.Label>Current password</Form.Label>
											<Input
												{...props}
												type="password"
												bind:value={$newPasswordForm.currentPassword}
												required
											/>
										{/snippet}
									</Form.Control>
									<Form.FieldErrors />
								</Form.Field>
								<Form.Field form={newPassword} name="newPassword">
									<Form.Control>
										{#snippet children({ props })}
											<Form.Label>New password</Form.Label>
											<Input
												{...props}
												type="password"
												bind:value={$newPasswordForm.newPassword}
												required
											/>
										{/snippet}
									</Form.Control>
									<Form.FieldErrors />
								</Form.Field>
								<Form.Field form={newPassword} name="confirmPassword">
									<Form.Control>
										{#snippet children({ props })}
											<Form.Label>Confirm new password</Form.Label>
											<Input
												{...props}
												type="password"
												bind:value={$newPasswordForm.confirmPassword}
												required
											/>
										{/snippet}
									</Form.Control>
									<Form.FieldErrors />
								</Form.Field>

								<Form.Button disabled={loading}>
									{#if loading}
										<Spinner />
									{:else}
										Add
									{/if}
								</Form.Button>
							</form>
						</Card.Content>
					</Card.Root>
				{/if}

				{#if currentSetting === "tunings"}
					<Card.Root class="ring-0">
						<Card.Header>
							<Card.Title>Edit tunings</Card.Title>
						</Card.Header>
						<Card.Content>
							<form method="POST" class="space-y-4" action="?/addTuning" use:addTuningEnhance>
								<Form.Field form={tuningForm} name="tuning">
									<Form.Control>
										{#snippet children({ props })}
											<Form.Label>Add tuning</Form.Label>
											<div class="flex gap-2">
												<Input {...props} bind:value={$addTuningForm.tuning} required />
												<Form.Button disabled={loading}>
													{#if loading}
														<Spinner />
													{:else}
														Add
													{/if}
												</Form.Button>
											</div>
										{/snippet}
									</Form.Control>
									<Form.FieldErrors />
								</Form.Field>
							</form>
						</Card.Content>
					</Card.Root>

					<Card.Root class="ring-0">
						<Card.Header>
							<Card.Title>Current tunings</Card.Title>
						</Card.Header>
						<Card.Content>
							<ul class="space-y-2">
								{#each tunings as tuning (tuning.id)}
									<li class="m-0 grid h-10 grid-cols-2 px-4 odd:bg-black/25">
										<span class="inline-block self-center">
											{tuning.name}
										</span>
										{#if tuning.userId !== null}
											<span class="mt-1 inline-block self-center justify-self-end">
												{@render tuningMenu(tuning)}
											</span>
										{/if}
									</li>
								{/each}
							</ul>
						</Card.Content>
					</Card.Root>
				{/if}
			</ScrollArea>
		</Sidebar.Provider>
	</Dialog.Content>
</Dialog.Root>

{#snippet tuningMenu(tuning)}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<EllipsisVertical size={14} />
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Group>
				<DropdownMenu.Item
					onclick={() => {
						showEditTuning = true;
						selectedTuning = tuning;
					}}
				>
					Edit
				</DropdownMenu.Item>
				<DropdownMenu.Item
					onclick={() => {
						showDeleteTuning = true;
						tuningId = tuning.id;
					}}
				>
					Delete
				</DropdownMenu.Item>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/snippet}

<EditTuning open={showEditTuning} onOpenChange={closeTuningEdit} tuning={selectedTuning} />
<DeleteTuning open={showDeleteTuning} onOpenChange={closeTuningDelete} id={tuningId} />
