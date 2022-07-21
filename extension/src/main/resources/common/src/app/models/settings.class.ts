export class BrowserTab {
  id: number = -1;
  url: URL = new URL("https://google.com");
}

export class AWSOptions {
  role: string = "UserGlobalReadOnlyRole";
  region: string = "eu-west-3";
}

export class UserDisplayOptions {
  aws: boolean = false;
  console: boolean = true;
  healthCheck: boolean = true;
  hub: boolean = true;
  portal: boolean = true;
  pif: boolean = true;
  pef: boolean = true;
  routing: boolean = true;
  cmdb: boolean = true;
  ssh: boolean = false;
  logo: boolean = true;
  version: boolean = true;
  clientName: boolean = true;
  clientDomain: boolean = true;
  clusterID: boolean = false;
  cxStudio: boolean = false;
  qualificationCenter: boolean = false;
}

export class UserOptions {
  display: UserDisplayOptions = new UserDisplayOptions();
  extendedSearch: boolean = false;
  externalLinks: boolean = false
  cmdbFileType: string = ".env";
  onlyIcons: boolean = false;
  darkTheme: boolean = false;
  aws: AWSOptions = new AWSOptions();
  jenkinsLinks: boolean = false;
  tShirtSizes: boolean = false;
}

export class FiltersOptions {
  dev: boolean = true;
  int: boolean = true;
  qa: boolean = true;
  prod: boolean = true;
  preprod: boolean = true;
  aws: string = "mixed";
  others: boolean = true;
  versions: string[] = ["all", "6.0", "5.10", "5.9", "5.8", "5.7", "5.6", "5.4", "5.3", "5.1"];
}

export class ExtensionConfiguration {
  latestExtensionVersionUsed: string = "";
  confURL : string = "";
  search : string = "";
}

export class UserConfiguration {
  extensionConfiguration : ExtensionConfiguration = new ExtensionConfiguration();
  userOptions: UserOptions = new UserOptions();
  filterOptions : FiltersOptions = new FiltersOptions();
}

export class Settings {
  isCurrentTabAws: boolean = false;
  currentExtensionVersion: string = "";
  supportedOccVersions: string[] = ["all", "6.0", "5.10", "5.9", "5.8", "5.7", "5.6", "5.4", "5.3", "5.1"];
  currentTab: BrowserTab = new BrowserTab();
  userConfiguration: UserConfiguration = new UserConfiguration();
}
