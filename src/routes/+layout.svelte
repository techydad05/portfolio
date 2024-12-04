<script>
	import '../app.css';
	// Skeleton
	import { AppShell, initializeStores } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();
	
	let { children } = $props();

	onMount(() => {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			document.body.setAttribute('data-theme', savedTheme);
		}
	});
</script>

<AppShell>
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>
	<div class="app h-full">
		{@render children()}
	</div>
</AppShell>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
