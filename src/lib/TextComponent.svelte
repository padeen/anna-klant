<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let content: string;
	export let selected: boolean;

	const dispatch = createEventDispatcher();

	function handler() {
		if (selected === false) {
			appendMessage();
		} else removeMessage();

		selected = !selected;
	}

	function appendMessage() {
		dispatch('appendMessage', {
			text: content
		});
	}

	function removeMessage() {
		dispatch('removeMessage', {
			text: content
		});
	}
</script>

<button class:brightness-75={selected} class="block transition duration-200" on:click={handler}
	>{content}</button
>
