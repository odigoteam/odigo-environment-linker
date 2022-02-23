export class Module {
  internal: string = "";
  external: string = "";
  master: string = "";
  slave: string = "";
  display: boolean = false;
  showExternal: boolean = false;
}

export class PaaSUrls {
  publisher: Module = new Module();
  store: Module = new Module();
}

export class EnvUrls {
  console: Module = new Module();
  healthCheck: Module = new Module();
  portal: Module = new Module();
  pif: PaaSUrls = new PaaSUrls();
  pef: PaaSUrls = new PaaSUrls();
  routing: Module = new Module();
  cmdb: Module = new Module();
  ssh: Module = new Module();
}

export class AwsEnv {
  accountId: number = 0;
  display: boolean = false;
  enabled: boolean = false;
}

export class Client {
  id: string = "";
  site: string = "";
  env: string = "";
  clusterId: string = "";
}

export class Environment {
  displayed: boolean = true;
  env: string = "";
  type: string = "";
  name: string = "";
  logo: string = "odigo-dark.png";
  provider: string = "";
  client: Client = new Client();
  aws: AwsEnv = new AwsEnv();
  occVersion: string = "";
  domain: string = "";
  urls: EnvUrls = new EnvUrls();
  badgeType: string = "";
  tshirtSize: string = "";
}

export class Jenkins {
  baseUrl: string = "";
  updateCmdbJob : string = "";
  parameters : Record<string,any> = {};
}


export class Environments {
  environmentsVersion: number = 0;
  latestExtensionVersion: string = "";
  jenkins: Jenkins = new Jenkins();
  environments: Environment[] = [];
}
