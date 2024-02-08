<script lang="ts">
	import { serviceLines } from '$lib/serviceLines';
	import TextComponent from '$lib/TextComponent.svelte';

	let message = new Set<string>();

	let selected = serviceLines.map(() => false);

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
		selected = serviceLines.map(() => false);
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText([...message].join(' '));
		message.clear();
		message = message;
		selected = serviceLines.map(() => false);
	};
</script>

<svelte:head>
	<title>Anna Client Service</title>
</svelte:head>
<main class="min-h-screen bg-slate-200">
	<div class="flex flex-col mx-auto min-h-screen max-w-3xl space-y-3">
		<div class="sticky top-1.5 z-50 py-1.5 flex flex-col space-y-3 bg-slate-200">
			<textarea
				class="p-1.5 h-48 text-lg font-semibold leading-tight text-slate-800 bg-slate-50 rounded-md"
				>{[...message].join(' ')}</textarea
			>
			<div class="flex flex-row space-x-1 5">
				<button class="flex flex-1 justify-center" on:click={copyToClipboard}
					><img src="copy.svg" alt="copy icon" class="h-8" /></button
				>
				<button class="flex flex-1 justify-center" on:click={resetMessage}
					><img src="reset.svg" alt="reset icon" class="h-8" /></button
				>
			</div>
		</div>
		{#each serviceLines as serviceLine, index}
			<TextComponent
				on:appendMessage={appendMessage}
				on:removeMessage={removeMessage}
				content={serviceLine}
				bind:selected={selected[index]}
			/>
		{/each}
	</div>
</main>
