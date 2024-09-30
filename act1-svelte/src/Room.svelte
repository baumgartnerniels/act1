<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { scaleLinear, interpolateRgb } from "d3";

  export let data = [];

  let colorScale = scaleLinear()
    .domain([0, 0.5, 1])
    .range(["red", "pink", "blue"])
    .interpolate(interpolateRgb.gamma(2.2));

  let gridSize = Math.ceil(Math.sqrt(data.length));

  let room;
  function style(e) {
    let color = colorScale(e.score / 5.0);
    return "background-color: " + color + ";";
  }

  const dispatch = createEventDispatcher();

  function selectParents(parentKey, ecoKey) {
    document
      .querySelectorAll(
        '[data-key="' + parentKey + '"][data-eco="' + ecoKey + '"]'
      )
      .forEach((e) => {
        e.classList.add("selected");
        e.classList.add("parent");
        let newParentKey = e.getAttribute("data-parent");
        if (newParentKey) {
          selectParents(newParentKey, ecoKey);
        }
      });
  }

  function selectChildren(key, ecoKey) {
    document
      .querySelectorAll(
        '[data-parent="' + key + '"][data-eco="' + ecoKey + '"]'
      )
      .forEach((e) => {
        e.classList.add("selected");
        e.classList.add("child");
      });
  }

  function setSelected(event, data) {
    document.querySelectorAll(".dot.selected").forEach((e) => {
      e.classList.remove("selected");
      e.classList.remove("parent");
      e.classList.remove("child");
    });
    selectParents(data.parent_key, data.eco_key);
    selectChildren(data.key, data.eco_key);
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
      data-eco={dot.eco_key}
      data-key={dot.key}
      data-parent={dot.parent_key}
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
