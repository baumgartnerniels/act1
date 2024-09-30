<script>
  import Level from "./Level.svelte";
  import Room from "./Room.svelte";
  let countries = ["ALB", "BIH", "KOS", "MNE", "MKD", "SRB"];
  export let data;
</script>

<div class="tower">
  <Level --margin-top="0px" --z="60">
    {#each countries as country}
      <Room data={data.economies[country]} />
    {/each}
  </Level>
  <Level --z="50">
    {#each countries as country}
      <Room data={data.dimensions[country]} />
    {/each}
  </Level>
  <Level --rotation="30deg" --z="40">
    {#each countries as country}
      <Room data={data.subdimensions[country]} />
    {/each}
  </Level>
  <Level --rotation="30deg" --z="30">
    {#each countries as country}
      <Room data={data.indicators[country]} />
    {/each}
  </Level>
  <Level --rotation="30deg" --z="20">
    {#each countries as country}
      <Room data={data.levels[country]} />
    {/each}
  </Level>
</div>

<style>
  .tower {
    width: 100%;
    height: 100%;
    display: grid;
    justify-content: center;
    transform: scale(var(--zoom));
  }
</style>
