<script>
    import { AppBar, Avatar } from '@skeletonlabs/skeleton';
    import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
</script>
<!-- Header -->
<AppBar class="bg-surface-100-800-token">
    <svelte:fragment slot="lead">
        <Avatar initials="SK" background="bg-primary-500" />
        <strong class="text-xl uppercase pl-4">SvelteKit Boilerplate</strong>
    </svelte:fragment>
    <svelte:fragment slot="trail">
        <a class="btn btn-sm variant-ghost-surface" href="/">Home</a>
        <a class="btn btn-sm variant-ghost-surface" href="/about">About</a>
        <a class="btn btn-sm variant-ghost-surface" href="/contact">Contact</a>
        <ThemeSwitcher />
    </svelte:fragment>
</AppBar>