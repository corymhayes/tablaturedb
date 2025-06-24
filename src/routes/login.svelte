<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { superForm, type SuperValidated, type Infer } from "sveltekit-superforms";
	import type { LoginSchema } from "$lib/account-schema";
	import Input from "$lib/components/input.svelte";

	let { data }: { data: SuperValidated<Infer<LoginSchema>> } = $props();
	const { form, errors, constraints, enhance } = superForm(data);
</script>

<form action="?/login" method="POST" use:enhance>
	<Card.Root class="w-[350px]">
		<Card.Header>
			<Card.Title>Login</Card.Title>
		</Card.Header>
		<Card.Content class="flex flex-col gap-5">
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
		</Card.Content>
		<Card.Footer>
			<Button class="w-30" type="submit">Login</Button>
		</Card.Footer>
	</Card.Root>
</form>
