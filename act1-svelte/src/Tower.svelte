<script>
  import Level from "./Level.svelte";
  let ms = 10;
  let counter = 0;
  const incr = () => (counter += 0.1);

  let clear;
  $: {
    clearInterval(clear);
    clear = setInterval(incr, ms);
  }
</script>

<div class="tower">
  <Level --margin-top="0px" --rotation={counter + "deg"} --z="60" />
  <Level --margin-top="-60px" --rotation={counter + "deg"} --z="50" />
  <Level --margin-top="-60px" --rotation={counter + "deg"} --z="40" />
  <Level --margin-top="-60px" --rotation={counter + "deg"} --z="30" />
  <Level --margin-top="-60px" --rotation={counter + "deg"} --z="20" />
  <Level --margin-top="-60px" --rotation={counter + "deg"} --z="10" />
</div>

<style>
  .tower {
    width: 100%;
    display: grid;
    justify-content: center;
    transform: scale(var(--zoom));
  }
</style>
