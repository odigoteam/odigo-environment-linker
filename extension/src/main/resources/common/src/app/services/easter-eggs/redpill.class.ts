import {ConfigurationService} from "../configuration.service";

export class RedPillEasterEgg implements EasterEgg {
  active: boolean = false;

  constructor(private _document: Document,
              private _configurationService: ConfigurationService) {
  }

  run(): void {
    console.log("Easter egg: redpill");
    let matrixCanvas = this._document.createElement("canvas");
    this._document.body.prepend(matrixCanvas);
    matrixCanvas.id = "matrix-canvas";

    this._configurationService.configuration.userConfiguration.userOptions.darkTheme ? this._document.body.classList.remove("theme-dark") : this._document.body.classList.remove("theme-light");
    this._document.body.classList.add("theme-redpill");

    this.initMatrix(matrixCanvas);
    this.active = true;
  }

  stop(): void {
    // @ts-ignore
    this._document.getElementById("matrix-canvas").remove();
    this._document.body.classList.remove("theme-redpill");
    this._configurationService.configuration.userConfiguration.userOptions.darkTheme ? this._document.body.classList.add("theme-dark") : this._document.body.classList.add("theme-light");
    this.active = false;
  }

  private initMatrix(canvas: HTMLCanvasElement) {
    let ctx = canvas.getContext('2d');

// Setting the width and height of the canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

// Setting up the letters
    let letters: string[] = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ'.split('');

// Setting up the columns
    let fontSize = 10, columns = canvas.width / fontSize;

// Setting up the drops
    let drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    // Loop the animation
    setInterval(() => {
      // @ts-ignore
      ctx.fillStyle = 'rgba(0, 0, 0, .1)';
      // @ts-ignore
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < drops.length; i++) {
        let text = letters[Math.floor(Math.random() * letters.length)];
        // @ts-ignore
        ctx.fillStyle = '#0f0';
        // @ts-ignore
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
          drops[i] = 0;
        }
      }
    }, 33);
  }
}
