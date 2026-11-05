<script lang="ts">
	import * as Field from "$lib/components/ui/field";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
</script>

<section class="flex max-w-xl flex-col gap-4">
	<h2 class="font-mono text-md font-light uppercase tracking-widest">Account Settings</h2>

	<div class="mt-6">
		<h3 class="font-light uppercase tracking-widest text-sm text-primary">Change email</h3>
	</div>

	<div class="flex flex-col mb-4">
		<span class="text-sm uppercase tracking-widest text-white/50">Current email</span>
		<span class="font-sans text-sm">tab@tablaturedb.com</span>
	</div>

	<form class="flex flex-col gap-2 sm:w-100">
		<Field.Field class="space-y-1.5">
			<Label for="newEmail">New email</Label>
			<Input
				id="newEmail"
				name="newEmail"
				type="text"
				placeholder="tab@tablaturedb.com"
				autocomplete="email"
				class="font-sans"
				required
			/>
		</Field.Field>

		<Field.Field class="space-y-1.5">
			<Label for="password">Password</Label>
			<Input
				id="password"
				name="password"
				type="password"
				autocomplete="current-password"
				class="font-sans"
				required
			/>
		</Field.Field>

		<Button type="submit" class="w-fit mt-4">Update email</Button>
	</form>

	<div class="w-full h-px bg-border my-6"></div>

	<h3 class="font-light uppercase tracking-widest text-sm text-primary">Change password</h3>

	<form class="flex flex-col gap-2 sm:w-100">
		<Field.Field class="space-y-1.5">
			<Label for="currentPassword">Current password</Label>
			<Input
				id="currentPassword"
				name="currentPassword"
				type="password"
				autocomplete="current-password"
				class="font-sans"
				required
			/>
		</Field.Field>

		<Field.Field class="space-y-1.5">
			<Label for="newPassword">New password</Label>

			<Input
				id="newPassword"
				name="newPassword"
				type="password"
				autocomplete="new-password"
				class="font-sans"
				required
			/>
		</Field.Field>

		<Field.Field class="space-y-1.5">
			<Label for="confirmNewPassword">Confirm new password</Label>

			<Input
				id="confirmNewPassword"
				name="confirmNewPassword"
				type="password"
				autocomplete="new-password"
				class="font-sans"
				required
			/>
		</Field.Field>

		<Button type="submit" class="w-fit mt-4">Update password</Button>
	</form>
</section>
