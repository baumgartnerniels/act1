<div class="level">
  <slot />
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
</style>
