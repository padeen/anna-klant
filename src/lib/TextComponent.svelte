<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let content: string;
	let selected = false;

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

<button class="block" on:click={handler}>{content}</button>
