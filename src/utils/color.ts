export default class ColorItem  {

  colorString: string;

  r: number;
  g: number;
  b: number;

  h: number;
  s: number;
  l: number;

  d: number;

  constructor() {

    const RED = Math.random();
    const GREEN = Math.random();
    const BLUE = Math.random();

    this.r = ~~(RED * 255);
    this.g = ~~(GREEN * 255);
    this.b = ~~(BLUE * 255);

    const cmax = Math.max(RED, GREEN, BLUE);
    const cmin = Math.min(RED, GREEN, BLUE);
    const delta = cmax - cmin;

    this.d = delta;
    this.l = (cmin + cmax) / 2;

    if (cmin === cmax) {
      this.h = this.s = 0;
      return;
    }

    this.s = this.l > 0.5 ? delta / (2 - cmin - cmax) : delta / (cmin + cmax);


    this.h = {
      [RED]: (GREEN - BLUE) / delta + (GREEN < BLUE ? 6: 0),
      [GREEN]: (BLUE - RED) / delta + 2,
      [BLUE]: (RED - GREEN) / delta + 4
    }[cmax] / 6;


    this.colorString = `#${_padNumber(this.r)}${_padNumber(this.g)}${_padNumber(this.b)}`
  }

  _getRandomColorString () {
    return `#${('000000' + (~~(Math.random() * 16777215)).toString(16)).slice(-6)}`;
  }


};

function _padNumber(n: number) {
  return ('00' + n.toString(16)).slice(-2);
}
