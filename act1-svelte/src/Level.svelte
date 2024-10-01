<script>
  import { createEventDispatcher } from "svelte";

  export let label = "";
  export let selectable = false;

  let level;
  function handleSelected() {
    if (!selectable) return;
    document
      .querySelectorAll(".level.selected")
      .forEach((e) => e.classList.remove("selected"));
    level.classList.add("selected");
  }
  $: hovered = false;
</script>

<div class="level-container">
  <div class="level" class:hovered bind:this={level}>
    <slot />
  </div>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="label"
    on:mouseenter={() => (hovered = selectable ? true : false)}
    on:mouseleave={() => (hovered = false)}
    on:click={handleSelected}
  >
    <p>{label}</p>
  </div>
</div>

<style>
  :root {
    --room-size: 14vh;
    --rotation: 30deg;
  }
  .level-container {
    z-index: var(--z);
    display: grid;
    grid-template-columns: 95% 5%;

    grid-template-rows: 100%;
    transform: rotateX(60deg) rotateZ(var(--rotation));
    position: relative;
    margin-top: var(--margin-top);
  }
  .level {
    display: grid;
    grid-template-columns: repeat(3, var(--room-size));
    grid-template-rows: repeat(2, var(--room-size));
    grid-gap: 5px;
    align-items: center;
    width: fit-content;
    height: fit-content;
    padding: 5px;
  }
  :is(.level.selected) {
    outline: 5px solid white;
  }
  .level.hovered {
    outline: 2px solid white;
  }
  .label {
    position: relative;
    margin-top: 3vh;
    padding-left: 3vh;
    grid-column: 2;
  }
  .label p {
    position: absolute;
    transform-origin: top left;
    left: 0;
    top: 0;
    transform: rotate(-90deg) translateX(-100%);

    margin: 0; /* Remove default margin */
  }
</style>
