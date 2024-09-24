let data;

function preload() {
  data = loadD3JSON("../data/compiled_data.json");
}

function setup() {
  createCanvas(400, 400);
  console.log(data);
}

function draw() {
  background(220);
}
