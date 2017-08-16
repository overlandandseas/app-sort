import ColorItem from './color';
import AppIcon from './app-icon';

export default class ItemStore {
  private key = 'app-sort:apps';

  store(icons: Set<AppIcon>) {
    const arr = Array.from(icons).map(i => ({
      r: i.r,
      g: i.g,
      b: i.b,
      url: i.url,
      title: i.title
    }));

    localStorage.setItem(this.key, JSON.stringify(arr));
  }

  fetch(): Set<AppIcon> {
    const arr = JSON.parse(localStorage.getItem(this.key)) || [];
    let set = new Set();
    arr.forEach(i => set.add(new AppIcon(i)));
    return set;
  }

}
