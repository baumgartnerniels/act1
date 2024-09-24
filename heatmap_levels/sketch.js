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
  background("#ffffff");

  noStroke();
  let country1 = selectedOption;
  let eco = Object.entries(data).find((d) => d[1].key == country1)[1];

  let x = 20;
  let y = 100;
  for (let dim of eco.dimensions) {
    for (let subdim of dim.subdimensions) {
      for (let ind of subdim.indicators) {
        for (let level of ind.levels) {
          rectMode(CENTER);
          ellipseMode(CENTER);
          fill(0);
          //rect(x + 5, y + 5, 40, 40, 5, 5, 5, 5);
          circle(x + 2, y + 2, 15);
          fill("#5ffb7e");
          if (level.status == "NO" || level.status == "NOT_AVAILABLE") {
            fill("#f180d5");
          }
          //rect(x, y, 40, 40, 5, 5, 5, 5);
          circle(x, y, 15);
          fill(0);
          textAlign(CENTER);
          //text(round(difference, 1), x, y + 5);
          //text(ind.key, x, y + 5);
          x += 20;
          if (x > width - 20) {
            x = 20;
            y += 20;
          }
        }
      }
    }
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
