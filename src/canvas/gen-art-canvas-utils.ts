import isDOM from 'is-dom';

export namespace GenArtCanvasUtils {
    export const getClientAPI = () => {
        return typeof window !== "undefined" && (window as any)['canvas-sketch-cli'];
      }
      
      export function defined() {
        for (let i = 0; i < arguments.length; i++) {
          if (arguments[i] != null) {
            return arguments[i];
          }
        }
        return undefined;
      }
      
      export const isBrowser = () => {
        return typeof document !== "undefined";
      }
      
      export const isWebGLContext = (ctx: { clear: any; clearColor: any; bufferData: any; }) => {
        return (
          ctx &&
          typeof ctx.clear === "function" &&
          typeof ctx.clearColor === "function" &&
          typeof ctx.bufferData === "function"
        );
      }
      
      export const is2DContext = (ctx: { save: any; scale: any; restore: any; }) => {
        return (
          ctx &&
          typeof ctx.save === "function" &&
          typeof ctx.scale === "function" &&
          typeof ctx.restore === "function"
        );
      }
      
      export const isCanvas = (element: { nodeName: string; getContext: any; }) => {
        return (
          isDOM(element) &&
          /canvas/i.test(element.nodeName) &&
          typeof element.getContext === "function"
        );
      }
      
}   