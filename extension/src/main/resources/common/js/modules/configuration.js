class Configuration {
    environments = [];
    numberOfResult = 0;
    isCurrentTabAws = false;
    currentExtensionVersion = "";
    supportedOccVersions = ["all", "5.10", "5.9", "5.8", "5.7", "5.6", "5.4", "5.3", "5.1", "4.3", "4.1", "3.6"];
    currentTab = {
        id: -1,
        url: ""
    };

    config = {
        latestExtensionVersionUsed: "",
        confURL : "",
        search : "",
        options: {
            display: {
                aws: false,
                console: true,
                healthCheck: true,
                portal: true,
                pif: true,
                pef: true,
                routing: true,
                cmdb: true,
                ssh: false,
                logo: true,
                version: true,
                clientName: true,
                clientDomain: false
            },
            extendedSearch: false,
            externalLinks: false,
            cmdbFileType: ".env",
            onlyIcons: false,
            darkTheme: false,
            aws: {
                role: "UserGlobalReadOnlyRole",
                region: "eu-west-3"
            }
        },
        filters : {
            dev: true,
            int: true,
            qa: true,
            prod: true,
            preprod: true,
            aws: false,
            others: true,
            versions: ["5.10", "5.9", "5.8", "5.7", "5.6", "5.4", "5.3", "5.1"]
        }
    };


    get environments() {
        return this.environments;
    }

    set environments(value) {
        this.environments = value;
    }
    get numberOfResult() {
        return this.numberOfResult;
    }

    set numberOfResult(value) {
        this.numberOfResult = value;
    }

    get isCurrentTabAws() {
        return this.isCurrentTabAws;
    }

    set isCurrentTabAws(value) {
        this.isCurrentTabAws = value;
    }

    get currentTab() {
        return this.currentTab;
    }

    get latestExtensionVersionUsed() {
        return this.config.latestExtensionVersionUsed;
    }

    set latestExtensionVersionUsed(value) {
        this.config.latestExtensionVersionUsed = value;
    }

    get currentExtensionVersion() {
        return this.currentExtensionVersion;
    }

    set currentExtensionVersion(value) {
        this.currentExtensionVersion = value;
    }

    get configurationURL() {
        return this.config.confURL;
    }

    set configurationURL(value) {
        this.config.confURL = value;
    }

    get search() {
        return this.config.search;
    }

    set search(value) {
        this.config.search = value;
    }

    get options() {
        return this.config.options;
    }

    getUserOption(key) {
        return this.config.options[key];
    }

    setUserOption(key, value) {
        this.config.options[key] = value;
    }

    getFilterOption(key) {
        return this.config.filters[key];
    }

    setFilterOption(key, value) {
        this.config.filters[key] = value;
    }

    getDisplayOption(key) {
        return this.config.options.display[key];
    }

    setDisplayOption(key, value) {
        this.config.options.display[key] = value;
    }

    getAWSOption(key) {
        return this.config.options.aws[key];
    }

    setAWSOption(key, value) {
        this.config.options.aws[key] = value;
    }

    load(callback) {
        storage.get('odigoEnvLinker').then(data => {
            if (data.odigoEnvLinker) {
                if(!data.odigoEnvLinker.hasOwnProperty('odigoEnvLinkerConfUrl')) {
                    _.merge(this.config, data.odigoEnvLinker);
                } else {
                    this.config.confURL = data.odigoEnvLinker.odigoEnvLinkerConfUrl;
                    this.config.search = data.odigoEnvLinker.search;
                }
            }
            callback();
        });
    }

    save() {
        storage.set({odigoEnvLinker: this.config}).then(_ => {});
    }

    getEnvConf(callback) {
        // Check conf url
        let validation = this.validateConfigURL();
        if(validation.hasError) {
            $('#error-message').html(validation.message + "<br/><br/><button type=\"button\" class=\"btn btn-link btnGoToConf\" aria-label=\"Update\">Check configuration</button><br/><br/>");
            $('.btnGoToConf').click(() => {
                renderer.displayComponent(Renderer.COMPONENT_CONFIGURATION);
            });
            renderer.displayComponent(Renderer.COMPONENT_ERROR);
            return;
        }
        $.get(this.config.confURL, function(data) {
            let conf = JSON.parse(data);
            configuration.environments = conf.environments;
            callback();
        }).fail(function() {
            renderer.displayComponent(Renderer.COMPONENT_ERROR);
            $('#error-message').html("Oops! Something went wrong...<br>Please check your configuration URL or VPN connection.");
        });
    }

    validateConfigURL() {
        let hasError = false;
        let message = "&nbsp;";
        let confURL = $("#configURL").val();
        if (confURL && confURL !== "" ) {
            if (confURL.indexOf("https://") === 0) {
                if (!confURL.match("https:\/\/.+\/raw\/(master|develop)\/configuration\.json")) {
                    hasError = true;
                    message = "The URL must end with '/raw/master/configuration.json'.";
                } else {
                    this.config.confURL = confURL;
                }
            } else {
                hasError = true;
                message = "The URL must start by 'https://'.";
            }
        } else {
            hasError = true;
            message = "URL cannot be empty.";
        }
        return {
            hasError,
            message
        };
    }
}

const configuration = new Configuration();