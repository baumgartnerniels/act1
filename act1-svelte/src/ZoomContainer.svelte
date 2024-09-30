<script>
  import { onMount } from "svelte";

  // alternativ: https://github.com/manuelstofer/pinchzoom

  $: scale = 1; // Initial scale
  const scaleFactor = 0.1; // Amount to scale per scroll event
  let isScalingEnabled = false; // Flag to control scaling
  let initialDistance = 0; // Distance between two touch points

  // Function to handle the wheel event
  function handleWheel(event) {
    if (isScalingEnabled) {
      event.preventDefault(); // Prevent default scroll behavior

      // Determine the direction of the scroll
      if (event.deltaY < 0) {
        // Scrolling up (zoom in)
        scale += scaleFactor;
      } else {
        // Scrolling down (zoom out)
        scale -= scaleFactor;
      }

      // Limit the scale to a reasonable range
      scale = Math.min(Math.max(scale, 0.5), 3); // Scale between 0.5 and 3
    }
  }

  // Function to handle touch events for pinch-to-zoom
  function handleTouchStart(event) {
    if (event.touches.length === 2) {
      initialDistance = getDistance(event.touches[0], event.touches[1]);
    }
  }

  function handleTouchMove(event) {
    if (event.touches.length === 2) {
      const currentDistance = getDistance(event.touches[0], event.touches[1]);
      const distanceChange = currentDistance - initialDistance;

      // Adjust scale based on the change in distance
      if (distanceChange > 0) {
        scale += scaleFactor; // Pinch out (zoom in)
      } else if (distanceChange < 0) {
        scale -= scaleFactor; // Pinch in (zoom out)
      }

      // Limit the scale to a reasonable range
      scale = Math.min(Math.max(scale, 0.5), 3); // Scale between 0.5 and 3

      // Update the initial distance for the next move event
      initialDistance = currentDistance;

      event.preventDefault(); // Prevent default touch behavior
    }
  }

  // Function to calculate the distance between two touch points
  function getDistance(touch1, touch2) {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // Set up event listeners for mouse enter and leave
  function handleMouseEnter() {
    isScalingEnabled = true;
  }

  function handleMouseLeave() {
    isScalingEnabled = false;
  }

  // Attach the wheel event listener on mount
  onMount(() => {
    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="map-container"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/9/91/Winkel_triple_projection_SW.jpg"
    alt="Map"
    class="map"
    style="--scale:{scale}"
  />
</div>

<style>
  .map-container {
    overflow: hidden; /* Prevent overflow */
    width: 100%;
    height: 100vh; /* Full viewport height */
    position: relative;
  }

  .map {
    transition: transform 0.2s ease; /* Smooth transition for scaling */
    transform-origin: center; /* Scale from the center */
    transform: scale(var(--scale)); /* Apply the scale transform */
  }
</style>
