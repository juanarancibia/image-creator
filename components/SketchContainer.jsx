/* eslint-disable no-case-declarations */
import { Button } from '@mui/material';
import dynamic from 'next/dynamic';
import { SHAPES } from 'shared/constants/shapes.const';

const Sketch = dynamic(import('react-p5'), { ssr: false });

let r = 3; // Distance between points
let k = 30;
let w = r / Math.sqrt(2); // Size of each cell;

let grid = [];
let active = [];
let ordered = [];

let cols, rows;
let color;
let canvas;
let p5Instance;

const SketchContainer = (props) => {
  r = props.form.r;
  w = (r - props.form.overlappingFactor * r * 0.1) / Math.sqrt(2);

  const setup = (p5, canvasParentRef) => {
    p5Instance = p5;
    grid = [];
    active = [];
    ordered = [];

    canvas = p5.createCanvas(350, 622).parent(canvasParentRef);
    p5.background(props.form.bgColor);
    p5.strokeCap(p5.ROUND);

    color = getColor(p5, props.form.colorPalette);

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
      color = getColor(p5, props.form.colorPalette);
    }
    for (let total = 0; total < props.form.speed; total++) {
      if (active.length > 0) {
        let randIndex = p5.floor(p5.random(active.length));
        let pos = active[randIndex];
        let found = false;
        for (let n = 0; n < k; n++) {
          let sample = p5.constructor.Vector.random2D();
          let m = p5.random(r, 2 * props.form.r);
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
            for (let ii = -1; ii <= 1; ii++) {
              for (let jj = -1; jj <= 1; jj++) {
                let index = col + ii + (row + jj) * cols;
                let neighbor = grid[index];
                if (neighbor) {
                  let d = p5.constructor.Vector.dist(sample, neighbor);
                  if (d < props.form.r) {
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
              p5.strokeWeight(props.form.strokeWeight);

              switch (props.form.shape) {
                case SHAPES.CONNECTED_LINE:
                  p5.line(sample.x, sample.y, pos.x, pos.y);
                  break;
                case SHAPES.LINE:
                  const angle =
                    props.form.lineAngle === -1
                      ? p5.random(360)
                      : props.form.lineAngle;
                  const direction = p5.constructor.Vector.fromAngle(
                    p5.radians(angle),
                    m
                  );
                  direction.add(sample);

                  p5.line(sample.x, sample.y, direction.x, direction.y);
                  break;
                case SHAPES.POINT:
                  p5.point(sample.x, sample.y, pos.x, pos.y);
                  break;
                case SHAPES.CIRCLES:
                  drawRandomCircle(sample.x, sample.y, p5);
                  break;
              }
              // scribbleInstance.scribbleLine(sample.x, sample.y, pos.x, pos.y);

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

  const drawRandomCircle = (currentX, currentY, p5) => {
    const layerNo = props.form.circleLayers;
    const size = p5.random(props.form.circleSize);
    const arcDistance = size / layerNo;

    for (let layer = 0; layer < layerNo; layer++) {
      const color = getColor(p5, props.form.colorPalette);

      p5.strokeWeight(props.form.strokeWeight);
      p5.stroke(color);
      p5.noFill();
      p5.arc(
        currentX,
        currentY,
        size - layer * arcDistance,
        size - layer * arcDistance,
        p5.random(p5.TWO_PI),
        p5.random(p5.TWO_PI)
      );
    }
  };

  const getColor = (p5, colors) => {
    const color = p5.random(colors);

    return color + props.form.alpha;
  };

  const saveImage = () => {
    p5Instance.save(canvas, 'created-image.png');
  };

  return (
    <div className="flex flex-col align-center justify-center">
      <div style={{ width: '350px', height: '622px' }}>
        <Sketch key={props.form.id} setup={setup} draw={draw} />
      </div>
      <Button className="my-8 text-lg" variant="outlined" onClick={saveImage}>
        Save Image
      </Button>
    </div>
  );
};

export default SketchContainer;
