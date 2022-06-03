export class CoffeeEasterEgg implements EasterEgg {
  active: boolean = false;

  constructor(private _document: Document) {
  }

  run(): void {
    let birdsDiv = this._document.createElement("div");
    birdsDiv.id = "easter-egg-birds"
    birdsDiv.classList.add("birds");
    birdsDiv.innerHTML  = "<div class=\"birds__hatdove\">\n" +
      "    <div class=\"birds__hatdove-shadow\"></div>\n" +
      "    <div class=\"birds__hatdove-head\">\n" +
      "      <div class=\"birds__hatdove-hat\"></div>\n" +
      "      <div class=\"birds__hatdove-forehead\"></div>\n" +
      "      <div class=\"birds__hatdove-eye\"></div>\n" +
      "      <div class=\"birds__hatdove-eye\"></div>\n" +
      "      <div class=\"birds__hatdove-beak\"></div>\n" +
      "    </div>\n" +
      "    <div class=\"birds__hatdove-backwing\"></div>\n" +
      "    <div class=\"birds__circles-1\"></div>\n" +
      "    <div class=\"birds__hatdove-backleg\">\n" +
      "      <div class=\"birds__curly\"></div>\n" +
      "    </div>\n" +
      "    <div class=\"birds__hatdove-body\"></div>\n" +
      "    <div class=\"birds__hatdove-frontleg\">\n" +
      "      <div class=\"birds__curly\"></div>\n" +
      "    </div>\n" +
      "    <div class=\"birds__hatdove-frontwing\"></div>\n" +
      "    <div class=\"birds__circles-2\"></div>\n" +
      "    <div class=\"birds__hatdove-frontwing-finger\"></div>\n" +
      "    <div class=\"birds__hatdove-frontwing-finger\"></div>\n" +
      "    <div class=\"birds__hatdove-frontwing-finger\"></div>\n" +
      "  </div>\n" +
      "  <div class=\"birds__table\">\n" +
      "    <div class=\"birds__table-shadow\"></div>\n" +
      "  </div>\n" +
      "  <div class=\"birds__laptop\"></div>\n" +
      "  <div class=\"birds__laptop\">\n" +
      "    <div class=\"birds__monitor\">\n" +
      "      <div class=\"birds__code\"></div>\n" +
      "    </div>\n" +
      "  </div>\n" +
      "  <div class=\"birds__coffee\"></div>\n" +
      "  <div class=\"birds__feather\"></div>\n" +
      "  <div class=\"birds__feather\"></div>\n" +
      "  <div class=\"birds__rundove-shadow\"></div>\n" +
      "  <div class=\"birds__rundove\">\n" +
      "    <div class=\"birds__rundove-backwing\">\n" +
      "      <div class=\"birds__finger\"></div>\n" +
      "      <div class=\"birds__finger\"></div>\n" +
      "      <div class=\"birds__finger\"></div>\n" +
      "      <div class=\"birds__circles\"></div>\n" +
      "    </div>\n" +
      "    <div class=\"birds__rundove-head\">\n" +
      "      <div class=\"birds__rundove-eye\"></div>\n" +
      "      <div class=\"birds__rundove-eye\"></div>\n" +
      "      <div class=\"birds__rundove-beak\"></div>\n" +
      "    </div>\n" +
      "    <div class=\"birds__rundove-backleg\">\n" +
      "      <div class=\"birds__curly\"></div>\n" +
      "    </div>\n" +
      "    <div class=\"birds__rundove-body\"></div>\n" +
      "    <div class=\"birds__rundove-frontleg\">\n" +
      "      <div class=\"birds__curly\"></div>\n" +
      "    </div>\n" +
      "    <div class=\"birds__rundove-frontwing\">\n" +
      "      <div class=\"birds__finger\"></div>\n" +
      "      <div class=\"birds__finger\"></div>\n" +
      "      <div class=\"birds__finger\"></div>\n" +
      "      <div class=\"birds__circles\"></div>\n" +
      "    </div>\n" +
      "  </div>\n";
    let envSection: HTMLElement | null = this._document.getElementById("envs-section");
    envSection?.parentElement?.insertBefore(birdsDiv, envSection);
    envSection?.classList.add("visually-hidden");
    this.active = true;
  }

  stop(): void {
    // @ts-ignore
    this._document.getElementById("envs-section").classList.remove("visually-hidden");
    // @ts-ignore
    this._document.getElementById("easter-egg-birds").remove();
    this.active = false;
  }
}
