// @ts-check
import { join } from 'path';

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path for the Skeleton package
		'./node_modules/@skeletonlabs/skeleton/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {},
	},
	plugins: [
		forms,
		typography,
		containerQueries,
		// 4. Append the Skeleton plugin
		skeleton({
			themes: { preset: ["skeleton", "modern", "crimson", "gold-nouveau", "hamlindigo", "vintage", "seafoam", "rocket", "wintry", "sahara"] }
		})
	]
}
