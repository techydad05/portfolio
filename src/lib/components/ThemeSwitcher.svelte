<script lang="ts">
    import { onMount } from 'svelte';
    import { Palette, Sun, Moon } from 'lucide-svelte';
    import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
    import { currentTheme } from '$lib/stores/appStore';

    const themes = [
        { name: 'Skeleton', value: 'skeleton', icon: '💀' },
        { name: 'Modern', value: 'modern', icon: '🤖' },
        { name: 'Rocket', value: 'rocket', icon: '🚀' },
        { name: 'Seafoam', value: 'seafoam', icon: '🧜‍♀️' },
        { name: 'Vintage', value: 'vintage', icon: '📺' },
        { name: 'Sahara', value: 'sahara', icon: '🏜️' },
        { name: 'Hamlindigo', value: 'hamlindigo', icon: '👔' },
        { name: 'Gold Nouveau', value: 'gold-nouveau', icon: '💫' },
        { name: 'Crimson', value: 'crimson', icon: '⭕' }
    ];

    let isDark: boolean = false;
    let popupSettings: PopupSettings = {
        event: 'click',
        target: 'themePopup',
        placement: 'bottom-end'
    };

    function setTheme(theme: string) {
        $currentTheme = theme;
        const mode = isDark ? 'dark' : 'light';
        document.body.setAttribute('data-theme', theme);
        document.documentElement.classList.toggle('dark', isDark);
        localStorage.setItem('theme', theme);
        localStorage.setItem('mode', mode);
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

<div class="relative flex items-center gap-4">
    <!-- Light/Dark Mode Toggle -->
    <button
        class="btn variant-soft hover:variant-filled-primary"
        on:click={toggleMode}
        title="Toggle {isDark ? 'Light' : 'Dark'} Mode"
    >
        <svelte:component this={isDark ? Sun : Moon} class="w-4 h-4" />
    </button>

    <!-- Theme Selector -->
    <div class="relative">
        <button
            class="btn variant-soft hover:variant-filled-primary flex items-center gap-2"
            use:popup={popupSettings}
        >
            <svelte:component this={Palette} class="w-4 h-4" />
            <span class="hidden md:inline">Theme</span>
        </button>

        <!-- Popup -->
        <div
            class="card variant-filled-surface p-4 shadow-xl"
            data-popup="themePopup"
        >
            <div class="grid grid-cols-1 gap-2 w-48">
                {#each themes as theme}
                    <button
                        class="btn variant-soft w-full text-left flex items-center gap-2"
                        class:variant-filled-primary={$currentTheme === theme.value}
                        on:click={() => {
                            setTheme(theme.value);
                            const popup = document.querySelector('[data-popup="themePopup"]');
                            if (popup) {
                                popup.classList.remove('show');
                            }
                        }}
                    >
                        <span class="w-6">{theme.icon}</span>
                        <span>{theme.name}</span>
                    </button>
                {/each}
            </div>
            <!-- Arrow -->
            <div class="arrow bg-surface-100-800-token" />
        </div>
    </div>
</div>

<style>
    [data-popup="themePopup"] {
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