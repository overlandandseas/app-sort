import Component, { tracked } from "@glimmer/component";
import ColorItem from '../../../utils/color';
import AppIcon from '../../../utils/app-icon';
import ItemStore from '../../../utils/item-store';

export default class ColorSort extends Component {

  @tracked colors: any[];
  @tracked showLeftArrow: boolean;
  @tracked showRightArrow: boolean;

  itemsOfItems: string[] = [];
  usedColors: Set<any>;
  contentContainer: HTMLElement;
  currentPosition: number;
  store: ItemStore;


  constructor(options) {
    super(options);
    this.usedColors = new Set();
    this.currentPosition = 0;

    // this._generate100RandomColorsFast(options);
    this.store = new ItemStore();
    this.usedColors = this.store.fetch();
    this.sortHue();
    this.showLeftArrow = false;
    this.showRightArrow = this.currentPosition < this.colors.length - 1;
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
    this.colors = this._universalMap(Array.from(this.usedColors));
  }

  sortDelta() {
    this.colors = this._universalMap(Array.from(this.usedColors).sort((a, b) => a.d - b.d));
  }

  handleKeyDown(func, evt) {
    let app = func(evt);

    if (evt.which === 13) {
      this._addItem(new AppIcon(app));
    }
  }

  addRandomColor() {

    this._addItem(new ColorItem());
  }

  shiftLeft(evt) {
    let contentContainer =  document.getElementById('app-container');

    this.currentPosition--;
    this.showRightArrow = this.currentPosition < this.colors.length - 1;
    this.showLeftArrow = this.currentPosition > 0;
    contentContainer.style.transform = `translateX(${this.currentPosition * -384}px)`;
  }

  shiftRight(evt) {
    let contentContainer =  document.getElementById('app-container');

    this.currentPosition++;
    this.showRightArrow = this.currentPosition < this.colors.length - 1;
    this.showLeftArrow = true;
    contentContainer.style.transform = `translateX(${this.currentPosition * -384}px)`;
  }

  _addItem(item: any) {
    this.usedColors.add(item);
    this.store.store(this.usedColors);
    this.sortHue();
    this.showRightArrow = this.currentPosition < this.colors.length - 1;
    this.showLeftArrow = this.currentPosition > 0;
  }

  _sort(BALANCE: number[]) {
        let arr = Array.from(this.usedColors);

        arr = arr.sort((a, b) => {
          const aFactor = (a.h * BALANCE[0] + a.s * BALANCE[1] + a.l * BALANCE[2]) / 3
          const bFactor = (b.h * BALANCE[0] + b.s * BALANCE[1] + b.l * BALANCE[2]) / 3
          return aFactor - bFactor;
        });
        this.colors = this._universalMap(arr);
  }

  _generate100RandomColorsFast(options) {
    let arr = [];
    for (var c = 1; c <= 100; c++) {
      let color: ColorItem;
      while(this.usedColors.has(color = new ColorItem()));
      this.usedColors.add(color);
      arr.push(color);
    }
    this.colors = arr.map(i => i.colorString );
  }

  _universalMap(arr: any[]) {
    return arr
      .map((value, index, array) => index % 24 === 0
        ? arr.slice(index, index + 24)
        : null)
      .filter( i => i);

  }

}
