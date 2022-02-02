class Renderer {
    static COMPONENT_LOADER = 1;
    static COMPONENT_NO_CONFIG = 2;
    static COMPONENT_ERROR = 3;
    static COMPONENT_ENV_SECTION = 4;
    static COMPONENT_SEARCH = 5;
    static COMPONENT_CONFIGURATION = 6;
    static COMPONENT_INFO = 7;
    static COMPONENT_ENV_LIST = 8;
    static COMPONENT_NO_RESULT = 9;
    static COMPONENT_RELEASE_NOTE = 10;

    displayComponent(componentId) {
        let loadingSection = $('#loading-section');
        let releaseNote = $('#release-note');
        let noConfigSection = $('#no-config-section');
        let errorSection = $('#error-section');
        let infoSection = $('#info-section');
        let envsSection = $('#envs-section');
        let envList = $('#accordion');
        let noResult = $('#no-result');
        let searchSection = $('#search-section');
        let configSection = $('#config-section');
        let configOpenBtn = $('.configOpenBtn');
        let configCloseBtn = $('#configCloseBtn');

        // Hide all elements
        loadingSection.hide();
        noConfigSection.hide();
        releaseNote.hide();
        errorSection.hide();
        infoSection.hide();
        envsSection.hide();
        envList.hide();
        noResult.hide();
        searchSection.hide();
        configSection.hide();
        configOpenBtn.show();
        configCloseBtn.hide();

        // Display only requested elements
        switch (componentId) {
            case Renderer.COMPONENT_LOADER:
                loadingSection.show();
                break;
            case Renderer.COMPONENT_NO_CONFIG:
                noConfigSection.show();
                break;
            case Renderer.COMPONENT_ERROR:
                errorSection.show();
                break;
            case Renderer.COMPONENT_INFO:
                infoSection.show();
                break;
            case Renderer.COMPONENT_ENV_SECTION:
            case Renderer.COMPONENT_ENV_LIST:
            case Renderer.COMPONENT_SEARCH:
                searchSection.show();
                envsSection.show();
                envList.show();
                break;
            case Renderer.COMPONENT_NO_RESULT:
                searchSection.show();
                envsSection.show();
                envList.show();
                noResult.show();
                break;
            case Renderer.COMPONENT_CONFIGURATION:
                configSection.show();
                configOpenBtn.hide();
                configCloseBtn.show();
                break;
            case Renderer.COMPONENT_RELEASE_NOTE:
                configOpenBtn.hide();
                releaseNote.show();
                break;
            default:
                break;
        }
    }

    createEnvItem(env) {
        $('#accordion').append(this.buildEnvItem(env));
        if(env.urls.console && (env.urls.console.internal || env.urls.console.external)) {
            $('#' + env.env.toUpperCase() + env.type.toUpperCase() + '-console-internal').click(() => {
                tabsObject.create({url: env.urls.console.internal});
            });
            $('#' + env.env.toUpperCase() + env.type.toUpperCase() + '-console-external').click(() => {
                tabsObject.create({url: env.urls.console.external});
            });
        }
        if(env.urls.healthCheck && (env.urls.healthCheck.internal || env.urls.healthCheck.external)) {
            $('#' + env.env.toUpperCase() + env.type.toUpperCase() + '-healthcheck-internal').click(() => {
                tabsObject.create({url: env.urls.healthCheck.internal});
            });
            $('#' + env.env.toUpperCase() + env.type.toUpperCase() + '-healthcheck-external').click(() => {
                tabsObject.create({url: env.urls.healthCheck.external});
            });
        }
        if(env.urls.routing && (env.urls.routing.internal || env.urls.routing.external)) {
            $('#' + env.env.toUpperCase() + env.type.toUpperCase() + '-routing-internal').click(() => {
                tabsObject.create({url: env.urls.routing.internal});
            });
            $('#' + env.env.toUpperCase() + env.type.toUpperCase() + '-routing-external').click(() => {
                tabsObject.create({url: env.urls.routing.external});
            });
        }
        if(env.urls.portal && (env.urls.portal.internal || env.urls.portal.external)) {
            $('#' + env.env.toUpperCase() + env.type.toUpperCase() + '-portal-internal').click(() => {
                tabsObject.create({url: env.urls.portal.internal});
            });
            $('#' + env.env.toUpperCase() + env.type.toUpperCase() + '-portal-external').click(() => {
                tabsObject.create({url: env.urls.portal.external});
            });
        }
        if(env.urls.pif && env.urls.pif.publisher && (env.urls.pif.publisher.internal || env.urls.pif.publisher.external)) {
            $('#' + env.env.toUpperCase() + env.type.toUpperCase() + '-pif-pub-internal').click(() => {
                tabsObject.create({url: env.urls.pif.publisher.internal});
            });
        }
        if(env.urls.pif && env.urls.pif.store && (env.urls.pif.store.internal || env.urls.pif.store.external)) {
            $('#' + env.env.toUpperCase() + env.type.toUpperCase() + '-pif-store-internal').click(() => {
                tabsObject.create({url: env.urls.pif.store.internal});
            });
        }
        if(env.urls.pef && env.urls.pef.publisher && (env.urls.pef.publisher.internal || env.urls.pef.publisher.external)) {
            $('#' + env.env.toUpperCase() + env.type.toUpperCase() + '-pef-pub-internal').click(() => {
                tabsObject.create({url: env.urls.pef.publisher.internal});
            });
        }
        if(env.urls.pef && env.urls.pef.store && (env.urls.pef.store.internal || env.urls.pef.store.external)) {
            $('#' + env.env.toUpperCase() + env.type.toUpperCase() + '-pef-store-internal').click(() => {
                tabsObject.create({url: env.urls.pef.store.internal});
            });
            $('#' + env.env.toUpperCase() + env.type.toUpperCase() + '-pef-store-external').click(() => {
                tabsObject.create({url: env.urls.pef.store.external});
            });
        }
        if(env.urls.cmdb) {
            if(env.urls.cmdb.master) {
                $('#' + env.env.toUpperCase() + env.type.toUpperCase() + '-cmdb-master').click(() => {
                    tabsObject.create({url: env.urls.cmdb.master + configuration.getUserOption("cmdbFileType")});
                });
            }
            if(env.urls.cmdb.slave) {
                $('#' + env.env.toUpperCase() + env.type.toUpperCase() + '-cmdb-slave').click(() => {
                    tabsObject.create({url: env.urls.cmdb.slave + configuration.getUserOption("cmdbFileType")});
                });
            }
        }
        if(env.urls.ssh) {
            if(env.urls.ssh.master) {
                $('#' + env.env.toUpperCase() + env.type.toUpperCase() + '-ssh-master').click(() => {
                    tabsObject.create({url: env.urls.ssh.master});
                });
            }
            if(env.urls.ssh.slave) {
                $('#' + env.env.toUpperCase() + env.type.toUpperCase() + '-ssh-slave').click(() => {
                    tabsObject.create({url: env.urls.ssh.slave});
                });
            }
        }

        $('#' + env.env.toUpperCase() + env.type.toUpperCase() + '-aws-console').click(() => {
            const {url, region, notGlobal} = awsRoleSwitcher.getCurrentUrlAndRegion(configuration.currentTab.url);
            let data = {
                profile: env.env,
                account: env.aws.accountId,
                color: "ff3466",
                roleName: configuration.getAWSOption("role"),
                displayName: env.env + " (" + env.name + ")",
                redirectUri: awsRoleSwitcher.createRedirectUri(url, region, configuration.getAWSOption("region")),
                search: env.env.toLowerCase() + ' ' + env.aws.accountId
            };
            if (notGlobal) {
                data.actionSubdomain = region;
            }
            awsRoleSwitcher.sendSwitchRole(configuration.currentTab.id,  data);
        });
    }

    buildEnvItem(env) {
        switch(env.type) {
            case "PROD":
                env.badgeType = "danger";
                break;
            case "PREPROD":
                env.badgeType = "warning text-dark";
                break;
            case "QA":
                env.badgeType = "info";
                break;
            case "INT":
                env.badgeType = "success";
                break;
            case "DEV":
                env.badgeType = "dark";
                break;
            default:
                env.badgeType = "secondary text-dark";
                break;
        }

        if(!_.isNil(env.logo) && env.logo.endsWith("roROhcV3Mjv+RWlIxJHHfX/DnyPH4+X9PYAAAAASUVORK5CYII=") && configuration.getUserOption("darkTheme")) {
            env.logo = "images/odigo-white.png";
        } else if(env.logo === "images/odigo-white.png" && !configuration.getUserOption("darkTheme")) {
            env.logo = "images/odigo-dark.png";
        } else if(env.logo === "images/odigo-dark.png" && configuration.getUserOption("darkTheme")) {
            env.logo = "images/odigo-white.png";
        }

        if(!_.isNil(env.urls.console)) {
            env.urls.console.hasUrls = (!_.isNil(env.urls.console.internal) || !_.isNil(env.urls.console.external));
            env.urls.console.hasExternalUrl = (!_.isNil(env.urls.console.external) && configuration.getUserOption("externalLinks"));
        } else {
            env.urls.console = {
                hasUrls: false,
                hasStoreExternalUrl: false
            };
        }

        if(!_.isNil(env.urls.healthCheck)) {
            env.urls.healthCheck.hasUrls = (!_.isNil(env.urls.healthCheck.internal) || !_.isNil(env.urls.healthCheck.external));
            env.urls.healthCheck.hasExternalUrl = (!_.isNil(env.urls.healthCheck.external) && configuration.getUserOption("externalLinks"));
        }

        if(!_.isNil(env.urls.portal)) {
            env.urls.portal.hasUrls = (!_.isNil(env.urls.portal.internal) || !_.isNil(env.urls.portal.external));
            env.urls.portal.hasExternalUrl = (!_.isNil(env.urls.portal.external) && configuration.getUserOption("externalLinks"));
        } else {
            env.urls.portal = {
                hasUrls: false,
                hasStoreExternalUrl: false
            };
        }

        if(!_.isNil(env.urls.routing)) {
            env.urls.routing.hasUrls = (!_.isNil(env.urls.routing.internal) || !_.isNil(env.urls.routing.external));
            env.urls.routing.hasExternalUrl = (!_.isNil(env.urls.routing.external) && configuration.getUserOption("externalLinks"));
        } else {
            env.urls.routing = {
                hasUrls: false,
                hasStoreExternalUrl: false
            };
        }

        if(!_.isNil(env.urls.pef)) {
            env.urls.pef.hasUrls = !_.isNil(env.urls.pef) && ((!_.isNil(env.urls.pef.publisher) && !_.isNil(env.urls.pef.publisher.internal)) || (!_.isNil(env.urls.pef.store) && !_.isNil(env.urls.pef.store.internal)));
            env.urls.pef.hasStoreExternalUrl = !_.isNil(env.urls.pef) && !_.isNil(env.urls.pef.store) && !_.isNil(env.urls.pef.store.external) && configuration.getUserOption("externalLinks");
        } else {
            env.urls.pef = {
                hasUrls: false,
                hasStoreExternalUrl: false
            };
        }

        if(!_.isNil(env.urls.pif)) {
            env.urls.pif.hasUrls = !_.isNil(env.urls.pif) && ((!_.isNil(env.urls.pif.publisher) && !_.isNil(env.urls.pif.publisher.internal)) || (!_.isNil(env.urls.pif.store) && !_.isNil(env.urls.pif.store.internal)));
        } else {
            env.urls.pif = {
                hasUrls: false
            };
        }

        if(!_.isNil(env.urls.cmdb)) {
            env.urls.cmdb.hasUrls = (!_.isNil(env.urls.cmdb.master) || !_.isNil(env.urls.cmdb.slave));
        } else {
            env.urls.cmdb = {
                hasUrls: false
            };
        }

        if(!_.isNil(env.urls.ssh)) {
            env.urls.ssh.hasUrls = (!_.isNil(env.urls.ssh.master) || !_.isNil(env.urls.ssh.slave));
        } else {
            env.urls.ssh = {
                hasUrls: false
            };
        }

        env.isAWSEnv = (env.provider === "AWS");
        env.displayAWSConsoleLink = (env.provider === "AWS") && configuration.getDisplayOption("aws");
        env.isAWSConsoleLinkEnabled = configuration.isCurrentTabAws;
        env.userOptions = configuration.options;
        let envItemTemplate = $("#envItemTemplate").html();
        return Mustache.render(envItemTemplate, env);
    }

    render() {
        let button = $('.accordion-button');
        button.addClass("collapsed");
        button.prop("aria-expanded", "false");
        $('.accordion-collapse').removeClass("show");
        configuration.environments.forEach(function( value ) {
            let env = $('div[env=\'' + value.env + value.type + '\']');
            if(value.display) {
                env.show();
            } else {
                env.hide();
            }
        });
    }

    loadConfiguration() {
        if(configuration.configurationURL && configuration.configurationURL !== "") {
            $('#configURL').val(configuration.configurationURL);
        }
        // Initialize filters
        $('#filterDEV').prop("checked", configuration.getFilterOption("dev"));
        $('#filterINT').prop("checked", configuration.getFilterOption("int"));
        $('#filterQUA').prop("checked", configuration.getFilterOption("qa"));
        $('#filterPREPROD').prop("checked", configuration.getFilterOption("preprod"));
        $('#filterPROD').prop("checked", configuration.getFilterOption("prod"));
        $('#filterAWS').prop("checked", configuration.getFilterOption("aws"));
        $('#filterOthers').prop("checked", configuration.getFilterOption("others"));
        this.refreshVersionFilters();
        // Initialize radios
        $('#displayConsole').prop("checked", configuration.getDisplayOption("console"));
        $('#displayHealthCheck').prop("checked", configuration.getDisplayOption("healthCheck"));
        $('#displayPortal').prop("checked", configuration.getDisplayOption("portal"));
        $('#displayPIF').prop("checked", configuration.getDisplayOption("pif"));
        $('#displayPEF').prop("checked", configuration.getDisplayOption("pef"));
        $('#displayRouting').prop("checked", configuration.getDisplayOption("routing"));
        $('#displayConfiguration').prop("checked", configuration.getDisplayOption("cmdb"));
        $('#displaySsh').prop("checked", configuration.getDisplayOption("ssh"));
        $('#displayLogo').prop("checked", configuration.getDisplayOption("logo"));
        $('#displayVersion').prop("checked", configuration.getDisplayOption("version"));
        $('#displayClientName').prop("checked", configuration.getDisplayOption("clientName"));
        $('#displayClientDomain').prop("checked", configuration.getDisplayOption("clientDomain"));
        $('#showExternalLinks').prop("checked", configuration.getUserOption("externalLinks"));
        $('#cmdbFileType').prop("value", configuration.getUserOption("cmdbFileType"));
        $('#useExtendedSearch').prop("checked", configuration.getUserOption("extendedSearch"));
        $('#showOnlyLinksIcons').prop("checked", configuration.getUserOption("onlyIcons"));
        $('#themeSelector').prop("checked", configuration.getUserOption("darkTheme"));
        $('#displayAWSConsole').prop("checked", configuration.getDisplayOption("aws"));
        $('#awsRole').val(configuration.getAWSOption("role"));
    }

    initHandlers() {
        $('.configOpenBtn').click(() => {
            renderer.loadConfiguration();
            renderer.displayComponent(Renderer.COMPONENT_CONFIGURATION);
        });

        $('#configCloseBtn').click(() => {
            renderer.displayComponent(Renderer.COMPONENT_LOADER);
            if(!configuration.configurationURL || configuration.configurationURL === "" || configuration.configurationURL.indexOf("https://") < 0) {
                renderer.displayComponent(Renderer.COMPONENT_NO_CONFIG);
            } else {
                configuration.getEnvConf(function () {
                    renderer.loadEnvironments();
                    renderer.refreshEnvironmentsList();
                });
            }
        });

        $('#close-release-note').click(() => {
            configuration.latestExtensionVersionUsed = configuration.currentExtensionVersion;
            configuration.save();
            renderer.displayComponent(Renderer.COMPONENT_ENV_LIST);
        });

        $('#clear-search').click(() => {
            if(configuration.search && configuration.search !== "") {
                configuration.search = "";
                $('#search').val(configuration.search);
                configuration.save();
                renderer.refreshEnvironmentsList();
            }
        });

        $('#filterDEV').click(() => {
            configuration.setFilterOption("dev", $('#filterDEV').prop("checked"))
            configuration.save();
            renderer.refreshEnvironmentsList();
        });
        $('#filterINT').click(() => {
            configuration.setFilterOption("int", $('#filterINT').prop("checked"))
            configuration.save();
            renderer.refreshEnvironmentsList();
        });
        $('#filterQUA').click(() => {
            configuration.setFilterOption("qa", $('#filterQUA').prop("checked"))
            configuration.save();
            renderer.refreshEnvironmentsList();
        });
        $('#filterPREPROD').click(() => {
            configuration.setFilterOption("preprod", $('#filterPREPROD').prop("checked"))
            configuration.save();
            renderer.refreshEnvironmentsList();
        });
        $('#filterPROD').click(() => {
            configuration.setFilterOption("prod", $('#filterPROD').prop("checked"))
            configuration.save();
            renderer.refreshEnvironmentsList();
        });
        $('#filterAWS').click(() => {
            configuration.setFilterOption("aws", $('#filterAWS').prop("checked"));
            configuration.save();
            renderer.refreshEnvironmentsList();
        });
        $('#filterOthers').click(() => {
            configuration.setFilterOption("others", $('#filterOthers').prop("checked"));
            configuration.save();
            renderer.refreshEnvironmentsList();
        });
        $(".versionFilterCheck").click((handler) => {
            if(handler.target.dataset.versionFilterValue === "all" && handler.target.checked) {
                configuration.setFilterOption("versions", [...configuration.supportedOccVersions]);
            } else {
                // Remove all option
                const index = configuration.getFilterOption("versions").indexOf("all");
                if (index > -1) {
                    configuration.getFilterOption("versions").splice(index, 1);
                }
                if(handler.target.checked) {
                    if(!configuration.getFilterOption("versions").includes(handler.target.dataset.versionFilterValue)) {
                        configuration.getFilterOption("versions").push(handler.target.dataset.versionFilterValue);
                    }
                    if(configuration.getFilterOption("versions").length === (configuration.supportedOccVersions.length -1)) {
                        configuration.getFilterOption("versions").push("all");
                    }
                } else {
                    const index = configuration.getFilterOption("versions").indexOf(handler.target.dataset.versionFilterValue);
                    if (index > -1) {
                        configuration.getFilterOption("versions").splice(index, 1);
                    }
                }
            }

            configuration.save();
            renderer.refreshVersionFilters();
        });
        $('#versionFilterDropdown').on('hide.bs.dropdown', function () {
            renderer.refreshEnvironmentsList();
        })

        $('#displayConsole').click(() => {
            configuration.setDisplayOption("console", $('#displayConsole').prop("checked"))
            configuration.save();
            renderer.refreshEnvironmentsList();
        });
        $('#displayHealthCheck').click(() => {
            configuration.setDisplayOption("healthCheck", $('#displayHealthCheck').prop("checked"))
            configuration.save();
            renderer.refreshEnvironmentsList();
        });
        $('#displayPortal').click(() => {
            configuration.setDisplayOption("portal", $('#displayPortal').prop("checked"))
            configuration.save();
            renderer.refreshEnvironmentsList();
        });
        $('#displayPIF').click(() => {
            configuration.setDisplayOption("pif", $('#displayPIF').prop("checked"))
            configuration.save();
            renderer.refreshEnvironmentsList();
        });
        $('#displayPEF').click(() => {
            configuration.setDisplayOption("pef", $('#displayPEF').prop("checked"))
            configuration.save();
            renderer.refreshEnvironmentsList();
        });
        $('#displayRouting').click(() => {
            configuration.setDisplayOption("routing", $('#displayRouting').prop("checked"))
            configuration.save();
            renderer.refreshEnvironmentsList();
        });
        $('#displayConfiguration').click(() => {
            configuration.setDisplayOption("cmdb", $('#displayConfiguration').prop("checked"))
            configuration.save();
            renderer.refreshEnvironmentsList();
        });
        $('#displaySsh').click(() => {
            configuration.setDisplayOption("ssh", $('#displaySsh').prop("checked"))
            configuration.save();
            renderer.refreshEnvironmentsList();
        });
        $('#displayLogo').click(() => {
            configuration.setDisplayOption("logo", $('#displayLogo').prop("checked"))
            configuration.save();
            renderer.refreshEnvironmentsList();
        });
        $('#displayVersion').click(() => {
            configuration.setDisplayOption("version", $('#displayVersion').prop("checked"))
            configuration.save();
            renderer.refreshEnvironmentsList();
        });
        $('#displayClientName').click(() => {
            configuration.setDisplayOption("clientName", $('#displayClientName').prop("checked"))
            configuration.save();
            renderer.refreshEnvironmentsList();
        });
        $('#displayClientDomain').click(() => {
            configuration.setDisplayOption("clientDomain", $('#displayClientDomain').prop("checked"))
            configuration.save();
            renderer.refreshEnvironmentsList();
        });
        $('#showExternalLinks').click(() => {
            configuration.setUserOption("externalLinks", $('#showExternalLinks').prop("checked"));
            configuration.save();
            renderer.refreshEnvironmentsList();
        });
        $('#cmdbFileType').on('change', function() {
            configuration.setUserOption("cmdbFileType", this.value)
            configuration.save();
            renderer.refreshEnvironmentsList();
        });
        $('#useExtendedSearch').click(() => {
            configuration.setUserOption("extendedSearch", $('#useExtendedSearch').prop("checked"))
            configuration.save();
            renderer.refreshEnvironmentsList();
        });
        $('#showOnlyLinksIcons').click(() => {
            configuration.setUserOption("onlyIcons", $('#showOnlyLinksIcons').prop("checked"))
            configuration.save();
            renderer.refreshEnvironmentsList();
        });
        $('#themeSelector').click(() => {
            configuration.setUserOption("darkTheme", $('#themeSelector').prop("checked"))
            configuration.save();
            renderer.setTheme();
            renderer.refreshEnvironmentsList();
        });
        $('#displayAWSConsole').click(() => {
            configuration.setDisplayOption("aws", $('#displayAWSConsole').prop("checked"))
            configuration.save();
            renderer.setTheme();
            renderer.refreshEnvironmentsList();
        });

        $('#configURL').keyup(() => {
            let validation = configuration.validateConfigURL();
            $("#configURLError").html(validation.message);
            if(!validation.hasError) {
                configuration.save();
                $('#configCloseBtn').prop("disabled", false);
            } else {
                $('#configCloseBtn').prop("disabled", true);
            }
        });

        $('#search').keyup(function() {
            configuration.search = $('#search').val().trim();
            configuration.save();
            renderer.refreshEnvironmentsList();
        });

        $('#awsRole').keyup(() => {
            let role = $("#awsRole").val();
            if (role && role !== "" ) {
                configuration.setAWSOption("role", role);
                configuration.save();
                $('#configCloseBtn').prop("disabled", false);
            } else {
                $("#awsRoleError").html("AWS Role cannot be empty.");
                $('#configCloseBtn').prop("disabled", true);
            }
        });
    }

    refreshVersionFilters() {
        $('[data-version-filter-value]').each((index, elem) => {
            $(elem).prop("checked", configuration.getFilterOption("versions").includes($(elem).attr("data-version-filter-value")));
        });
    }

    loadEnvironments(callback) {
        $('#search').val(configuration.search);
        $('#accordion').empty();
        configuration.environments.forEach(function(env) {
            renderer.createEnvItem(env);
        });

        $('[data-toggle="tooltip"]').tooltip({
            html:true,
            placement:'auto',
            fallbackPlacements: ['bottom']
        });
        renderer.displayComponent(Renderer.COMPONENT_ENV_SECTION);
    }

    refreshEnvironmentsList() {
        configuration.numberOfResult = 0;
        if (utils.isNotEmpty(configuration.search)) {
            configuration.environments.forEach(env => {
                env.display = searcher.matchWithSearch(env, configuration.search) && searcher.matchWithFilters(env)
                if(env.display) {
                    configuration.numberOfResult++;
                }
            });
            if (utils.nothingDisplayed(configuration.environments)) {
                if(configuration.getUserOption("extendedSearch")) {
                    searcher.searchExtended();
                } else {
                    searcher.searchStrict();
                }
            }
        } else {
            configuration.environments.forEach(env => {
                env.display = searcher.matchWithFilters(env)
                if(env.display) {
                    configuration.numberOfResult = configuration.numberOfResult +1;
                }
            });
        }
        $('#nbResults').html(configuration.numberOfResult);
        $('#totalEnvs').html(configuration.environments.length);
        renderer.render();

        $('#search').focus();
    }

    setTheme() {
        // Set Theme
        let body = $('body');
        if (configuration.getUserOption("darkTheme")) {
            body.removeClass("theme-light");
            body.addClass("theme-dark");
        } else {
            body.removeClass("theme-dark");
            body.addClass("theme-light");
        }
    }

    displayReleaseNote() {
        if(configuration.latestExtensionVersionUsed !== configuration.currentExtensionVersion) {
            renderer.displayComponent(Renderer.COMPONENT_RELEASE_NOTE);
        }
    }
}

const renderer = new Renderer();