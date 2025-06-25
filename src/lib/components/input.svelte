<script lang="ts">
	import type { InputConstraint } from "sveltekit-superforms";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";

	let {
		name,
		value = $bindable(),
		type = "text",
		label,
		errors,
		constraints,
		...rest
	}: {
		name: string;
		value: string;
		type?: string;
		label?: string;
		errors?: string[];
		constraints?: InputConstraint;
	} = $props();
</script>

<div class="flex w-full flex-col gap-1.5">
	<Label for={label} class={errors ? "text-red-500" : "text-white"}>{label}</Label>
	<Input {name} {type} bind:value aria-invalid={errors ? "true" : undefined} {...constraints} {...rest} />
	<!-- {#if errors}<span class="text-xs text-red-500">{errors}</span>{/if} -->
</div>
