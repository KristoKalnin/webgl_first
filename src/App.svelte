<script lang="ts">
	export let name: string;

	import { onMount } from "svelte";
	import {
		cubeDimensions,
		createScene,
		camera2D,
		camera3D,
		increaseOrbitSpeed,
		decreaseOrbitSpeed,
		toggleShadows,
		addSolarPanel,
		changeRoofDimensions,
	} from "./scene";

	let el: object;
	onMount(async () => {
		createScene(el);
	});

	$: {
		// use 10 as placeholder as we currently do not want to change object height
		changeRoofDimensions(cubeDimensions.length, 10, cubeDimensions.depth);
	}
</script>

<main>

	<nav>

		<div id="placeholder">
			<h3>{name}</h3>
		</div>

		<ul>
			<li>
				<label>
					Width
					<input
						type="number"
						placeholder="width"
						bind:value={cubeDimensions.length}
						min="1"
					/>
				</label>
			</li>
			<!--
			<li>
				<label>
					Height
					<input
						type="number"
						bind:value={cubeDimensions.height}
						min="1"
					/>
				</label>
			</li>
			-->
			<li>
				<label>
					Length
					<input
						type="number"
						placeholder="length"
						bind:value={cubeDimensions.depth}
						min="1"
					/></label
				>
			</li>
			<li><button on:click={() => camera2D()}> 2D </button></li>
			<li><button on:click={() => camera3D()}> 3D </button></li>
			<li>
				<button on:click={() => toggleShadows()}>
					Roof & Solar Panel shadows
				</button>
			</li>
			<li>
				<button on:click={() => addSolarPanel()}>
					Add Solar Panel
				</button>
			</li>
			<li>Sun & Moon orbital speed</li>
			<li><button on:click={() => decreaseOrbitSpeed()}> - </button></li>
			<li><button on:click={() => increaseOrbitSpeed()}> + </button></li>
		</ul>
	</nav>
</main>

<canvas bind:this={el} />

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	#placeholder {
		position: absolute;
		top: 0;
		left: 25px;
	}

	nav {
		background-color: #ffffff;
		position: absolute;
		justify-content: center;
		top: 0;
		left: 0;
		width: 100%;
		text-align: center;
	}

	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
	}

	ul > li {
		display: inline-block;
		margin: 5px;
	}

	input[type="number"] {
		width: 65px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
