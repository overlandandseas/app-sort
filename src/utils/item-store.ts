import ColorItem from './color';

export default class ItemStore {
  private key = 'color-sort:colors';

  store(colors: Set<ColorItem>) {
    const arr = Array.from(colors).map(i => i.colorString);

    localStorage.setItem(this.key, JSON.stringify(arr));
  }

  fetch(): Set<ColorItem> {
    const arr = JSON.parse(localStorage.getItem(this.key)) || [];
    let set = new Set();
    arr.forEach(i => set.add(new ColorItem(i)));
    return set;
  }

}
