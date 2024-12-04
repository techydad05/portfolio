<script lang="ts">
    import { writable } from 'svelte/store';
    import { AppBar, Avatar, ListBox, ListBoxItem, TabGroup, Tab, ProgressBar, Accordion, AccordionItem, RangeSlider, RadioGroup, RadioItem, ProgressRadial } from '@skeletonlabs/skeleton';
    import { Palette, Sun, Moon, Github, Code, Package, BookOpen, Heart, Zap, Box, Puzzle, CheckCircle2, Circle, Trash2, Plus, ArrowRight } from 'lucide-svelte';
    import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
    import { todos, techDetails, type TechDetail, currentTheme } from '$lib/stores/appStore';
    import { slide, fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    
    let newTodo = '';
    let selectedTech: TechDetail | null = null;
    let showTechDetails = false;
    let progressValue = 75;
    let selectedValue = '1';

    // Set default selected tech
    onMount(() => {
        techDetails.subscribe(details => {
            selectedTech = details['SvelteKit'];
            showTechDetails = true;
        })();
    });

    function handleTechClick(tech: string) {
        techDetails.subscribe(details => {
            selectedTech = details[tech];
            showTechDetails = true;
        })();
    }

    function addTodo() {
        if (newTodo.trim()) {
            todos.add(newTodo.trim());
            newTodo = '';
        }
    }
</script>

<div class="flex flex-col min-h-screen">
    <!-- Gradient Background -->
    <div class="fixed inset-0 bg-gradient-to-br from-primary-500/20 via-secondary-500/20 to-tertiary-500/20 -z-10"></div>

    <!-- Main Content -->
    <main class="container mx-auto p-4 space-y-12 flex-1">
        <!-- Hero Section -->
        <div class="card variant-glass-surface p-8 text-center space-y-8 my-12">
            <div class="flex justify-center gap-4">
                <div class="badge variant-filled-primary">v1.0.0</div>
                <div class="badge variant-filled-secondary">Theme: {$currentTheme}</div>
            </div>
            <h1 class="h1 font-bold tracking-tight">Modern Web Development Stack</h1>
            <p class="text-2xl max-w-[65ch] mx-auto">
                A powerful combination of SvelteKit, Skeleton UI, and modern web technologies for building beautiful, responsive applications.
            </p>
            <div class="flex justify-center gap-4">
                <button class="btn variant-filled-primary">Get Started</button>
                <a href="https://github.com" target="_blank" class="btn variant-soft-surface">
                    <Github class="w-4 h-4 mr-2" />
                    GitHub
                </a>
            </div>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-4 gap-6">
            {#each Object.entries($techDetails) as [tech, detail]}
                <button 
                    class="card variant-glass p-6 text-center space-y-4 hover:variant-soft-primary transition-all duration-200 cursor-pointer"
                    on:click={() => handleTechClick(tech)}
                >
                    <div class="flex justify-center">
                        <svelte:component this={tech === 'SvelteKit' ? Zap : tech === 'Skeleton' ? Box : tech === 'TypeScript' ? Code : Package} class="w-12 h-12" />
                    </div>
                    <h3 class="h3">{tech}</h3>
                    <p>{detail.description}</p>
                </button>
            {/each}
        </div>

          <!-- Tech Details Section -->
          {#if showTechDetails && selectedTech}
          <div class="card variant-glass-surface p-6" transition:slide>
              <div class="flex justify-between items-start mb-4">
                  <h2 class="h2">{selectedTech.title}</h2>
                  <button class="btn variant-soft" on:click={() => showTechDetails = false}>Close</button>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="space-y-4">
                      <h3 class="h3">Key Features</h3>
                      <ul class="list">
                          {#each selectedTech.features as feature}
                              <li class="flex items-center gap-2" transition:fade>
                                  <ArrowRight class="w-4 h-4" />
                                  {feature}
                              </li>
                          {/each}
                      </ul>
                  </div>
                  <div class="space-y-4">
                      <h3 class="h3">Code Example</h3>
                      <pre class="code p-4 rounded-container-token bg-surface-600/20">{selectedTech.codeExample}</pre>
                  </div>
              </div>
          </div>
      {/if}

        <!-- Dashboard Components -->
        <div class="grid grid-cols-2 gap-6 mb-8">
            <!-- Progress Cards -->
            <div class="card variant-glass-surface p-6 space-y-4">
                <h3 class="h3">Project Progress</h3>
                <div class="flex justify-between items-center">
                    <ProgressRadial value={75} width="w-24" meter="stroke-primary-500" track="stroke-primary-500/30">75%</ProgressRadial>
                    <ProgressBar value={progressValue} max={100} height="h-3" />
                </div>
                <RangeSlider bind:value={progressValue} max={100} step={1} name="progress" />
            </div>

            <!-- Radio Group Example -->
            <div class="card variant-glass-surface p-6 space-y-4">
                <h3 class="h3">Project Status</h3>
                <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
                    <RadioItem bind:group={selectedValue} name="status" value="1">Planning</RadioItem>
                    <RadioItem bind:group={selectedValue} name="status" value="2">In Progress</RadioItem>
                    <RadioItem bind:group={selectedValue} name="status" value="3">Completed</RadioItem>
                </RadioGroup>
            </div>
        </div>

        <!-- Tabs Example -->
        <div class="card variant-glass-surface p-6 space-y-4 mb-8">
            <TabGroup>
                <Tab bind:group={selectedValue} name="tab1" value="1">Overview</Tab>
                <Tab bind:group={selectedValue} name="tab2" value="2">Analytics</Tab>
                <Tab bind:group={selectedValue} name="tab3" value="3">Settings</Tab>
                <!-- Tab Panels -->
                <svelte:fragment slot="panel">
                    {#if selectedValue === "1"}
                        <div class="p-4">
                            <h3 class="h3 mb-4">Project Overview</h3>
                            <p>View your project's key metrics and progress at a glance.</p>
                        </div>
                    {:else if selectedValue === "2"}
                        <div class="p-4">
                            <h3 class="h3 mb-4">Analytics Dashboard</h3>
                            <p>Track your project's performance and metrics.</p>
                        </div>
                    {:else if selectedValue === "3"}
                        <div class="p-4">
                            <h3 class="h3 mb-4">Project Settings</h3>
                            <p>Configure your project preferences and options.</p>
                        </div>
                    {/if}
                </svelte:fragment>
            </TabGroup>
        </div>

        <!-- Todo Section -->
        <div class="card variant-glass-surface p-6 space-y-4">
            <header class="flex justify-between items-center">
                <h2 class="h2">Project Tasks</h2>
                <div class="flex items-center gap-2">
                    <span class="badge variant-soft">{$todos.filter(t => t.completed).length} / {$todos.length}</span>
                    <ProgressBar 
                        value={($todos.filter(t => t.completed).length / $todos.length) * 100} 
                        max={100}
                        class="w-24"
                    />
                </div>
            </header>

            <div class="card variant-ghost p-4 space-y-4">
                {#each $todos as todo (todo.id)}
                    <div 
                        class="card variant-soft p-4 flex items-center justify-between gap-4"
                        transition:slide
                    >
                        <div class="flex items-center gap-4">
                            <button 
                                class="btn-icon variant-soft"
                                on:click={() => todos.toggle(todo.id)}
                            >
                                <svelte:component this={todo.completed ? CheckCircle2 : Circle} class="w-5 h-5" />
                            </button>
                            <span class={todo.completed ? 'line-through opacity-50' : ''}>{todo.text}</span>
                        </div>
                        <button 
                            class="btn-icon variant-soft-error"
                            on:click={() => todos.remove(todo.id)}
                        >
                            <Trash2 class="w-4 h-4" />
                        </button>
                    </div>
                {/each}
            </div>

            <footer class="flex gap-2">
                <input
                    class="input"
                    type="text"
                    placeholder="Add new task..."
                    bind:value={newTodo}
                    on:keydown={e => e.key === 'Enter' && addTodo()}
                />
                <button class="btn variant-filled-primary" on:click={addTodo}>
                    <Plus class="w-4 h-4" />
                    Add
                </button>
            </footer>
        </div>
    </main>

    <!-- Footer -->
    <footer class="mt-12 bg-surface-100-800-token">
        <div class="container mx-auto py-8 px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="space-y-4">
                    <h3 class="h3">About</h3>
                    <p>Built with modern web technologies to showcase the power of SvelteKit and Skeleton UI.</p>
                </div>
                <div class="space-y-4">
                    <h3 class="h3">Links</h3>
                    <ul class="space-y-2">
                        <li>
                            <a href="https://kit.svelte.dev" class="anchor">SvelteKit</a>
                        </li>
                        <li>
                            <a href="https://www.skeleton.dev" class="anchor">Skeleton</a>
                        </li>
                        <li>
                            <a href="https://tailwindcss.com" class="anchor">Tailwind CSS</a>
                        </li>
                    </ul>
                </div>
                <div class="space-y-4">
                    <h3 class="h3">Connect</h3>
                    <div class="flex gap-4">
                        <a href="https://github.com" class="btn variant-soft">
                            <Github class="w-4 h-4" />
                        </a>
                        <a href="https://twitter.com" class="btn variant-soft">
                            <Package class="w-4 h-4" />
                        </a>
                        <a href="https://discord.com" class="btn variant-soft">
                            <Heart class="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
            <div class="mt-8 pt-8 border-t border-surface-500/30 text-center">
                <p> 2024 Your Project. Built with  using SvelteKit and Skeleton.</p>
            </div>
        </div>
    </footer>
</div>

<style>
    .code {
        font-family: 'Fira Code', monospace;
        white-space: pre-wrap;
        word-break: break-word;
    }
</style>