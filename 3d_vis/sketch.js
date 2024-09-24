let shape;
let tex;
let extrudes;

let data;
let scores;

function preload() {
  shape = loadModel("pentagonal_pyramid.obj");
  tex = loadImage("uv_map.png");
  data = loadD3JSON("../data/compiled_data.json");
}
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  scores = data[0].dimensions.map((d) => d.scores[2024]);
}

function draw() {
  background(200);
  orbitControl();
  ortho();
  rotate(frameCount / 2, [0, 1, 0]);
  push();
  scale(5);
  rotate(180, [0, 0, 1]);
  //texture(tex);
  fill(0);
  stroke(200);
  model(shape);
  //basically scale
  // for (let i = 0; i < shape.vertices.length; i++) {
  //   let pos = shape.vertices[i].copy();
  //   pos = pos.add(shape.vertexNormals[i].copy().mult(5));
  //   point(pos);
  // }

  let colors = [
    "#800075",
    "#f0b401",
    "#ed7520",
    "#047abf",
    "#002394",
    "#d92028 ",
    "#c2c2c2",
    "#a000bd",
  ];

  noStroke();

  for (let [_id, eco] of Object.entries(data)) {
    let scoreIndex = 0;
    scores = eco.dimensions.map((d) => d.scores[2024]);
    eco.color = colors[_id];
    //extrude faces

    extrudes = [];
    for (let fi = 0; fi < shape.faces.length; fi++) {
      if (fi == 0 || fi == 8 || fi == 12) {
        continue;
      }

      let faceVertices = shape.faces[fi];
      let faceNormal = p5.Vector.cross(
        shape.vertices[faceVertices[1]]
          .copy()
          .sub(shape.vertices[faceVertices[0]]),
        shape.vertices[faceVertices[2]]
          .copy()
          .sub(shape.vertices[faceVertices[0]])
      ).normalize();
      noFill();
      fill(eco.color);
      let corners = new Array(6);
      for (let i = 0; i < faceVertices.length; i++) {
        let pos = shape.vertices[faceVertices[i]].copy();
        let newPos = pos
          .copy()
          .add(faceNormal.copy().mult(scores[scoreIndex] * 15));
        //line(pos.x, pos.y, pos.z, newPos.x, newPos.y, newPos.z);
        corners[i] = pos;
        corners[i + 3] = newPos;
      }
      //0,8,12
      beginShape(TRIANGLES);

      // // bottom
      // vertex(corners[0].x, corners[0].y, corners[0].z);
      // vertex(corners[1].x, corners[1].y, corners[1].z);
      // vertex(corners[2].x, corners[2].y, corners[2].z);

      // vertex(corners[0].x, corners[0].y, corners[0].z);
      // vertex(corners[1].x, corners[1].y, corners[1].z);
      // vertex(corners[4].x, corners[4].y, corners[4].z);

      // vertex(corners[0].x, corners[0].y, corners[0].z);
      // vertex(corners[2].x, corners[2].y, corners[2].z);
      // vertex(corners[5].x, corners[5].y, corners[5].z);

      // vertex(corners[0].x, corners[0].y, corners[0].z);
      // vertex(corners[3].x, corners[3].y, corners[3].z);
      // vertex(corners[4].x, corners[4].y, corners[4].z);

      // vertex(corners[0].x, corners[0].y, corners[0].z);
      // vertex(corners[3].x, corners[3].y, corners[3].z);
      // vertex(corners[5].x, corners[5].y, corners[5].z);

      // vertex(corners[1].x, corners[1].y, corners[1].z);
      // vertex(corners[4].x, corners[4].y, corners[4].z);
      // vertex(corners[5].x, corners[5].y, corners[5].z);

      // vertex(corners[1].x, corners[1].y, corners[1].z);
      // vertex(corners[2].x, corners[2].y, corners[2].z);
      // vertex(corners[5].x, corners[5].y, corners[5].z);
      //top

      vertex(corners[3].x, corners[3].y, corners[3].z);
      vertex(corners[4].x, corners[4].y, corners[4].z);
      vertex(corners[5].x, corners[5].y, corners[5].z);

      endShape();

      scoreIndex++;
    }
    // for (let extrude of extrudes) {
    //   model(extrude);
    // }
  }
  pop();
}
