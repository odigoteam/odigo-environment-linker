export const environment = {
  production: false,
  configurationUrlPattern : "https:\/\/.+\/raw\/(master|develop)\/configuration\.json",
  githubUrl: "https://github.com/guitaro/odigo-environment-linker/tree/master",
  changelogUrl: "https://github.com/guitaro/odigo-environment-linker/blob/master/CHANGELOG.MD",
  issueUrl: "https://github.com/guitaro/odigo-environment-linker/issues",
  slackUrl: "https://odigo.slack.com/team/UHQ0QQSBT",
  vpnCheckingUrl: "https://vmw-git.internal.odigo.cloud/",
  releaseNote: {
    title: "Happy women's day Ladies !",
    features: [
      {
        shortDesc: "Custom links",
        longDesc: "Create your own links for each environments. Enrich them with variables related to each environments, amazing..."
      },
      {
        shortDesc: "Hub link for env with version &geq; 6.0",
        longDesc: "Add the Hud link to the list of all existing buttons."
      },
      {
        shortDesc: "Add 6.0 to version filter dropdown",
        longDesc: "The brand new version was not present in the versions filter list ! That was unacceptable. But know, we can relax and select the 6.0 version in the filters."
      }
    ],
    changes: [
      {
        shortDesc: "Purple color for #IWD2022",
        longDesc: "To celebrate the International women day, the purple color is apply on extension."
      },
      {
        shortDesc: "Change CMDB file type option select to Bootstrap dropdown component",
        longDesc: "New look for the select input of preferred CMDB file type in configuration panel."
      },
      {
        shortDesc: "Change AWS logo",
        longDesc: "A new stylized, sexy and beautiful AWS logo."
      },
      {
        shortDesc: "Add logos to each component in configuration panel.",
        longDesc: "In Appearance tab, all component are associated to their own logos. It will help you to recognize component only by the pict. Or not. Anyway it's cooler than before !"
      }
    ],
    bugfixes: [
      {
        desc: "Fix grammatical errors in messages",
      },
      {
        desc: "Fix grammatical errors in messages",
      },
      {
        desc: "Fix CSS background issue with url checker icon",
      },
      {
        desc: "AWS button is not disabled if tab is not AWS console",
      },
      {
        desc: "Improve VPN connection checking",
      },
      {
        desc: "CSS for version filter badge",
      }
    ]
  }
};
