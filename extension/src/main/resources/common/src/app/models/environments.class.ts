export class Module {
  internal: string | undefined;
  external: string | undefined;
  master: string | undefined;
  slave: string | undefined;
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

export class Environment {
  env: string | undefined;
  type: string | undefined;
  name: string | undefined;
  logo: string = "odigo-dark.png";
  provider: string | undefined;
  aws: AwsEnv = new AwsEnv();
  occVersion: string | undefined;
  domain: string | undefined;
  urls: EnvUrls = new EnvUrls();
  badgeType: string = "";
}

export class Environments {
  environmentsVersion: number = 0;
  latestExtensionVersion: string = "";
  environments: Environment[] = [];
}
