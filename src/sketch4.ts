import { GenArtSVG, GenArtSVGUtils } from "./svg";

// Viewport size (1:1 aspect ratio).
const svgSize = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;

// Parent SVG.
const svg = new GenArtSVG.Sketch().addTo(document.getElementById('sketch4')!);
svg.set({ width: svgSize.toString(), height: svgSize.toString(), viewBox: '0 0 1000 1000' });

// Background.
svg.create(GenArtSVGUtils.SVGShapes.RECTANGLE).set({
  x: '0', y: '0', width: '1000', height: '1000', fill: '#181818'
});

// Set a random iteration count for the loop.
let iterations = GenArtSVGUtils.Helpers.random(250, 500, false) as number;

// Our shapes array.
let elements = ['circle', 'line', 'rect'];

// Start the loop.
for (let i = 0; i < iterations; i += 1) {

  // Pick a random element.
  let element = GenArtSVGUtils.Helpers.random(elements);

  // Set up variables that we can use on any element.
  let x = GenArtSVGUtils.Helpers.random(200, 800) as number;
  let y = GenArtSVGUtils.Helpers.random(200, 800) as number;
  let fill = `hsl(${GenArtSVGUtils.Helpers.random(120, 240)} 80% 80% / ${GenArtSVGUtils.Helpers.random(5, 40)}%)`;
  let stroke = `hsl(${GenArtSVGUtils.Helpers.random(0, 120)} 80% 80% / ${GenArtSVGUtils.Helpers.random(5, 40)}%)`;
  let strokeWidth = `${GenArtSVGUtils.Helpers.random(1, 3)}`;

  // Initialise the properties variable.
  let props;
  
  // Populate the properties depending on the element chosen.
  switch(element) {
    case 'circle':
      props = {
        cx: x,
        cy: y,
        r: GenArtSVGUtils.Helpers.random(1, 10),
        fill: fill,
        stroke: stroke,
        stroke_width: strokeWidth
      };
      break;
    case 'line':
      props = {
        x1: x,
        y1: y,
        x2: x + Number(GenArtSVGUtils.Helpers.random(-25, 25)),
        y2: y + Number(GenArtSVGUtils.Helpers.random(-25, 25)),
        stroke: stroke
      };
      break;
    case 'rect':
      props = {
        x: x,
        y: y,
        width: GenArtSVGUtils.Helpers.random(5, 25),
        height: GenArtSVGUtils.Helpers.random(5, 25),
        fill: fill,
        stroke: stroke,
        stroke_width: strokeWidth,
        transform: `rotate(${GenArtSVGUtils.Helpers.random(0, 360)} 500 500)`
      }
  }

  // Create the element and set its properties.
  svg.create(element).set(props);
}