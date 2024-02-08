<script lang="ts">
	import { serviceLines } from '$lib/serviceLines';
	import TextComponent from '$lib/TextComponent.svelte';

	let message = new Set<string>();

	const appendMessage = (event) => {
		message = message.add(event.detail.text);
	};

	const removeMessage = (event) => {
		message.delete(event.detail.text);
		message = message;
	};

	const resetMessage = () => {
		message.clear();
		message = message;
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText([...message].join(' '));
	};
</script>

<textarea rows="5" cols="80">{[...message].join(' ')}</textarea>
<button class="block" on:click={copyToClipboard}>Copy</button>
<button class="block" on:click={resetMessage}>Reset</button>
{#each serviceLines as serviceLine}
	<TextComponent
		on:appendMessage={appendMessage}
		on:removeMessage={removeMessage}
		content={serviceLine}
	/>
{/each}
