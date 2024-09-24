let dim_labels,
  dim_scores,
  eco_labels,
  ind_labels,
  ind_scores,
  structure,
  subdim_labels,
  subdim_scores;
let data = [];

function preload() {
  // Promise.all([
  //   d3.csv("../data/dimensions_labels.csv"),
  //   d3.csv("../data/dimensions_scores_historic.csv"),
  // ]).then((d) => (data = d));

  dim_labels = loadD3CSV("../data/dimensions_labels.csv");
  dim_scores = loadD3CSV("../data/dimensions_scores.csv");
  eco_labels = loadD3CSV("../data/economies_labels.csv");
  ind_labels = loadD3CSV("../data/indicators_labels.csv");
  ind_scores = loadD3CSV("../data/indicators_scores.csv");
  structure = loadD3CSV("../data/structure.csv");
  subdim_labels = loadD3CSV("../data/subdimensions_labels.csv");
  subdim_scores = loadD3CSV("../data/subdimensions_scores.csv");
}

function setup() {
  createCanvas(400, 400);
  console.log(data);

  for (let s of structure){
    data[]
  }

  // data = eco_labels;
  // for (eco of data) {
  //   eco.dimensions = dim_labels;
  //   eco.dimensions = eco.dimensions.map((dim) => {
  //     dim = {
  //       ...dim,
  //       ...dim_scores.find((s) => s.key == dim.key && s.economy == eco.key),
  //     };

      

  //     return dim;
  //   });
  // }
  console.log(data);
}

function mergeLabels(a1, a2, key) {
  let merged = [];
  for (let i = 0; i < a1.length; i++) {
    merged.push({
      ...a1[i],
      ...a2.find((itmInner) => itmInner[key] === a1[i][key]),
    });
  }
  return merged;
}

function draw() {
  background(220);
  text(eco_labels[0].label, 10, 10);
}
