import Component, { tracked } from "@glimmer/component";

export default class ColorSort extends Component {

  @tracked itemsOfItems: any[] = [];

  constructor(options) {
    super(options);
    let temp = [];
    for (var c = 1; c < 100; c++) {
      temp[c % 5] = `#${('000000' + (~~(Math.random() * 16777215)).toString(16)).slice(-6)}`
      if (c % 5 === 0) {
        this.itemsOfItems.push({
          even: (this.itemsOfItems.length + 1) % 2 === 0,
          colors: temp
        });
        temp = [];
      };
    };
  }

}
