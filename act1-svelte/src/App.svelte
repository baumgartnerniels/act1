<script>
  import Tower from "./Tower.svelte";
  let zoom = 50;
</script>

<main>
  <div class="tower">
    <Tower --zoom={zoom / 50.0} />
  </div>
  <div class="details">
    <input
      type="range"
      id="zoom"
      name="zoom"
      bind:value={zoom}
      min="1"
      max="100"
    />
  </div>
</main>

<style>
  .tower {
    overflow: hidden;
  }
  main {
    text-align: center;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 61.803% 38.197%;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  /* @media (min-width: 640px) {
    main {
      max-width: none;
    }
  } */
</style>
