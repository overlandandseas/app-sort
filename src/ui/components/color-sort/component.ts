import Component, { tracked } from "@glimmer/component";
// import ColorItem from "./color-item/component";
import ColorItem from '../../../utils/color';

export default class ColorSort extends Component {

  @tracked colors: any[];

  itemsOfItems: string[] = [];
  usedColors: Set<ColorItem>;

  constructor(options) {
    super(options);
    this.usedColors = new Set();

    this._generate100RandomColorsFast(options);
  }

  // actions
  sortHue() {
    this._sort([1, 0, 0]);
  }

  sortSat() {
    this._sort([0, 1, 0]);
  }

  sortLig() {
    this._sort([0, 0, 1]);
  }

  defaultOrder() {
    this.colors = Array.from(this.usedColors).map(i => i.colorString);
  }

  sortDelta() {
    this.colors = Array.from(this.usedColors).sort((a, b) => a.d - b.d).map(i => i.colorString);
  }




  _sort(BALANCE: number[]) {
        let arr = Array.from(this.usedColors);

        arr = arr.sort((a, b) => {
          const aFactor = (a.h * BALANCE[0] + a.s * BALANCE[1] + a.l * BALANCE[2]) / 3
          const bFactor = (b.h * BALANCE[0] + b.s * BALANCE[1] + b.l * BALANCE[2]) / 3
          return aFactor - bFactor;
        });
        this.colors = arr.map(i => i.colorString);
  }

  _generate100RandomColorsFast(options) {
    let arr = [];
    for (var c = 1; c < 15; c++) {
      let color: ColorItem;
      while(this.usedColors.has(color = new ColorItem()));
      this.usedColors.add(color);
      arr.push(color);
    }
    this.colors = arr.map(i => i.colorString );
  }

  // _generate100RandomColors(options) {
  //   let temp: any[] = [];
  //   for (var c = 1; c < 100; c++) {
  //     let color: ColorItem;
  //     while(this.usedColors.has(color = new ColorItem(options)));
  //     this.usedColors.add(color);
  //     temp[c % 5] = ColorItem;
  //     if(c % 5 === 0) {
  //       // this.itemsOfItems.push({
  //       //   colors: temp,
  //       //   even: (this.itemsOfItems.length + 1) % 2 === 0,
  //       // });
  //       temp = [];
  //     }
  //   }
  // }

}
