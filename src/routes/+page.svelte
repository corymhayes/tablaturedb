<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";
	import { Label } from "$lib/components/ui/label";
	import SuperDebug, { superForm } from "sveltekit-superforms";

	import Login from "./login.svelte";
	import Register from "./register.svelte";

	let { data } = $props();
</script>

<!-- TODO: put into a tabbed card  -->

<div class="flex h-screen w-full items-center justify-center gap-10">
	<Login data={data.loginForm} />
	<Register data={data.registerForm} />
</div>
