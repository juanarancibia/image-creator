import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), { ssr: false });

let r = 5; // Distance between points
let k = 1;
const w = r / Math.sqrt(2); // Size of each cell;

let grid = [];
let active = [];
let ordered = [];

let cols, rows;
let color;

const SketchContainer = (props) => {
  r = props.form.r;

  const setup = (p5, canvasParentRef) => {
    grid = [];
    active = [];
    ordered = [];

    p5.createCanvas(350, 622).parent(canvasParentRef);
    p5.background(props.form.bgColor);

    color = getColor(
      p5,
      '8c75ff-c553d2-2dfd60-2788f5-23054f-f21252-8834f1-c4dd92-184fd3-f9fee2-2E294E-541388-F1E9DA-FFD400-D90368-e9baaa-ffa07a-164555-ffe1d0-acd9e7-4596c7-6d8370-e45240-21d3a4-3303f9-cd2220-173df6-244ca8-a00360-b31016'
        .split('-')
        .map((a) => '#' + a),
      ''
    );

    initializationStep(p5);
    firstStep(p5);
  };

  const draw = (p5) => {
    poissonDiscDistribution(p5);
  };

  const initializationStep = (p5) => {
    cols = p5.floor(p5.width / w);
    rows = p5.floor(p5.height / w);
    for (let i = 0; i < cols * rows; i++) {
      grid[i] = undefined;
    }
  };

  const firstStep = (p5) => {
    for (
      let initialPoints = 0;
      initialPoints < props.form.initialPoints;
      initialPoints++
    ) {
      let x = p5.random(p5.width);
      let y = p5.random(p5.height);
      let i = p5.floor(x / w);
      let j = p5.floor(y / w);
      let pos = p5.createVector(x, y);
      grid[i + j * cols] = pos;
      active.push(pos);
    }
  };

  const poissonDiscDistribution = (p5) => {
    if (p5.frameCount % props.form.framesColor === 0) {
      color = getColor(
        p5,
        '8c75ff-c553d2-2dfd60-2788f5-23054f-f21252-8834f1-c4dd92-184fd3-f9fee2-2E294E-541388-F1E9DA-FFD400-D90368-e9baaa-ffa07a-164555-ffe1d0-acd9e7-4596c7-6d8370-e45240-21d3a4-3303f9-cd2220-173df6-244ca8-a00360-b31016'
          .split('-')
          .map((a) => '#' + a),
        ''
      );
    }
    for (let total = 0; total < props.form.speed; total++) {
      if (active.length > 0) {
        let randIndex = p5.floor(p5.random(active.length));
        let pos = active[randIndex];
        let found = false;
        for (let n = 0; n < k; n++) {
          let sample = p5.constructor.Vector.random2D();
          let m = p5.random(r, 2 * r);
          sample.setMag(m);
          sample.add(pos);
          let col = p5.floor(sample.x / w);
          let row = p5.floor(sample.y / w);
          if (
            col > -1 &&
            row > -1 &&
            col < cols &&
            row < rows &&
            !grid[col + row * cols]
          ) {
            let ok = true;
            for (let c = -1; c <= 1; c++) {
              for (let r = -1; r <= 1; r++) {
                let index = col + c + (row + r) * cols;
                let neighbor = grid[index];
                if (neighbor) {
                  let d = p5.constructor.Vector.dist(sample, neighbor);
                  if (d < r) {
                    ok = false;
                  }
                }
              }
            }
            if (ok) {
              found = true;
              grid[col + row * cols] = sample;
              active.push(sample);
              ordered.push(sample);

              p5.noFill();
              p5.stroke(color);
              p5.strokeWeight(0.5);
              // scribbleInstance.scribbleLine(sample.x, sample.y, pos.x, pos.y);
              p5.line(sample.x, sample.y, pos.x, pos.y);
              // p5.point(sample.x, sample.y, pos.x, pos.y)
              //   const sumX1 = p5.random(r);
              //   const sumX2 = p5.random(r);
              //   p5.triangle(
              //     sample.x,
              //     sample.y,
              //     sample.x + r / 2,
              //     sample.y + r / 2,
              //     sample.x + r / 2,
              //     sample.y - r / 2
              //   );

              // drawRandomCircle(sample.x, sample.y, p5);

              break;
            }
          }
        }
        if (!found) {
          active.splice(randIndex, 1);
        }
      }
    }
  };

  const getColor = (p5, colors, alpha) => {
    const color = p5.random(colors);

    return color + alpha;
  };

  return <Sketch key={props.form.id} setup={setup} draw={draw} />;
};

export default SketchContainer;
