import {HttpClient} from "@angular/common/http";

export class WeekEndEasterEgg implements EasterEgg {
  active: boolean = false;

  constructor(private _document: Document,
              private _http: HttpClient) {
  }

  run(): void {
    this._http.get("https://estcequecestbientotleweekend.fr/", {observe: 'body', responseType: 'text'} )
      .subscribe((result) => {
        let envSection = this._document.getElementById("envs-section");
        let weekendDiv = this._document.createElement("div");
        weekendDiv.id = "easter-egg-weekend"
        weekendDiv.classList.add("weekend");
        weekendDiv.classList.add("alert");
        weekendDiv.classList.add("alert-light");
        weekendDiv.classList.add("mt-5");
        weekendDiv.classList.add("p-5");
        weekendDiv.classList.add("container");
        weekendDiv.innerHTML  = result;
        let elementsByTagName = weekendDiv.getElementsByTagName("p");
        weekendDiv.innerHTML  = elementsByTagName?.item(0)?.innerHTML || "";
        envSection?.parentElement?.insertBefore(weekendDiv, envSection);
        envSection?.classList.add("visually-hidden");
        this.active = true;
      });
  }

  stop(): void {
    // @ts-ignore
    this._document.getElementById("envs-section").classList.remove("visually-hidden");
    // @ts-ignore
    this._document.getElementById("easter-egg-weekend").remove();
    this.active = false;
  }
}
