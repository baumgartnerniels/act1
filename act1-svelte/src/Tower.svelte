<script>
  import { onMount } from "svelte";
  import Level from "./Level.svelte";
  import Room from "./Room.svelte";
  import panzoom from "panzoom";

  export let data;

  let tower;
  let zoom;

  function handleSelected(m) {
    console.log("clicked on " + m.detail.data.key);
    console.log(m.detail.data);
    // zoomTo(m.detail.element);
  }

  export function zoomTo(element) {
    let targetRect = element.getBoundingClientRect();
    let containerRect = tower.parentElement.getBoundingClientRect();
    let t = zoom.getTransform();
    console.log(zoom);
    console.log(tower);
    if (t.scale < 3) {
      zoom.smoothZoom(targetRect.x, targetRect.y, 4);
    } else {
      var cx = targetRect.left + targetRect.width / 2;
      var cy = targetRect.top + targetRect.height / 2;

      var dx = containerRect.width / 2 - cx;
      var dy = containerRect.height / 2 - cy;
      console.log(t);
      console.log(targetRect);
      zoom.smoothMoveTo(dx + t.x, dy + t.y);
    }
  }

  export function resetZoom() {
    zoom.smoothZoom(0, 0, 1);
  }

  function handleHovered(m) {
    //console.log("hovered over " + m.detail.data.key);
  }

  function setupZoom(el) {
    let pz = panzoom(tower, {
      minZoom: 1,
      maxZoom: 4,
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
    zoom = setupZoom(tower);
    return () => {
      zoom.dispose();
    };
  });
  let countries = ["ALB", "BIH", "KOS", "MNE", "MKD", "SRB"];
</script>

<div class="tower" bind:this={tower}>
  <Level --margin-top="-2vh" --z="60" selectable={true} label="Economies">
    {#each countries as country}
      <Room
        on:selected={handleSelected}
        on:hovered={handleHovered}
        data={data.economies[country]}
      />
    {/each}
  </Level>
  <Level --z="50" label="Dimensions">
    {#each countries as country}
      <Room
        on:selected={handleSelected}
        on:hovered={handleHovered}
        data={data.dimensions[country]}
      />
    {/each}
  </Level>
  <Level --z="40" label="Subdimensions">
    {#each countries as country}
      <Room
        on:selected={handleSelected}
        on:hovered={handleHovered}
        data={data.subdimensions[country]}
      />
    {/each}
  </Level>
  <Level --z="30" label="Indicators">
    {#each countries as country}
      <Room
        on:selected={handleSelected}
        on:hovered={handleHovered}
        data={data.indicators[country]}
      />
    {/each}
  </Level>
  <Level --z="20" label="Levels">
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
    --margin-top: -14vh;
  }
</style>
