<div class="level">
  <slot />
</div>

<style>
  :root {
    --room-size: 14vh;
    --rotation: 30deg;
  }
  .level {
    z-index: var(--z);
    display: grid;
    grid-template-columns: repeat(3, var(--room-size));
    grid-template-rows: repeat(2, var(--room-size));
    grid-gap: 5px;
    align-items: center;
    transform: rotateX(60deg) rotateZ(var(--rotation));
    position: relative;
    margin-top: var(--margin-top);
    height: fit-content;
  }
</style>
