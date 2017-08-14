export default class DataImage {

  img: HTMLImageElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  pixels: Uint8ClampedArray;
  average: string;

  constructor(url: string) {
    this.img = new Image();
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.img.crossOrigin = 'Ananomous';

    this.img.onload = () => {
      let reds = [];
      let blues = [];
      let greens = [];
      this.canvas.width = this.img.width;
      this.canvas.height = this.img.height;
      this.ctx.drawImage(this.img, 0, 0);
      this.pixels = this.ctx.getImageData(0, 0, this.img.height, this.img.width).data;
      for (var c = 0; c < this.pixels.length; c += 4) {
        reds.push(this.pixels[c]);
        greens.push(this.pixels[c + 1]);
        blues.push(this.pixels[c + 2]);
      }
      this.average = `#${padNumber(average(reds))}${padNumber(average(greens))}${padNumber(average(blues))}`;
    }

    //les do it
    this.img.src = url;
  }
}

function average(arr: number[]) {
  return arr.reduce(i => i + i, 0) / arr.length;
}

function padNumber(n: number) {
  return ('00' + n.toString(16)).slice(-2);
}
