import { GenArtCanvasUtils } from './gen-art-canvas-utils';

export namespace GenArtCanvas {
    export class Sketch {

      private CACHE = 'hot-id-cache';
      private runtimeCollisions = [];

        constructor(sketch: any, settings: any = {}) {

            if (settings.p5) {
                if (settings.canvas || (settings.context && typeof settings.context !== 'string')) {
                  throw new Error(`In { p5 } mode, you can't pass your own canvas or context, unless the context is a "webgl" or "2d" string`);
                }
            
                // Do not create a canvas on startup, since P5.js does that for us
                const context = typeof settings.context === 'string' ? settings.context : false;
                settings = Object.assign({}, settings, { canvas: false, context });
              }
            
              const isHot = this.isHotReload();
              let hotID: string | number;
              if (isHot) {
                // Use a magic name by default, force user to define each sketch if they
                // require more than one in an application. Open to other ideas on how to tackle
                // this as well...
                hotID = defined(settings.id, '$__DEFAULT_CANVAS_SKETCH_ID__$');
              }
              let isInjecting = isHot && typeof hotID === 'string';
            
              if (isInjecting && this.runtimeCollisions.includes(hotID)) {
                console.warn(`Warning: You have multiple calls to canvasSketch() in --hot mode. You must pass unique { id } strings in settings to enable hot reload across multiple sketches. `, hotID);
                isInjecting = false;
              }
            
              let preload = Promise.resolve();
            
              if (isInjecting) {
                // Mark this as already spotted in this runtime instance
                this.runtimeCollisions.push(hotID);
            
                const previousData = this.cacheGet(hotID);
                if (previousData) {
                  const next = () => {
                    // Grab new props from old sketch instance
                    const newProps = this.getTimeProp(previousData.manager, settings);
                    // Destroy the old instance
                    previousData.manager.destroy();
                    // Pass along new props
                    return newProps;
                  };
            
                  // Move along the next data...
                  preload = previousData.load.then(next).catch(next);
                }
            }

            return preload.then(newProps => {
                const manager = new SketchManager();
                let result;
                if (sketch) {
                  // Merge with incoming data
                  settings = Object.assign({}, settings, newProps);
            
                  // Apply settings and create a canvas
                  manager.setup(settings);
            
                  // Mount to DOM
                  manager.mount();
            
                  // load the sketch first
                  result = manager.loadAndRun(sketch);
                } else {
                  result = Promise.resolve(manager);
                }
                if (isInjecting) {
                  this.cachePut(hotID, { load: result, manager });
                }
                return result;
              });

        }

         isHotReload() {
            const client = GenArtCanvasUtils.getClientAPI();
            return client && client.hot;
          }

          cacheGet(id: string | number) {
            const client = GenArtCanvasUtils.getClientAPI();
            if (!client) return undefined;
            client[this.CACHE] = client[this.CACHE] || {};
            return client[this.CACHE][id];
          }
          
          cachePut(id: string | number, data: any) {
            const client = GenArtCanvasUtils.getClientAPI();
            if (!client) return undefined;
            client[this.CACHE] = client[this.CACHE] || {};
            client[this.CACHE][id] = data;
          }
          
          getTimeProp(oldManager: { props: { time: any; }; }, newSettings: { animate: any; }) {
            // Static sketches ignore the time persistency
            return newSettings.animate ? { time: oldManager.props.time } : undefined;
          }
    }
}