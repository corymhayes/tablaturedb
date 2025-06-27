<script lang="ts">
	import { Label } from "$lib/components/ui/label";
	import * as Select from "$lib/components/ui/select";
	let { label, name, settings, value = $bindable(), ...props } = $props();
</script>

<div class="flex w-full flex-col gap-1.5">
	<Label>{label}</Label>
	<Select.Root type="single" bind:value {name}>
		<Select.Trigger class="w-full">
			{#if value}
				{value}
			{:else}
				<div></div>
			{/if}
		</Select.Trigger>
		<Select.Content>
			{#each settings as setting}
				<Select.Item value={setting} label={setting} />
			{/each}
		</Select.Content>
	</Select.Root>
</div>
