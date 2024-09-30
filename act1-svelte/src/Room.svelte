<script>
  import { onMount } from "svelte";

  export let data = [];

  let gridSize = Math.ceil(data.length);

  let room;

  onMount(() => {
    room.style = "--grid-size: " + gridSize;
  });
</script>

<div class="room" bind:this={room}>
  {#each data as dot}
    <div class={dot.key}></div>
  {/each}
</div>

<style>
  .room {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: #4caf50;
    border: 2px solid #ffffff;
    display: grid;
    grid-template-columns: repeat(var(--grid-size), 1fr);
    grid-template-rows: repeat(var(--grid-size), 1fr);
    justify-content: center;
    align-items: center;
  }
  .room:hover {
    border: 5px solid #ffffff;
  }
  :root {
    --margin-top: -60px;
    --rotation: 30deg;
  }
</style>
