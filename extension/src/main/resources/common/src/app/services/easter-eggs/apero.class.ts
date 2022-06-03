import {HttpClient} from "@angular/common/http";

export class AperoEasterEgg implements EasterEgg {
  active: boolean = false;

  constructor(private _document: Document,
              private _http: HttpClient) {
  }

  run(): void {
    this._http.get("http://estcequecestbientotlapero.fr/", {observe: 'body', responseType: 'text'} )
      .subscribe((result) => {
        let envSection = this._document.getElementById("envs-section");
        let aperoDiv = this._document.createElement("div");
        aperoDiv.id = "easter-egg-apero"
        aperoDiv.classList.add("apero");
        aperoDiv.classList.add("alert");
        aperoDiv.classList.add("alert-light");
        aperoDiv.classList.add("mt-5");
        aperoDiv.classList.add("p-5");
        aperoDiv.classList.add("container");
        aperoDiv.innerHTML  = result;
        let elementsByTagName = aperoDiv.getElementsByTagName("h2");
        aperoDiv.innerHTML  = elementsByTagName?.item(0)?.innerHTML || "";
        envSection?.parentElement?.insertBefore(aperoDiv, envSection);
        envSection?.classList.add("visually-hidden");
        this.active = true;
      });
  }

  stop(): void {
    // @ts-ignore
    this._document.getElementById("envs-section").classList.remove("visually-hidden");
    // @ts-ignore
    this._document.getElementById("easter-egg-apero").remove();
    this.active = false;
  }
}
