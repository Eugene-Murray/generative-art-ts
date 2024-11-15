import './style.css'
import { SVG } from './svg';

const div = document.getElementById('sketch1');
const svg = new SVG.GenSVG().set({ width: '150px', height: '150px' }).addTo(div!);
svg.create('rect').set({ x: '0', y: '0', width: '150', height: '150', fill: 'cornflowerblue' });


