import Component, { tracked } from '@glimmer/component';

export default class AppSelect extends Component {

  @tracked searchResults: any[];
  @tracked loaded: boolean;
  @tracked loading: boolean;

  selected: number;

  constructor(things) {
    super(things);

    this.selected = 0;
    this.loaded = false;
    this.searchResults = [];

    this.handleSelectDown = this.handleSelectDown.bind(this);
  }

  selectItem(index) {
    this.selected = index;
    this.searchResults = this.searchResults.map((v, i) => ({
        color: v.color,
        title: v.title,
        author: v.author,
        selected: i === index,
        image: v.image
    }));
  }

  updateSearch (evt) {
    if (evt.target.value.length > 0) {
      this.getSearchResults(evt.target.value).then((data) => {
        this.searchResults = data;
          this.loading = false;
          this.loaded = evt.target.value.length > 0;
          this.selectItem(0);
      });
    } else {
      this.loading = this.loaded = false;
    }

  }

  handleSelectDown(evt) {
    if (evt.which === 40 && this.selected < this.searchResults.length - 1) {
      this.selectItem(this.selected + 1);
    }
    if (evt.which === 38 && this.selected > 0) {
      this.selectItem(this.selected - 1);
    }
    if (evt.which === 13 || evt.which === 27) {
      this.loaded = false;
      this.loading = false;
    }
    this.searchResults[this.selected]
    return this.searchResults[this.selected]
    ? this.searchResults[this.selected].color
    : '';
  }

  getSearchResults(query) {

    return fetch(`https://itunes.apple.com/search?term=${query}&media=software&limit=10`)
      .then(res => res.json())
      .then(res => res.results
        .map(i => ({
          author: i.artistName,
          title: i.trackName,
          image: i.artworkUrl60,
          color: '#ff6300'
        })));
  }

  getThis = (() => {
    let timeout: number;
    return (...args) => {
      this.loading = true;
      this.loaded = false;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        this.updateSearch.apply(this, args);
      }, 350);
    }
  })();

};
