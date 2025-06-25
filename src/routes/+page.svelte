<script lang="ts">
	import * as Tabs from "$lib/components/ui/tabs";
	import Login from "./login.svelte";
	import Register from "./register.svelte";

	let { data } = $props();
</script>

<div class="flex flex-col items-center gap-8">
	<h1 class="scroll-m-20 text-4xl font-bold tracking-tight lg:text-3xl">
		Tablature<span class="text-primary font-extrabold">DB</span>
	</h1>
	<Tabs.Root value="login">
		<Tabs.List>
			<Tabs.Trigger value="login">Login</Tabs.Trigger>
			<Tabs.Trigger value="register">Create account</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="login">
			<Login data={data.loginForm} />
		</Tabs.Content>

		<Tabs.Content value="register">
			<Register data={data.registerForm} />
		</Tabs.Content>
	</Tabs.Root>
</div>
