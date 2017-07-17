import Component, { tracked } from '@glimmer/component';

export default class PreviewInput extends Component {

  @tracked colorString: string;
  @tracked invalidInput: boolean= false;

  updatePreview(evt) {
    this.colorString = evt.target.value;

    this.invalidInput = this.colorString
      ? !(/^#(?:[0-9a-fA-F]{3}){1,2}$/).test(this.colorString)
      : false;
  }
};
