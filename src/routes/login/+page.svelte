<script lang="ts">
	import { auth } from '$lib/firebase.client';
	import { db } from '$lib/firebase.client';
	import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
	import { collection, getDocs } from 'firebase/firestore';
	import TextComponent from '$lib/TextComponent.svelte';
	import ServiceLineStore from '$lib/sentence_store';
	import SessionStore from '$lib/session';

	let sentences: { position: number; text: string }[] = [];
	let selected = sentences.map(() => false);

	async function loginWithMail() {
		await signInWithEmailAndPassword(auth, 'paulo.deen@gmail.com', 'password123456')
			.then((userCredential) => {
				const { uid, email } = userCredential.user;
				SessionStore.set({ user: { uid: uid, email: email } });
				getSentences();
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	}

	async function logout() {
		console.log(auth);
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				console.log('User signed out');
				clearStoreData();
			})
			.catch((error) => {
				// An error happened.
			});
	}

	async function getSentences() {
		const querySnapshot = await getDocs(collection(db, 'bxAvIuEtleRIzn0SWU7MwupTjlc2'));
		let serviceLines: string[] = [];
		querySnapshot.forEach((doc) => {
			serviceLines.push(doc.data().text);
		});
		ServiceLineStore.set(serviceLines);
	}

	function clearStoreData() {
		ServiceLineStore.set([]);
		SessionStore.set({ user: null });
	}

	const resetMessage = () => {
		selected = selected.map(() => false);
	};
</script>

{#if $SessionStore?.user}
	<div>{$SessionStore.user.email}</div>
	<div>{$SessionStore.user.uid}</div>
{/if}
<div class="login-form">
	<h1>Login</h1>
	<form on:submit={loginWithMail}>
		<input value="paulo.deen@gmail.com" type="text" placeholder="Email" />
		<input value="password123456" type="password" placeholder="Password" />
		<button type="submit" class="px-4 py-2 bg-blue-500">Login</button>
	</form>
</div>
<button on:click={logout} class="px-4 py-2 bg-blue-500" type="submit">Logout</button>
<button on:click={getSentences} class="px-4 py-2 bg-blue-500" type="submit">Get sentences</button>
<button class="flex flex-1 justify-center" on:click={resetMessage}
	><img src="reset.svg" alt="reset icon" class="h-8" /></button
>
<div>
	{#each $ServiceLineStore as sentence, index}
		<TextComponent content={sentence} bind:selected={selected[index]} />
	{:else}
		<div>Add sentences first...</div>
	{/each}
	<a href="/">Main screen</a>
</div>
