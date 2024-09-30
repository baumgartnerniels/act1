<script>
  import { onMount } from "svelte";
  import Tower from "./Tower.svelte";
  import data from "../data/app_data.json";
  console.log(data);
</script>

<main>
  <div class="tower">
    <Tower {data} />
  </div>
  <div class="details"></div>
</main>

<style>
  .tower {
    overflow: hidden;
  }
  main {
    text-align: center;
    margin: 0 auto;
    display: grid;
    /* grid-template-columns: 61.803% 38.197%; */
    grid-template-columns: 50% 50%;
    grid-template-rows: 100%;
    width: 100%;
    height: 100%;
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
