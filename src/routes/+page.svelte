<script lang="ts">
	import { enhance } from "$app/forms";
	import * as Card from "$lib/components/ui/card";
	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";
	import { Label } from "$lib/components/ui/label";

	import type { PageProps } from "./$types";

	let { data, form }: PageProps = $props();
</script>

<div class="flex h-screen w-full items-center justify-center gap-10">
	{#if form?.fail}
		<div>
			{form.message}
		</div>
	{/if}
	<form action="?/login" method="POST" use:enhance>
		<Card.Root class="w-[350px]">
			<Card.Header>
				<Card.Title>Login</Card.Title>
			</Card.Header>
			<Card.Content class="flex flex-col gap-5">
				<div class="flex w-full flex-col gap-1.5">
					<Label for="email">Email</Label>
					<Input id="email" type="email" name="email" class="max-w-xs" />
				</div>
				<div class="flex w-full flex-col gap-1.5">
					<Label for="password">Password</Label>
					<Input id="password" type="password" name="password" class="max-w-xs" />
				</div>
			</Card.Content>
			<Card.Footer>
				<Button class="w-30" type="submit">Login</Button>
			</Card.Footer>
		</Card.Root>
	</form>
	<form action="?/createAccount" method="POST" use:enhance>
		<Card.Root class="w-[350px]">
			<Card.Header>
				<Card.Title>Create Account</Card.Title>
			</Card.Header>
			<Card.Content class="flex flex-col gap-5">
				<div class="flex justify-between gap-5">
					<div class="flex w-full flex-col gap-1.5">
						<Label for="first-name">First Name</Label>
						<Input id="first-name" type="text" name="first-name" />
					</div>
					<div class="flex w-full flex-col gap-1.5">
						<Label for="last-name">Last Name</Label>
						<Input id="last-name" type="text" name="last-name" />
					</div>
				</div>
				<div class="flex w-full flex-col gap-1.5">
					<Label for="email">Email</Label>
					<Input id="email" type="text" name="email" />
				</div>
				<div class="flex w-full flex-col gap-1.5">
					<Label for="password">Password</Label>
					<Input id="password" type="password" name="password" />
				</div>
				<div class="flex w-full flex-col gap-1.5">
					<Label for="confirm-password">Confirm Password</Label>
					<Input id="confirm-password" type="password" name="confirm-password" />
				</div>
			</Card.Content>
			<Card.Footer>
				<Button class="w-30" type="submit">Create</Button>
			</Card.Footer>
		</Card.Root>
	</form>
</div>
