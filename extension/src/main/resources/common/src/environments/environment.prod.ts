export const environment = {
  production: true,
  releaseNote: {
    title: "Time to power up ! <i class=\"bi bi-lightning-charge-fill\"></i>\n",
    features: [
      {
        shortDesc: "Rewrite plugin in Angular 13",
        longDesc: "Improve structure and architecture for a better project adaptability, Angular will boost the future releases developments and minimize bugs creation with a collection of well-integrated libraries that cover a wide variety of functionality including routing, form handling, client-server communication, and more"
      },
      {
        shortDesc: "New design",
        longDesc: "For this major improvement, I hope you'll like that new design!"
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
