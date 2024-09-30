<script>
  let countries = ["ALB", "BIH", "KOS", "MNE", "MKD", "SRB"];
</script>

<div class="level">
  {#each countries as country}
    <div data-country={country}></div>
  {/each}
</div>

<style>
  .level {
    --country-size: 80px;
    z-index: var(--z);
    display: grid;
    grid-template-columns: repeat(3, var(--country-size));
    grid-template-rows: repeat(2, var(--country-size));
    grid-gap: 5px;
    align-items: center;
    transform: rotateX(60deg) rotateZ(var(--rotation));
    position: relative;
    margin-top: var(--margin-top);
  }
  .level > div {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: #4caf50;
    border: 2px solid #ffffff;
    display: grid;
    justify-content: center;
    align-items: center;
  }
  .level > div:hover {
    border: 5px solid #ffffff;
  }
</style>
