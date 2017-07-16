export default class ColorItem  {

  colorString: string;

  r: number;
  g: number;
  b: number;

  h: number;
  s: number;
  l: number;

  d: number;

  rgbs: string;

  constructor(colorString?: string) {
    let RED, GREEN, BLUE;


    if (colorString) {

      const rgb = [ this.r, this.g, this.b ] = (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
        .exec(colorString)
        .slice(1)
        .map(i => parseInt(i, 16));
      [ RED, GREEN, BLUE ] = rgb.map( i => i / 255);

    } else {
      RED = Math.random();
      GREEN = Math.random();
      BLUE = Math.random();

      this.r = ~~(RED * 255);
      this.g = ~~(GREEN * 255);
      this.b = ~~(BLUE * 255);
    }



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


    this.colorString = `#${_padNumber(this.r)}${_padNumber(this.g)}${_padNumber(this.b)}`;
    this.rgbs = `${this.r}, ${this.g}, ${this.b}`;
  }

  _getRandomColorString () {
    return `#${('000000' + (~~(Math.random() * 16777215)).toString(16)).slice(-6)}`;
  }


};

function _padNumber(n: number) {
  return ('00' + n.toString(16)).slice(-2);
}
