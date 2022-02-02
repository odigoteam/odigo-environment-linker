$(document).ready(() => {
    renderer.displayComponent(Renderer.COMPONENT_LOADER);
    $.get("/manifest.json", function(manifest) {
            configuration.currentExtensionVersion = manifest.version;
            configuration.load(function() {
                renderer.setTheme();
                setTimeout(() => {
                    renderer.initHandlers();
                    // Get configuration from URL
                    if(!configuration.configurationURL || configuration.configurationURL === "" || configuration.configurationURL.indexOf("https://") < 0) {
                        renderer.displayComponent(Renderer.COMPONENT_NO_CONFIG);
                        return;
                    }
                    renderer.loadConfiguration();
                    tabsObject.query({
                        active: true,
                        lastFocusedWindow: true
                    }, tabs => {
                        configuration.currentTab.id = tabs[0].id;
                        try {
                            configuration.currentTab.url = new URL(tabs[0].url);
                            if (configuration.currentTab.url.host.endsWith('.aws.amazon.com')
                                || configuration.currentTab.url.host.endsWith('.amazonaws-us-gov.com')
                                || configuration.currentTab.url.host.endsWith('.amazonaws.cn')) {
                                configuration.isCurrentTabAws = true;
                                awsRoleSwitcher.executeAction(configuration.currentTab.id, 'loadInfo', {}).then(userInfo => {});
                            }
                        } catch(e) {
                            configuration.currentTab.url = "";
                        }

                        configuration.getEnvConf(function () {
                            renderer.loadEnvironments();
                            renderer.refreshEnvironmentsList();
                            renderer.displayReleaseNote();
                        });
                    });
                }, 500);
            });
    });
});
