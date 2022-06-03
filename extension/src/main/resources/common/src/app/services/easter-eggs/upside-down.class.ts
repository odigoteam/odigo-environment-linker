export class UpsideDownEasterEgg implements EasterEgg {
  active: boolean = false;

  constructor(private _document: Document) {
  }

  run(): void {
    this._document.getElementsByTagName("html")[0].classList.add('upside-down');
    this.active = true;
  }

  stop(): void {
    this._document.getElementsByTagName("html")[0].classList.remove('upside-down');
    this.active = false;
  }
}
