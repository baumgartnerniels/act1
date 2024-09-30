let data;
let scores;
let indicatorTotal = 147;
let levelTotal = 39 * 39;
let d;

function preload() {
  data = loadD3JSON("../data/compiled_data.json");
}
function setup() {
  createCanvas(1000, 1000, WEBGL);
  angleMode(DEGREES);

  d = {
    economies: {},
    dimensions: {},
    subdimensions: {},
    indicators: {},
    levels: {},
  };
  for (let [_id, eco] of Object.entries(data)) {
    d.economies[eco.key] = [
      { key: eco.key, label: eco.label, kind: "economy" },
    ];
    for (let dim of eco.dimensions) {
      if (!d.dimensions[eco.key]) {
        d.dimensions[eco.key] = [];
      }
      d.dimensions[eco.key].push({
        key: dim.key,
        label: dim.label,
        score: dim.scores[2024],
        scores: dim.scores,
        eco_key: eco.key,
        parent_key: eco.key,
        parent_kind: "economy",
        kind: "dimension",
      });
      for (let subdim of dim.subdimensions) {
        if (!d.subdimensions[eco.key]) {
          d.subdimensions[eco.key] = [];
        }
        d.subdimensions[eco.key].push({
          key: subdim.key,
          label: subdim.label,
          score: subdim.score,
          eco_key: eco.key,
          parent_key: dim.key,
          parent_kind: "dimension",
          kind: "subdimension",
        });
        for (let ind of subdim.indicators) {
          if (!d.indicators[eco.key]) {
            d.indicators[eco.key] = [];
          }
          d.indicators[eco.key].push({
            key: ind.key,
            label: ind.label,
            score: ind.score,
            eco_key: eco.key,
            parent_key: subdim.key,
            parent_kind: "subdimension",
            kind: "indicator",
          });
          for (let [id, level] of ind.levels.entries()) {
            if (!d.levels[eco.key]) {
              d.levels[eco.key] = [];
            }
            d.levels[eco.key].push({
              key: ind.key + "_L" + ("0" + id + 1).slice(-2),
              label: level.label,
              score: level.status.match("YES") ? 5 : 0,
              status: level.status,
              eco_key: eco.key,
              parent_key: ind.key,
              parent_kind: "indicator",
              kind: "level",
            });
          }
        }
      }
    }
  }
  console.log(d);
}

function draw() {}

function keyPressed() {
  if (key === "s") {
    console.log("save");

    saveJSON(d, "app_data.json");
  }
}
