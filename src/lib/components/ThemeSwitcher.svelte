<script lang="ts">
	import { onMount } from 'svelte';
	import { Palette, Sun, Moon, ChevronDown } from 'lucide-svelte';
	import { popup, type PopupSettings, LightSwitch, ProgressBar } from '@skeletonlabs/skeleton';
	import { currentTheme } from '$lib/stores/appStore';

	export let inDrawer = false;

	const themes = [
		{ type: 'skeleton', name: 'Skeleton', icon: '💀' },
		{ type: 'wintry', name: 'Wintry', icon: '🌨️' },
		{ type: 'modern', name: 'Modern', icon: '🤖' },
		{ type: 'rocket', name: 'Rocket', icon: '🚀' },
		{ type: 'seafoam', name: 'Seafoam', icon: '🧜‍♀️' },
		{ type: 'vintage', name: 'Vintage', icon: '📺' },
		{ type: 'sahara', name: 'Sahara', icon: '🏜️' },
		{ type: 'hamlindigo', name: 'Hamlindigo', icon: '👔' },
		{ type: 'gold-nouveau', name: 'Gold Nouveau', icon: '💫' },
		{ type: 'crimson', name: 'Crimson', icon: '⭕' },
		{ type: 'seasonal', name: 'Seasonal', icon: '🎆' },
		{ type: 'test', name: 'Test', icon: '🚧' }
	];

	let isDark: boolean = false;
	let popupSettings: PopupSettings = {
		event: 'click',
		target: inDrawer ? 'drawerThemePopup' : 'themePopup',
		placement: inDrawer ? 'bottom-start' : 'bottom-end'
	};

	function setTheme(theme: string) {
		console.log(theme);
		$currentTheme = theme;
		const mode = isDark ? 'dark' : 'light';
		document.body.setAttribute('data-theme', theme);
		document.documentElement.classList.toggle('dark', isDark);
		localStorage.setItem('theme', theme);
		localStorage.setItem('mode', mode);

		// Close the popup after theme selection
		// const popupId = inDrawer ? 'drawerThemePopup' : 'themePopup';
		// const popup = document.querySelector(`[data-popup="${popupId}"]`);
		// if (popup) {
		// 	popup.classList.remove('show');
		// }
	}

	function toggleMode() {
		isDark = !isDark;
		setTheme($currentTheme);
	}

	onMount(() => {
		const savedTheme = localStorage.getItem('theme');
		const savedMode = localStorage.getItem('mode');
		if (savedTheme) {
			$currentTheme = savedTheme;
		}
		if (savedMode) {
			isDark = savedMode === 'dark';
		} else {
			isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
		setTheme($currentTheme);
	});
</script>

<!-- Theme -->
<div>
	<!-- trigger -->
	<button class="btn hover:variant-soft-primary" use:popup={popupSettings}>
		<svelte:component this={Palette} class="h-4 w-4" />
		<span>Theme</span>
		<svelte:component this={ChevronDown} class="h-4 w-4" />
	</button>
	<!-- popup -->
	<div class="card w-60 p-4 shadow-xl" data-popup={inDrawer ? 'drawerThemePopup' : 'themePopup'}>
		<div class="space-y-4">
			<section class="flex items-center justify-between">
				<h6 class="h6">Mode</h6>
				<LightSwitch />
			</section>
			<hr />
			<nav class="list-nav -m-4 max-h-64 overflow-y-auto p-4 lg:max-h-[500px]">
				<ul>
					<!-- , badge -->
					{#each themes as { icon, name, type }}
						<li>
							<button
								class="option h-full w-full"
								type="submit"
								name="theme"
								value={type}
								class:bg-primary-active-token={$currentTheme === type}
								on:click={() => setTheme(type)}
							>
								<span>{icon}</span>
								<span class="flex-auto text-left">{name}</span>
								<!-- {#if badge}<span class="badge variant-filled-secondary">{badge}</span>{/if} -->
							</button>
						</li>
					{/each}
				</ul>
			</nav>
			<hr />
			<div>
				<a class="btn variant-filled w-full" href="/docs/generator">
					<i class="fa-solid fa-palette"></i>
					<span>Create a Theme</span>
				</a>
			</div>
		</div>
		<!-- <div class="arrow bg-surface-100-800-token" /> -->
	</div>
</div>

<style>
	[data-popup='themePopup'],
	[data-popup='drawerThemePopup'] {
		position: absolute;
		z-index: 50;
	}
	.arrow {
		position: absolute;
		width: 0;
		height: 0;
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
		border-bottom: 8px solid var(--color-surface-500);
		top: -8px;
		right: 18px;
	}
</style>
