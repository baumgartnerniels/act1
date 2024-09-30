<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    export let data = [];

    // Function to create the chart
    function createChart() {
        const svg = d3.select('#chart')
            .attr('width', 500)
            .attr('height', 300);

        // Clear previous content
        svg.selectAll('*').remove();

        // Create a simple bar chart
        svg.selectAll('rect')
          .data(data)
          .enter()
          .append('rect')
            .attr('x', (d, i) => i * 50)
            .attr('y', d => 300 - d)
            .attr('width', 40)
            .attr('height', d => d)
            .attr('fill', 'blue');
    }

    // Call createChart when data changes
    $: createChart();

    onMount(() => {
        createChart();
    });
</script>

<svg id="chart"></svg>