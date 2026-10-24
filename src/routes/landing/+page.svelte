<svelte:head>
	<title>TablatureDB — All Your Tabs. All in One Place.</title>
	<meta
		name="description"
		content="Save your favorite guitar tabs from any website, organize your collection, and find the songs you want to play."
	/>
</svelte:head>

<header class="w-full bg-[#0a0a0a] font-mono">
	<nav class="mx-auto max-w-7xl px-6 lg:px-10 flex justify-between items-center h-20">
		<a
			href="/"
			class="whitespace-nowrap font-mono text-lg sm:text-2xl font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
		>
			TABLATURE<span class="text-primary">DB</span>
		</a>
		<div class="flex items-center justify-center gap-2 sm:gap-4">
			<a
				href="/login"
				class="uppercase px-3 sm:px-8 rounded border border-transparent hover:border-[#292929] h-12 flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
			>
				log in
			</a>
			<a
				href="/demo"
				class="uppercase px-3 sm:px-8 bg-primary h-12 rounded flex items-center justify-center transition-colors hover:bg-[#e67300] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
			>
				try demo
			</a>
		</div>
	</nav>
</header>

<main class="font-mono">
	<section class="relative isolate overflow-hidden bg-[#0a0a0a]">
		<div
			aria-hidden="true"
			class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_65%_65%_at_50%_65%,rgba(243,111,33,0.35),transparent_100%)]"
		></div>

		<div
			class="mx-auto flex w-full max-w-7xl flex-col items-center px-6 pt-20 lg:px-10 lg:pt-42 lg:pb-21"
		>
			<div class="max-w-3xl text-center">
				<h1 class="uppercase text-4xl md:text-5xl lg:text-6xl">
					all your tabs.
					<span class="block text-primary">all in one place.</span>
				</h1>

				<p class="mx-auto mt-6 max-w-xl text-[#a3a3a3] font-light text-lg">
					Save your favorite tabs from any website and always know where to find them.
				</p>
			</div>

			<div class="mt-10 flex flex-col gap-8 sm:flex-row">
				<div class="flex flex-col justify-center items-center gap-2">
					<a
						href="/demo"
						class="uppercase hover:bg-[#e67300] transition-colors w-48 h-16 rounded bg-primary text-xl flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
					>
						Try demo
					</a>
				</div>
				<div class="flex flex-col justify-center items-center gap-2">
					<a
						href="/signup"
						class="uppercase w-48 h-17 rounded bg-[#0a0a0a] text-xl flex items-center justify-center border border-[#292929] hover:border-[#ff8000] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
					>
						Get started
					</a>
				</div>
			</div>
		</div>

		<div
			class="mx-auto mt-16 h-[275px] w-full max-w-[1500px] overflow-hidden lg:h-[448px] px-2 sm:px-6 lg:px-10"
		>
			<div
				class="overflow-hidden rounded-t-[8px] lg:h-[448px] border-r-[0.15rem] lg:border-0 border-r-[#2d2d2d] shadow-xl shadow-black/50"
			>
				<img
					src="/product.png"
					alt="Preview of TablatureDB showing a library of saved guitar tabs."
					class="block h-auto w-[750px] max-w-none sm:w-[1100px] lg:w-full"
					fetchpriority="high"
				/>
			</div>
		</div>
	</section>

	<section class="relative z-10 bg-[#0a0a0a]">
		<div class="mx-auto border-t border-t-[#292929]"></div>
		<div class="mx-auto max-w-7xl px-6 py-30 lg:px-10 flex items-center justify-center">
			<h2 class="uppercase text-5xl md:text-6xl">
				Less searching. <span class="text-primary">More Playing.</span>
			</h2>
		</div>
	</section>

	<section class="relative bg-[#0a0a0a] border-y border-y-[#292929]">
		<div
			class="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-20 lg:grid-cols-[1fr_1px_1fr_1px_1fr] lg:gap-23 lg:px-10"
		>
			<div class="flex flex-col items-start gap-3">
				<div class="size-16 bg-primary/10 rounded-lg flex items-center justify-center">
					<img src="bookmark-fill.svg" alt="" class="w-[80%]" />
				</div>

				<h3 class="text-lg font-light">Save tabs from any website</h3>
				<p class="font-light text-[#a3a3a3]">
					Keep your favorite guitar tabs from across the web in one place. Never lose a great tab
					again.
				</p>
			</div>
			<div class="hidden items-center justify-center lg:flex">
				<div class="h-full bg-[#292929] w-px"></div>
			</div>
			<div class="flex flex-col items-start gap-3">
				<div class="size-16 bg-primary/10 rounded-lg flex items-center justify-center">
					<img src="table-fill.svg" alt="" class="w-[80%]" />
				</div>
				<h3 class="text-lg font-light">Filter by tuning, artist, or song</h3>
				<p class="font-light text-[#a3a3a3]">
					Organize your collection and quickly find what you want to play.
				</p>
			</div>
			<div class="hidden items-center justify-center lg:flex">
				<div class="h-full bg-[#292929] w-px"></div>
			</div>
			<div class="flex flex-col items-start gap-3">
				<div class="size-16 bg-primary/10 rounded-lg flex items-center justify-center">
					<img src="magnifying-glass-fill.svg" alt="" class="w-[80%]" />
				</div>
				<h3 class="text-lg font-light">Find your songs in seconds</h3>
				<p class="font-light text-[#a3a3a3]">
					Search your library and get right to the tabs you want to play.
				</p>
			</div>
		</div>
	</section>

	<section class="relative bg-[#0a0a0a]">
		<div class="mx-auto max-w-7xl px-6 py-30 lg:px-10 flex flex-col items-center justify-center">
			<h2 class="uppercase text-5xl md:text-6xl">
				Ready to build your <span class="text-primary">tab library?</span>
			</h2>
			<a
				href="/signup"
				class="mt-20 py-6 px-10 bg-primary rounded uppercase text-xl hover:bg-[#e67300] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
			>
				Join TablatureDB
			</a>
		</div>
	</section>
</main>

<footer class="relative bg-[#0a0a0a] font-mono">
	<div class="mx-auto border-t border-t-[#292929]">
		<div class="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex items-center justify-between gap-4">
			<a
				href="/"
				class="whitespace-nowrap text-lg font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
			>
				TABLATURE<span class="text-primary">DB</span>
			</a>

			<span class="uppercase text-[#a3a3a3] text-sm">&copy; 2026 tablaturedb</span>
		</div>
	</div>
</footer>
