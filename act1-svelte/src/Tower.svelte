<script>
  import { onMount } from "svelte";
  import Level from "./Level.svelte";
  import Room from "./Room.svelte";
  import panzoom from "panzoom";

  export let data;

  let tower;

  function handleSelected(m) {
    console.log("clicked on " + m.detail.data.key);
    console.log(m.detail.data);
  }

  function handleHovered(m) {
    console.log("hovered over " + m.detail.data.key);
  }

  function setupZoom(el) {
    let pz = panzoom(tower, {
      minZoom: 1,
      maxZoom: 5,
      bounds: false,
      smoothScroll: false,
    });
    let zoomcenter = { x: 0, y: 0, scale: 1 };
    pz.on("panend", function (e) {
      if (zoomcenter.scale < 1.05) {
        pz.smoothMoveTo(0, 0);
      } else {
        pz.smoothMoveTo(zoomcenter.x, zoomcenter.y);
      }
    });
    pz.on("zoom", function (e) {
      let t = pz.getTransform();
      zoomcenter = { ...t };
      if (zoomcenter.scale < 1.05) {
        pz.smoothMoveTo(0, 0);
      }
    });

    return pz;
  }

  onMount(() => {
    let pz = setupZoom(tower);
    return () => {
      pz.dispose();
    };
  });
  let countries = ["ALB", "BIH", "KOS", "MNE", "MKD", "SRB"];
</script>

<div class="tower" bind:this={tower}>
  <Level --margin-top="0px" --z="60">
    {#each countries as country}
      <Room
        on:selected={handleSelected}
        on:hovered={handleHovered}
        data={data.economies[country]}
      />
    {/each}
  </Level>
  <Level --z="50">
    {#each countries as country}
      <Room
        on:selected={handleSelected}
        on:hovered={handleHovered}
        data={data.dimensions[country]}
      />
    {/each}
  </Level>
  <Level --z="40">
    {#each countries as country}
      <Room
        on:selected={handleSelected}
        on:hovered={handleHovered}
        data={data.subdimensions[country]}
      />
    {/each}
  </Level>
  <Level --z="30">
    {#each countries as country}
      <Room
        on:selected={handleSelected}
        on:hovered={handleHovered}
        data={data.indicators[country]}
      />
    {/each}
  </Level>
  <Level --z="20">
    {#each countries as country}
      <Room
        on:selected={handleSelected}
        on:hovered={handleHovered}
        data={data.levels[country]}
      />
    {/each}
  </Level>
</div>

<style>
  .tower {
    width: 100%;
    height: 100%;
    display: grid;
    justify-content: center;
    /* transform: scale(var(--zoom)); */
    --margin-top: -11vh;
  }
</style>
