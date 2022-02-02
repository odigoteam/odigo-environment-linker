package com.odigo.envs.urls.generator;

import com.odigo.envs.urls.generator.model.Environment;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Properties;
import java.util.Set;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CustomEnvironmentsBuilder {

    private static final Logger LOGGER = LoggerFactory.getLogger(CustomEnvironmentsBuilder.class);

    private CustomEnvironmentsBuilder() {}

    public static List<Environment> getMPAEnvironments() {
        final HashMap<String, Properties> mpaEnvsConfig = loadMPAConfiguration();
        List<Environment> envs = new ArrayList<>();
        mpaEnvsConfig.forEach((key, properties) -> {
            LOGGER.info("Parsing {} ({})",
                        properties.getOrDefault("client.id", ""),
                        properties.getOrDefault("client.name", ""));
            Environment environment = new Environment();
            environment.setEnv(((String) properties.getOrDefault("client.id", "")).toUpperCase());
            environment.setType(Utils.computeType(((String) properties.getOrDefault("client.environment", "-")).toUpperCase(),
                                                  environment.getEnv()));
            environment.setName((String) properties.getOrDefault("client.name", ""));
            environment.setLogo((String) properties.getOrDefault("client.logo", ""));
            environment.setProvider(ModuleBuildHelper.ODIGO_PROVIDER_NAME);
            environment.setOccVersion("DEV");
            environment.setDomain((String) properties.getOrDefault("client.dn", ""));

            environment.getUrls().setConsole(ModuleBuildHelper.buildConsoleUrls(properties));
            environment.getUrls().setRouting(ModuleBuildHelper.buildRoutingUrls(properties));
            environment.getUrls().setPortal(ModuleBuildHelper.buildPortalUrls(properties));
            environment.getUrls().setPif(ModuleBuildHelper.buildPIFUrls(properties));
            environment.getUrls().setSsh(ModuleBuildHelper.buildSshUrls(properties));

            envs.add(environment);
        });

        // TODO Build MPAs envs

        return envs;
    }

    private static HashMap<String, Properties> loadMPAConfiguration() {
        HashMap<String, Properties> mpaEnvs = new HashMap<>();
        Properties properties = new Properties();
        ClassLoader classLoader = CustomEnvironmentsBuilder.class.getClassLoader();
        try (InputStream inputStream = classLoader.getResourceAsStream("mpa.properties")) {
            properties.load(inputStream);
        } catch (final IOException e) {
            LOGGER.error("Error during reading file mpa.properties", e);
        }

        final Set<String> keys = properties.stringPropertyNames();
        keys.forEach(key -> {
            final String envId = key.substring(0, key.indexOf("."));
            if (!mpaEnvs.containsKey(envId)) {
                mpaEnvs.put(envId, new Properties());
            }
            mpaEnvs.get(envId).put(key.substring(envId.length() + 1), properties.getProperty(key));
        });
        mpaEnvs.forEach((key, value) -> {
            if (!key.equals("common")) {
                value.putAll(mpaEnvs.get("common"));
            }
        });
        mpaEnvs.remove("common");

        return mpaEnvs;
    }
}
