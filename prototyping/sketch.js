let data;
let scores;
let indicatorTotal = 147;
let levelTotal = 39 * 39;
let subdimTotal = 50;
let dimTotal = 15;
let ecoTotal = 1;

function preload() {
  data = loadD3JSON("../data/compiled_data.json");
}

function setup() {
  createCanvas(1000, 1000, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  clear();
  ortho();

  rotate(60, [1, 0, 0]);
  rotate(30, [0, 0, 1]);
  strokeWeight(0.5);
  stroke(255);

  let ecoAvg = Object.entries(data).find((d) => d[1].key == "WB6_AVG")[1];

  // Instead of looping through all countries, select a specific country
  let eco = Object.entries(data).find((d) => d[1].key == "BIH")[1];  // Replace "COUNTRY_KEY_HERE" with the specific country key

  // We calculate the grid size to fill the whole plane, where previously 6 countries were drawn.
  let rectLen = ceil(sqrt(dimTotal)); // Grid for one country remains the same
  let gridsize = 450 / rectLen; // Expand the grid size to fill a larger area (adjust 450 as needed)
  let gapSize = 5; // Keep a gap between rectangles

  // Starting x and y offsets for centering the grid
  let xoffset = -width / 4; // Center the grid
  let yoffset = -height / 4;

  let x = xoffset;
  let y = yoffset;
  let levelcount = 0;

  // Loop through the dimensions for the selected country
  for (let dim of eco.dimensions) {
    let dimAvg = ecoAvg.dimensions.find((d) => d.key == dim.key);
    let diff = parseFloat(dim.scores[2024]) - parseFloat(dimAvg.scores[2024]);

    rectMode(CENTER);
    ellipseMode(CENTER);
    fill(0);

    fill("#3d3d3d");
    if (diff < 0) {
      fill("#b7b7b7");
    }
    rect(x, y, gridsize, gridsize);
    levelcount += 1;

    // Move to the next grid position
    x += gridsize;
    if (levelcount % rectLen == 0) {
      x = xoffset;
      y += gridsize;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}

function handleSelection() {
  selectedOption = selectBox.value();
  console.log("Selected option:", selectedOption);
  redraw();
}
