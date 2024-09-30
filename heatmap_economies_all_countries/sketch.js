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
  //background("#ffffff");
  clear();
  ortho();

  // rotate(60, [1, 0, 0]);
  // rotate(30, [0, 0, 1]);
  strokeWeight(0.5);
  stroke(255);

  let country_index = 0;
  let rectLen = ceil(sqrt(ecoTotal));
  let gridsize = 150 / rectLen;
  let gapSize = 5;
  for (let [_id, eco] of Object.entries(data)) {
    if (eco.key == "WB6_AVG") {
      continue;
    }
    yoffset = (country_index % 2) * (rectLen * gridsize + gapSize) + 20;
    xoffset = (country_index % 3) * (rectLen * gridsize + gapSize) + 20;

    console.log(xoffset, yoffset);
    let x = xoffset;
    let y = yoffset;
    let levelcount = 0;
    rectMode(CENTER);
    fill("#3d3d3d");
    rect(x, y, gridsize, gridsize);
    levelcount += 1;
    fill(0);
    textAlign(CENTER);
    x += gridsize;
    if (levelcount % rectLen == 0) {
      x = xoffset;
      y += gridsize;
    }
    country_index++;
  }

  noLoop();
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
