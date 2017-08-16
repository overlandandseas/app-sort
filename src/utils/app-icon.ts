class AppIcon {

    static img: HTMLImageElement;
    static canvas: HTMLCanvasElement;
    static ctx: CanvasRenderingContext2D;

    colorString: string;
    rgba: string;
    url: string;
    title:string;

    r: number;
    g: number;
    b: number;
    h: number;
    s: number;
    l: number;
    d: number;

    static initializer(): void {
        this.img = new Image();
        this.img.crossOrigin = 'Ananomous';
        this.canvas = document.createElement('canvas');
        this.ctx = AppIcon.canvas.getContext('2d');
    }

    constructor(params: any) {
      if (params.r && params.b && params.g) {
        this.r = params.r;
        this.g = params.g;
        this.b = params.b;
        this.url = params.url;
        this.setHSL(this.r, this.g, this.b);
      } else {
        AppIcon.img.onload = this.handleOnLoad.bind(this);
        AppIcon.img.src = this.url = params.url;
      }
      this.title = params.title;
    }

    handleOnLoad(): void {
      let reds: number[] = [];
      let greens: number[] = [];
      let blues: number[] = [];

      AppIcon.canvas.width = AppIcon.img.width;
      AppIcon.canvas.height = AppIcon.img.height;
      AppIcon.ctx.drawImage(AppIcon.img, 0, 0);

      const pixels: Uint8ClampedArray = AppIcon.ctx.getImageData(0, 0, AppIcon.img.height, AppIcon.img.width).data;

      for (var c: number = 0; c < pixels.length; c += 4) {
        reds.push(pixels[c]);
        greens.push(pixels[c + 1]);
        blues.push(pixels[c + 2]);
      }

      this.r = avg(reds);
      this.g = avg(greens);
      this.b = avg(blues);

      this.setHSL(this.r, this.g, this.b);
      this.colorString = `#${pad(this.r)}${pad(this.g)}${pad(this.b)}`;
    }

    setHSL(r: number, g: number, b:number): void {
      const cmax = Math.max(r, g, b);
      const cmin = Math.min(r, g, b);
      const delta = cmax - cmin;

      this.d = delta;
      this.l = (cmin + cmax) / 2;

      if (cmin === cmax) {
        this.h = this.s = 0;
      } else {
        this.s = this.l > 0.5 ? delta / (2 - cmin - cmax) : delta / (cmin + cmax);

        this.h = {
          [r]: (g - b) / delta + (g < b ? 6: 0),
          [g]: (b - r) / delta + 2,
          [b]: (r - g) / delta + 4
        }[cmax] / 6;
    }
  }


}

// pure functions
function avg(arr: number[]): number {
  return ~~(arr.reduce((val, prev) => val + prev, 0) / arr.length);
}
function pad(n: number): string {
  return ('00' + n.toString(16)).slice(-2);
}
AppIcon.initializer();
export default AppIcon;
