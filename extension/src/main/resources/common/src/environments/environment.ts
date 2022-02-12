// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  releaseNote: {
    title: "Time to power up ! <i class=\"bi bi-lightning-charge-fill\"></i>\n",
    features: [
      {
        shortDesc: "Rewrite plugin in Angular 13",
        longDesc: "Improve structure and architecture for a better project adaptability, Angular will boost the future releases developments and minimize bugs creation with a collection of well-integrated libraries that cover a wide variety of functionality including routing, form handling, client-server communication, and more"
      },
      {
        shortDesc: "New design",
        longDesc: "For this major improvement, I hope you will like that new design!"
      },
      {
        shortDesc: "Configuration screen design reworked",
        longDesc: "As we have more and more customisable options, the configuration screen was rework to be clearer and more organised by introducing tabs."
      }
    ],
    bugfixes: [
      {
        desc: "SSH slave link: fixed issue on configuration file generation side",
      },
      {
        desc: "AWS switch button : close extension popup after clicking on AWS switch button."
      }
    ]
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
