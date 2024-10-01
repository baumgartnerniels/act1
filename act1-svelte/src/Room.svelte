<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { scaleLinear, interpolateRgb } from "d3";

  export let data = [];

  let colorScale = scaleLinear()
    .domain([0, 0.5, 1])
    .range(["red", "green", "blue"])
    .interpolate(interpolateRgb.gamma(2.2));

  let gridSize = Math.ceil(Math.sqrt(data.length));

  let room;
  function style(e) {
    let color = colorScale(e.score / 5.0);
    return "background-color: " + color + ";";
  }

  const dispatch = createEventDispatcher();

  function setSelected(event, data) {
    document.querySelectorAll(".dot.selected").forEach((e) => {
      console.log(e);
      e.classList.remove("selected");
    });
    event.target.classList.add("selected");
    dispatch("selected", {
      element: event.target,
      data: data,
    });
  }

  function setHovered(event, data) {
    dispatch("hovered", {
      element: event.target,
      data: data,
    });
  }

  onMount(() => {
    room.style = "--grid-size: " + gridSize;
  });
</script>

<div class="room" bind:this={room}>
  {#each data as dot}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="dot"
      data-score={dot.score}
      data-key={dot.key}
      style={style(dot)}
      on:click={(e) => {
        setSelected(e, dot);
      }}
      on:mouseenter={(e) => {
        setHovered(e, dot);
      }}
    ></div>
  {/each}
</div>

<style>
  .room {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 2px solid #ffffff;
    display: grid;
    grid-template-columns: repeat(var(--grid-size), 1fr);
    grid-template-rows: repeat(var(--grid-size), 1fr);
    justify-content: center;
    align-items: center;
  }
  .dot {
    box-sizing: border-box;
    background-color: var(--fill);
    width: 100%;
    height: 100%;
  }
  .dot:hover {
    border: 1px solid #ffffff;
  }
  :global(.dot.selected) {
    border: 2px solid #ffffff;
  }
</style>
