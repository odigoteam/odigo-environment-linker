export const environment = {
  production: false,
  configurationUrlPattern : "https:\/\/.+\/raw\/(master|develop)\/configuration\.json",
  githubUrl: "https://github.com/guitaro/odigo-environment-linker/tree/master",
  changelogUrl: "https://github.com/guitaro/odigo-environment-linker/blob/master/CHANGELOG.MD",
  issueUrl: "https://github.com/guitaro/odigo-environment-linker/issues",
  slackUrl: "https://odigo.slack.com/team/UHQ0QQSBT",
  releaseNote: {
    title: "Ha Ha Ha Ha Staying alive ! <i class=\"bi bi-music-note-beamed\"></i> Nightclubs are reopened in France ! And to celebrate the good time (Come on !), here's some dance-floor improvements just for you. <i class=\"bi bi-boombox-fill\"></i>",
    features: [
      {
        shortDesc: "About view",
        longDesc: "All information about this extension all sumed up in one view ! You'll find in it : <br/><ul><li>the extension version</li><li>build number</li>" +
          "<li>the used technologies and their versions</li><li>link to sources</li><li>Issue reporting link</li><li>Change Log</li></ul>"
      },
      {
        shortDesc: "Configuration URL checker (by http request)",
        longDesc: "When you change or set a configuration URL, it's checked immediately by an HTTP request."
      },
      {
        shortDesc: "T-Shirt size info per environments",
        longDesc: "You can add a badge on each environments which display the T-Shirt size of it. This feature is disabled by default."
      },
      {
        shortDesc: "Update CMDB link",
        longDesc: "New link to Update CMDB with Jenkins OAM Job (<u>01-CreateUpdateCustomCMDB-Step1</u>). And because you're amazing people and to thank you for using this extension, the vars <b>CLIENT_ID</b>, <b>CLIENT_SITE</b>, <b>CLIENT_CLUSTERID</b> and <b>CLIENT_ENV</b> will be pre-filled for you !"
      },
      {
        shortDesc: "Reset filters button",
        longDesc: "You can reinitialise your filter quickly by a simple click on this new button."
      }
    ],
    changes: [
      {
        shortDesc: "Rewording"
      },
      {
        shortDesc: "Redesign configuration view",
        longDesc: "Some improvement on design and reorganisation of elements to group them for a better readability."
      },
      {
        shortDesc: "Details in configuration on each options",
        longDesc: "Small infos on configuration options to explain each options."
      },
      {
        shortDesc: "AWS role switch : the color of role",
        longDesc: "The role color becomes the environment type color (DEV, INT, QUA, PREPROD, PROD, Other)."
      }
    ],
    bugfixes: []
  }
};
