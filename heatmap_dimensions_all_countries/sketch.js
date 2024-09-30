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

  // let xoffset = 20;
  // let yoffset = 20;
  let ecoAvg = Object.entries(data).find((d) => d[1].key == "WB6_AVG")[1];
  let country_index = 0;
  let rectLen = ceil(sqrt(dimTotal));
  let gridsize = 150 / rectLen;
  let gapSize = 5;
  for (let [_id, eco] of Object.entries(data)) {
    if (eco.key == "WB6_AVG") {
      continue;
    }
    yoffset = (country_index % 2) * (rectLen * gridsize + gapSize) + 20;
    xoffset = (country_index % 3) * (rectLen * gridsize + gapSize) + 20;

    let x = xoffset;
    let y = yoffset;
    let levelcount = 0;
    for (let dim of eco.dimensions) {
      let dimAvg = ecoAvg.dimensions.find((d) => d.key == dim.key);
      let diff = parseFloat(dim.scores[2024]) - parseFloat(dimAvg.scores[2024]);
      rectMode(CENTER);
      ellipseMode(CENTER);
      fill(0);
      //rect(x + 5, y + 5, 40, 40, 5, 5, 5, 5);
      //circle(x + 2, y + 2, 15);
      fill("#3d3d3d");
      if (diff < 0) {
        fill("#b7b7b7");
      }
      rect(x, y, gridsize, gridsize);
      levelcount += 1;
      //circle(x, y, 15);
      fill(0);
      textAlign(CENTER);
      //text(round(difference, 1), x, y + 5);
      //text(ind.key, x, y + 5);
      x += gridsize;
      if (levelcount % rectLen == 0) {
        x = xoffset;
        y += gridsize;
      }
    }

    country_index++;
  }
  //noLoop();
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
