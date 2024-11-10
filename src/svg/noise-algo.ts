/**
 * An implementation of Ken Perlin's noise algorithm in 2D.
 *
 * With thanks to Joe Iddon. https://github.com/joeiddon/perlin
 */
export namespace SVG.Utils {
  export class Noise {
    grad: { [key: string]: { x: number; y: number } };
    cache: { [key: string]: number };

    constructor() {
      this.grad = {};
      this.cache = {};
    }

    /**
     * Get the noise value at the specified co-ordinates.
     *
     * @param {number} x - The noise x co-ordinate.
     * @param {number} [y = 0] - The noise y co-ordinate.
     * @returns {number} the noise value (float between -1 and 1).
     */
    get(x: number, y: number = 0) {
      const key = `${x},${y}`;
      if (this.cache.hasOwnProperty(key)) return this.cache[key];

      let xf = Math.floor(x);
      let yf = Math.floor(y);

      let tl = this.gridDotProduct(x, y, xf, yf);
      let tr = this.gridDotProduct(x, y, xf + 1, yf);
      let bl = this.gridDotProduct(x, y, xf, yf + 1);
      let br = this.gridDotProduct(x, y, xf + 1, yf + 1);

      let xt = this.fade(x - xf, tl, tr);
      let xb = this.fade(x - xf, bl, br);
      let v = this.fade(y - yf, xt, xb);
      this.cache[key] = v;

      return v;
    }

    gridDotProduct(x: number, y: number, vx: number, vy: number) {
      let gVec,
        dVec = { x: x - vx, y: y - vy };
      const gradKey = `${vx},${vy}`;

      if (this.grad[gradKey]) {
        gVec = this.grad[gradKey];
      } else {
        let th = Math.random() * 2 * Math.PI;
        gVec = { x: Math.cos(th), y: Math.sin(th) };
        this.grad[gradKey] = gVec;
      }

      return dVec.x * gVec.x + dVec.y * gVec.y;
    }

    fade(x: number, a: number, b: number) {
      let s = 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;
      return a + s * (b - a);
    }
  }
}
