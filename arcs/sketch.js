let data;
let scores;

let options = ["ALB", "BIH", "KOS", "MNE", "MKD", "SRB"];
let selectBox;
let selectedOption = "ALB";

function preload() {
  data = loadD3JSON("../data/compiled_data.json");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  // Create a select box
  selectBox = createSelect();

  // Add options to the select box from the string array
  for (let i = 0; i < options.length; i++) {
    selectBox.option(options[i]);
  }

  // Set a default option
  selectBox.selected(options[0]);

  // Position the select box
  selectBox.position(10, 10);

  // Add an event listener for when the selection changes
  selectBox.changed(handleSelection);
}

function draw() {
  background("#313131");

  noStroke();
  let country1 = selectedOption;
  let country2 = "WB6_AVG";
  let eco = Object.entries(data).find((d) => d[1].key == country1)[1];
  let eco2 = Object.entries(data).find((d) => d[1].key == country2)[1];

  let r = 150;
  let start_angle = 0;
  let step_angle = 360 / eco.dimensions.length;
  let stop_angle = step_angle;
  for (let dim of eco.dimensions) {
    push();
    noStroke();
    fill(220);
    translate(width / 2, height / 2);
    rotate(start_angle + step_angle / 2);
    text(dim.label, 250, 0);
    pop();
    let dim2 = eco2.dimensions.find((d) => d.key == dim.key);
    for (let subdim of dim.subdimensions) {
      let subdim2 = dim2.subdimensions.find((s) => s.key == subdim.key);
      for (let ind of subdim.indicators) {
        let ind2 = subdim2.indicators.find((i) => i.key == ind.key);
        let difference = parseFloat(ind.score) - parseFloat(ind2.score);
        ellipseMode(CENTER);
        noFill();
        strokeWeight(10);
        strokeCap(SQUARE);
        stroke("#5ffb7e");
        if (difference < 0.0) {
          stroke("#f180d5");
        }
        arc(width / 2, height / 2, r, r, start_angle, stop_angle);
        r += 22;
      }
      r += 10;
    }
    r = 150;
    stop_angle += step_angle;
    start_angle += step_angle;
  }
  //extrude faces

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
