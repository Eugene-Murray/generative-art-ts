import './style.css'
import { GenArtSVG, GenArtSVGUtils } from './svg';

const div = document.getElementById('sketch1');
const svg = new GenArtSVG.Sketch().set({ width: '150px', height: '150px' }).addTo(div!);
svg.create(GenArtSVGUtils.SVGShapes.RECTANGLE).set({ x: '0', y: '0', width: '150', height: '150', fill: 'cornflowerblue' });



