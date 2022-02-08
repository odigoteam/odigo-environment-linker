import {EnvDisplayOptions} from "./env-display-options.class";
import {EnvUrls} from "./env-urls.class";
import {AwsEnv} from "./aws-env.class";

export class Environment {
  env: string | undefined;
  type: string | undefined;
  name: string | undefined;
  logo: string = "odigo-dark.png";
  provider: string | undefined;
  aws: AwsEnv | undefined;
  occVersion: string | undefined;
  domain: string | undefined;
  urls: EnvUrls | undefined;
  displayOptions: EnvDisplayOptions | undefined;
}
