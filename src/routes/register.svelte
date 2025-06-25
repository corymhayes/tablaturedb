<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Input as InputCN } from "$lib/components/ui/input";
	import Input from "$lib/components/input.svelte";
	import { Button } from "$lib/components/ui/button";
	import { Label } from "$lib/components/ui/label";
	import { superForm, type SuperValidated, type Infer } from "sveltekit-superforms";
	import type { RegisterSchema } from "$lib/account-schema";

	let { data }: { data: SuperValidated<Infer<RegisterSchema>> } = $props();

	const { form, errors, constraints, enhance } = superForm(data);
</script>

<Card.Root class="w-[350px]">
	<Card.Header>
		<Card.Title>Create Account</Card.Title>
	</Card.Header>
	<Card.Content>
		<form class="flex flex-col gap-5" action="?/register" method="POST" use:enhance>
			<div class="flex justify-between gap-5">
				<div class="flex w-full flex-col gap-1.5">
					<Input
						name="first_name"
						type="text"
						label="First Name"
						bind:value={$form.first_name}
						errors={$errors.first_name}
						constraints={$constraints.first_name}
					/>
				</div>
				<div class="flex w-full flex-col gap-1.5">
					<Input
						name="last_name"
						type="text"
						label="Last Name"
						bind:value={$form.last_name}
						errors={$errors.last_name}
						constraints={$constraints.last_name}
					/>
				</div>
			</div>
			<div class="flex w-full flex-col gap-1.5">
				<Input
					name="email"
					type="email"
					label="Email"
					bind:value={$form.email}
					errors={$errors.email}
					constraints={$constraints.email}
				/>
			</div>
			<div class="flex w-full flex-col gap-1.5">
				<Input
					name="password"
					type="password"
					label="Password"
					bind:value={$form.password}
					errors={$errors.password}
					constraints={$constraints.password}
				/>
			</div>
			<div class="flex w-full flex-col gap-1.5">
				<Input
					name="password_confirm"
					type="password"
					label="Confirm Password"
					bind:value={$form.password_confirm}
					errors={$errors.password_confirm}
					constraints={$constraints.password_confirm}
				/>
			</div>
		</form>
	</Card.Content>
	<Card.Footer>
		<Button class="w-30" type="submit">Create</Button>
	</Card.Footer>
</Card.Root>
