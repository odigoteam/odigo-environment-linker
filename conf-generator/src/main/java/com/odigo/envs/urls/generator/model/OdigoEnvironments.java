package com.odigo.envs.urls.generator.model;

import com.odigo.envs.urls.generator.common.Constants;
import java.util.ArrayList;
import java.util.List;

/**
 * The type Odigo environments.
 */
public class OdigoEnvironments {
    private String environmentsVersion = Constants.CONFIGURATION_VERSION;
    private String latestExtensionVersion = Constants.LATEST_EXTENSION_VERSION;
    private final List<Environment> environments = new ArrayList<>();

    /**
     * Gets environments version.
     *
     * @return the environments version
     */
    public String getEnvironmentsVersion() {
        return environmentsVersion;
    }

    /**
     * Sets environments version.
     *
     * @param environmentsVersion the environments version
     *
     * @return the environments version
     */
    public OdigoEnvironments setEnvironmentsVersion(final String environmentsVersion) {
        this.environmentsVersion = environmentsVersion;
        return this;
    }

    /**
     * Gets latest extension version.
     *
     * @return the latest extension version
     */
    public String getLatestExtensionVersion() {
        return latestExtensionVersion;
    }

    /**
     * Sets latest extension version.
     *
     * @param latestExtensionVersion the latest extension version
     *
     * @return the latest extension version
     */
    public OdigoEnvironments setLatestExtensionVersion(final String latestExtensionVersion) {
        this.latestExtensionVersion = latestExtensionVersion;
        return this;
    }

    /**
     * Gets environments.
     *
     * @return the environments
     */
    public List<Environment> getEnvironments() {
        return environments;
    }
}
