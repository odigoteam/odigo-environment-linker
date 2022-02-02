package com.odigo.envs.urls.generator.common;

import java.io.File;

/**
 * The type Constants.
 *
 * @author NAGY Levente - 28/10/2020.
 */
public class Constants {

    private Constants() {
        // Do nothing
    }

    /**
     * The constant CONFIGURATION_VERSION.
     */
    public static final String CONFIGURATION_VERSION = "3";

    /**
     * The constant ODIGO_ENVIRONMENTS_VERSION.
     */
    public static final String LATEST_EXTENSION_VERSION = "1.0";

    /**
     * The constant CMDB_DIR_PROPERTY.
     */
    public static final String CMDB_DIR_PARAM = "cmdb.dir";

    /**
     * The constant LATEST_VERSION_PARAM.
     */
    public static final String LATEST_VERSION_PARAM = "latest.version";

    /**
     * The constant CMDB_ROOT_DIRECTORY.
     */
    public static final String CMDB_ROOT_DIRECTORY = "." + File.separator + "CMDB" + File.separator + "custom";
}
