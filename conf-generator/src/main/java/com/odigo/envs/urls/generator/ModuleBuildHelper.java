package com.odigo.envs.urls.generator;

import com.odigo.envs.urls.generator.model.PaaS;
import com.odigo.envs.urls.generator.model.ServerUrl;
import com.odigo.envs.urls.generator.model.WebUrl;
import java.io.File;
import java.util.Properties;

/**
 * The type Module build helper.
 */
public class ModuleBuildHelper {


    private static final String PROPERTIES_EXT = ".properties";

    public static final String ODIGO_PROVIDER_NAME = "ODIGO";

    public static final String AWS_PROVIDER_NAME = "AWS";

    private static final String CUSTOM_STRING = "custom";

    private ModuleBuildHelper() {}

    /**
     * Build console urls web url.
     *
     * @param properties the properties
     *
     * @return the web url
     */
    public static WebUrl buildConsoleUrls(final Properties properties) {
        WebUrl consoleUrls = new WebUrl();
        String consoleBaseUrl = (String) properties.getOrDefault("console.base.url", "");
        String urlSuffix = (String) properties.getOrDefault("console.context.path",
                                                            properties.getOrDefault("client.id", "") + "/console");
        if(consoleBaseUrl.contains("|")) {
            consoleUrls.setInternal(Utils.getOrDefault(Utils.buildURL(consoleBaseUrl.split("\\|")[0], urlSuffix), null))
                       .setExternal(Utils.getOrDefault(Utils.buildURL(consoleBaseUrl.split("\\|")[1], urlSuffix), null));
        } else {
            consoleUrls.setInternal(Utils.getOrDefault(Utils.buildURL(consoleBaseUrl, urlSuffix), null));
        }
        return consoleUrls;
    }

    /**
     * Build health check web url.
     *
     * @param properties the properties
     *
     * @return the web url
     */
    public static WebUrl buildHealthCheck(final Properties properties) {
        WebUrl healthCheckUrls = new WebUrl();
        String consoleBaseUrl = (String) properties.getOrDefault("console.base.url", "");
        String urlSuffix = "health.html";
        if(consoleBaseUrl.contains("|")) {
            healthCheckUrls.setInternal(Utils.buildURL(consoleBaseUrl.split("\\|")[0], urlSuffix));
        } else {
            healthCheckUrls.setInternal(Utils.buildURL(consoleBaseUrl, urlSuffix));
        }
        return healthCheckUrls;
    }

    /**
     * Build routing urls web url.
     *
     * @param properties the properties
     *
     * @return the web url
     */
    public static WebUrl buildRoutingUrls(final Properties properties) {
        return new WebUrl()
                .setInternal(Utils.getOrDefault((String) properties.getOrDefault("routing.url.internal", properties.getOrDefault(
                        "routing.url.1", null)), null))
                .setExternal(Utils.getOrDefault((String) properties.getOrDefault("routing.url.public", properties.getOrDefault(
                        "routing.url.2", null)), null));
    }

    /**
     * Build portal urls web url.
     *
     * @param properties the properties
     *
     * @return the web url
     */
    public static WebUrl buildPortalUrls(final Properties properties) {
        return new WebUrl().setInternal(Utils.getOrDefault((String) properties.getOrDefault("portal.url.internal", properties.getOrDefault(
                "portal.url.1", "")), null))
                           .setExternal(Utils.getOrDefault((String) properties.getOrDefault("portal.url.public", properties.getOrDefault(
                                   "portal.url.2", "")), null));
    }

    /**
     * Build pif urls paa s.
     *
     * @param properties the properties
     *
     * @return the paa s
     */
    public static PaaS buildPIFUrls(final Properties properties) {
        PaaS pif = new PaaS();
        pif.setPublisher(new WebUrl().setInternal(Utils.getOrDefault(
                Utils.buildURL((String) properties.getOrDefault("pif.conf.paas.store.full.domain.internal", ""),
                               "/publisher"), null)));

        String storeUrlSuffix = "/store";
        if(Utils.compareOccVersion((String) properties.getOrDefault("odigo.version", ""), "5.8") >= 0) {
            storeUrlSuffix = "/devportal";
        }
        pif.setStore(new WebUrl().setInternal(Utils.getOrDefault(
                Utils.buildURL((String) properties.getOrDefault("pif.conf.paas.store.full.domain.internal", ""),
                               storeUrlSuffix), null)));
        return pif;
    }

    /**
     * Build pef urls paa s.
     *
     * @param properties the properties
     *
     * @return the paa s
     */
    public static PaaS buildPEFUrls(final Properties properties) {
        PaaS pif = new PaaS();
        pif.setPublisher(new WebUrl().setInternal(Utils.getOrDefault(
                Utils.buildURL((String) properties.getOrDefault("pef.conf.paas.store.full.domain.internal", null),
                               "/publisher"), null)));

        String storeUrlSuffix = "/store";
        if(Utils.compareOccVersion((String) properties.getOrDefault("odigo.version", ""), "5.8") >= 0) {
            storeUrlSuffix = "/devportal";
        }
        pif.setStore(new WebUrl().setInternal(Utils.getOrDefault(
                Utils.buildURL((String) properties.getOrDefault("pef.conf.paas.store.full.domain.internal", ""),
                               storeUrlSuffix), null)));
        return pif;
    }

    /**
     * Build cmdb urls server url.
     *
     * @param properties the properties
     * @param file the file
     *
     * @return the server url
     */
    public static ServerUrl buildCMDBUrls(final Properties properties, final File file) {
        ServerUrl serverUrl = new ServerUrl();

        boolean isClustered = Boolean.parseBoolean((String) properties.getOrDefault("odigo.cluster",
                                                                                      "false"));
        String cmdbFilename = file.getAbsolutePath()
                                  .substring(file.getAbsolutePath().indexOf(CUSTOM_STRING) + 7)
                                  .replace("\\", "/")
                                  .replace(PROPERTIES_EXT, "");
        serverUrl.setMaster(Utils.getOrDefault(
                Utils.buildURL("vmw-git.internal.odigo.cloud/Configuration/CMDB/blob/master",
                               CUSTOM_STRING,
                               cmdbFilename), null)
        );
        if(isClustered) {
            serverUrl.setSlave(Utils.getOrDefault(
                    Utils.buildURL("vmw-git.internal.odigo.cloud/Configuration/CMDB/blob/master",
                                   CUSTOM_STRING,
                                   cmdbFilename.replace("master", "slave")), null)
            );
        }
        return serverUrl;
    }

    /**
     * Build ssh urls server url.
     *
     * @param properties the properties
     *
     * @return the server url
     */
    public static ServerUrl buildSshUrls(final Properties properties) {
        ServerUrl serverUrl = new ServerUrl();
        final String provider = (String) properties.getOrDefault("cloud_providers.name", ODIGO_PROVIDER_NAME);
        final boolean isClustered = Boolean.parseBoolean((String) properties.getOrDefault("odigo.cluster",
                                                                                          Boolean.FALSE.toString()));
        final StringBuilder builderMaster = new StringBuilder().append("ssh://");
        final StringBuilder builderSlave = new StringBuilder().append("ssh://");
        if(!AWS_PROVIDER_NAME.equals(provider)) {
            final String masterClientServerName = (String) properties.getOrDefault("client.serverName.app.master", "");
            final String slaveClientServerName = (String) properties.getOrDefault("client.serverName.app.slave", "");
            if(!masterClientServerName.isEmpty()) {
                builderMaster.append("admapp@").append(masterClientServerName);
                serverUrl.setMaster(Utils.getOrDefault(builderMaster.toString(), null));
            }
            if(!slaveClientServerName.isEmpty() && isClustered) {
                builderSlave.append("admapp@").append(slaveClientServerName);
                serverUrl.setSlave(Utils.getOrDefault(builderSlave.toString(), null));
            }
        } else {
            final String masterClientServerName = (String) properties.getOrDefault("amazon_web_services.ec2.master.dn", "");
            final String slaveClientServerName = (String) properties.getOrDefault("amazon_web_services.ec2.slave.dn",
                                                                                  "");
            if(!masterClientServerName.isEmpty()) {
                builderMaster.append(masterClientServerName);
                serverUrl.setMaster(Utils.getOrDefault(builderMaster.toString(), null));
            }
            if(!slaveClientServerName.isEmpty() && isClustered) {
                builderSlave.append(slaveClientServerName);
                serverUrl.setSlave(Utils.getOrDefault(builderSlave.toString(), null));
            }
        }
        return serverUrl;
    }

}
