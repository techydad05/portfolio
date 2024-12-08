<script>
	import { AppBar, Avatar, Drawer, initializeStores, getDrawerStore } from '@skeletonlabs/skeleton';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	initializeStores();

	const drawerStore = getDrawerStore();
	const openDrawer = () => drawerStore.open();
	const closeDrawer = () => drawerStore.close();
</script>

<!-- Header -->
<AppBar class="bg-surface-100-800-token">
	<svelte:fragment slot="lead">
		<Avatar initials="SK" background="bg-primary-500" />
		<strong class="pl-4 text-xl uppercase">SvelteKit Boilerplate</strong>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<nav class="hidden items-center space-x-4 md:flex">
			<a class="btn btn-sm variant-ghost-surface" href="/">Home</a>
			<a class="btn btn-sm variant-ghost-surface" href="/about">About</a>
			<a class="btn btn-sm variant-ghost-surface" href="/contact">Contact</a>
			<ThemeSwitcher />
		</nav>
		<button class="btn btn-icon variant-ghost-surface md:hidden" on:click={openDrawer}>
			<!-- Hamburger Icon -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/>
			</svg>
		</button>
	</svelte:fragment>
</AppBar>

<!-- Drawer -->
<Drawer>
	{#if $drawerStore.open}
		<nav class="space-y-2 p-4">
			<a class="block py-2" href="/" on:click={closeDrawer}>Home</a>
			<a class="block py-2" href="/about" on:click={closeDrawer}>About</a>
			<a class="block py-2" href="/contact" on:click={closeDrawer}>Contact</a>
			<ThemeSwitcher inDrawer={true} />
		</nav>
	{/if}
</Drawer>
