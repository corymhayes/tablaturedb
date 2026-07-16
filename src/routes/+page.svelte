<script lang="ts">
	import LoginForm from "$lib/components/login-form.svelte";
	import SignupForm from "$lib/components/signup-form.svelte";
	import * as Tabs from "$lib/components/ui/tabs";

	let value = $state("signin");
	const changeValue = (newValue: string) => {
		value = newValue;
	};

	let { data } = $props();
</script>

<div class="flex min-h-screen w-screen flex-col items-center justify-center">
	<div class="absolute top-0 left-0 px-6 pt-6">
		<h1 class="text-3xl font-bold tracking-tighter">
			Tablature<span class="text-primary">DB</span>
		</h1>
	</div>
	<div class="-mb-4 flex w-full max-w-sm flex-col gap-6">
		<Tabs.Root {value}>
			<Tabs.Content value="signin">
				<LoginForm
					loginForm={data.loginForm}
					forgotPasswordForm={data.forgotPasswordForm}
					{changeValue}
				/>
			</Tabs.Content>
			<Tabs.Content value="signup">
				<SignupForm form={data.signupForm} {changeValue} />
			</Tabs.Content>
		</Tabs.Root>
	</div>
</div>
