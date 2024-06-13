<script lang="ts">
	import { parse } from 'svelte/compiler';

	let number: Number | undefined;

	async function roll() {
		const response = await fetch('/roll');
		number = await response.json();
	}

	export let data;
	export let form;
</script>

<h1>Discard Home</h1>

<button on:click={roll}>Roll</button>
{#if number !== undefined}
	<p>You rolled a {number}</p>
{/if}

<div class="wrapper">
	<div class="forms">
		<div class="form-container">
			<h2>Send message</h2>
			<form method="POST" action="?/sendMessage">
				<div>
					<label for="userid">User:</label>
					<input
						name="userid"
						type="text"
						placeholder="Enter your user ID"
						autocomplete="off"
						value="a4edf1dd-e468-443f-a4db-bcc408e84d7d"
					/>
				</div>
				<div>
					<label for="userid">Server:</label>
					<input
						name="serverid"
						type="text"
						placeholder="Enter your server ID"
						autocomplete="off"
						value="174c5f8a-e001-4fce-90fb-4e081a11dd8f"
					/>
				</div>
				<div>
					<label for="message">Message:</label>
					<input
						name="message"
						type="text"
						placeholder="Enter your message"
						autocomplete="off"
					/>
				</div>

				<input type="submit" value="Send" />
			</form>
		</div>
		<div class="form-container">
			<h2>Get message</h2>
			<form method="POST" action="?/getMessage">
				<div>
					<label for="messageid">Message ID:</label>
					<input
						name="messageid"
						type="text"
						placeholder="Enter your message ID"
						autocomplete="off"
					/>
				</div>

				<input type="submit" value="Get" />
			</form>
		</div>
		<div class="form-container">
			<h2>Delete user</h2>
			<form method="POST" action="?/deleteUser">
				<div>
					<label for="userid">User:</label>
					<input
						name="userid"
						type="text"
						placeholder="Enter your user ID"
						autocomplete="off"
						value="a4edf1dd-e468-443f-a4db-bcc408e84d7d"
					/>
				</div>

				<input type="submit" value="Delete" />
			</form>
		</div>
	</div>
	<div class="output">
		{#if form?.success || !form?.success}
			<pre>{JSON.stringify(JSON.parse(form?.body ?? '0'), null, '\t')}</pre>
		{/if}
	</div>
</div>

<style>
	label {
		width: 20%;
	}
	input {
		width: 100%;
		box-sizing: border-box;
		margin-bottom: 0.25em;
	}

	form {
		width: 50%;
	}

	form div,
	.form-container {
		display: flex;
		flex-direction: column;
	}

	form div {
		width: 100%;
	}

	.form-container {
		width: 100%;
		border: 1px solid grey;
	}

	.wrapper {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		width: 100%;
		margin-top: 0.5em;
	}

	.wrapper .forms,
	.wrapper .output {
		width: 50%;
	}

	.output {
		background-color: #2b2a2a;
		color: #ffffff;
		padding: 0.25em;
		font-family: monospace;
	}

	.output pre {
		margin: 0;
	}

	.form-container form {
		width: 100%;
	}
</style>
