export const environment = {
  production: false,
  configurationUrlPattern : "https:\/\/.+\/raw\/(master|develop)\/configuration\.json",
  githubUrl: "https://github.com/guitaro/odigo-environment-linker/tree/master",
  changelogUrl: "https://github.com/guitaro/odigo-environment-linker/blob/master/CHANGELOG.MD",
  issueUrl: "https://github.com/guitaro/odigo-environment-linker/issues",
  slackUrl: "https://odigo.slack.com/team/UHQ0QQSBT",
  releaseNote: {
    title: "TODO",
    features: [
      {
        shortDesc: "Create your own custom links",
        longDesc: "Yes, you haven't visual disturbances. Create your own links which will be present for each environments. And cherry on the cake, you can add some variables in your URLs like client id, the cloud provider and many more !"
      }
    ],
    changes: [],
    bugfixes: []
  }
};
