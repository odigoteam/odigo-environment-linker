package com.odigo.envs.urls.generator;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.odigo.envs.urls.generator.common.Constants;
import com.odigo.envs.urls.generator.model.AWS;
import com.odigo.envs.urls.generator.model.Environment;
import com.odigo.envs.urls.generator.model.OdigoEnvironments;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Properties;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.filefilter.TrueFileFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * The type Main.
 *
 * @author NAGY Levente - 15/10/2020.
 */
public class Main {

    private static final Logger LOGGER = LoggerFactory.getLogger(Main.class);

    private static final List<String> excludedEnvs = new ArrayList<>(Arrays.asList(
            "MP01",
            "VNO01",
            "THI01"
    ));

    /**
     * Main.
     *
     * @param args the args
     */
    public static void main(final String[] args) {
        final OdigoEnvironments odigoEnvironments = parseCMDB();
        writeEnvsToFile(odigoEnvironments);
    }

    private static OdigoEnvironments parseCMDB() {

        LOGGER.info("===============================================");
        LOGGER.info("");
        LOGGER.info("Generate JSON");
        LOGGER.info("");
        LOGGER.info("===============================================");

        OdigoEnvironments odigoEnvironments = new OdigoEnvironments();

        odigoEnvironments.setLatestExtensionVersion(Objects.nonNull(System.getProperty(Constants.LATEST_VERSION_PARAM)) ?
                                                    System.getProperty(Constants.LATEST_VERSION_PARAM) :
                                                    Constants.LATEST_EXTENSION_VERSION);

        // Add MPA environments
        odigoEnvironments.getEnvironments().addAll(CustomEnvironmentsBuilder.getMPAEnvironments());

        String rootCmdbDir = Objects.nonNull(System.getProperty(Constants.CMDB_DIR_PARAM)) ?
                             System.getProperty(Constants.CMDB_DIR_PARAM) :
                             Constants.CMDB_ROOT_DIRECTORY;
        final File cmdbRoot = new File(rootCmdbDir);
        final List<File> cmdbFiles = listCMDBFiles(cmdbRoot);

        for (File file : cmdbFiles) {
            try (FileReader reader = new FileReader(file)) {
                Properties properties = new Properties();
                properties.load(reader);
                String clientId = ((String) properties.getOrDefault("client.id", "")).toUpperCase();
                if(excludedEnvs.contains(clientId)) {
                    LOGGER.info("Ignoring {}", clientId);
                } else {
                    LOGGER.info("Parsing {} ({})",
                                clientId,
                                ((String) properties.getOrDefault("client.environment", "-")).toUpperCase());
                    final Environment environment = createEnvironment(properties, file);
                    odigoEnvironments.getEnvironments().add(environment);
                }
            } catch (final IOException e) {
                LOGGER.error("Error during reading file {}", file.getPath(), e);
            }
        }

        odigoEnvironments.getEnvironments().sort(Comparator.comparing(Environment::getEnv));
        return odigoEnvironments;
    }

    private static List<File> listCMDBFiles(final File dir) {
        List<File> files = new ArrayList<>();
        if (dir.exists()) {
            final List<File> directories = (List<File>) FileUtils
                    .listFilesAndDirs(dir, TrueFileFilter.INSTANCE, TrueFileFilter.INSTANCE);
            for (File file : directories) {
                if (!file.isDirectory()) {
                    final String extension = FilenameUtils
                            .getExtension(file.getPath());
                    if ("properties".equals(extension) &&
                        FilenameUtils.getName(file.getPath()).contains("master")) {
                        files.add(file);
                    }
                }
            }
        } else {
            LOGGER.error("Cannot find directory {}", dir.getPath());
        }
        return files;
    }

    private static Environment createEnvironment(final Properties properties, final File envFile) {
        Environment environment = new Environment();
        environment.setEnv(((String) properties.getOrDefault("client.id", "")).toUpperCase());
        environment.setType(Utils.computeType(((String) properties.getOrDefault("client.environment", "-")).toUpperCase(),
                                        environment.getEnv()));
        environment.setName((String) properties.getOrDefault("client.name", ""));
        environment.setLogo((String) properties.getOrDefault("client.logo", ""));
        environment.setProvider((String) properties.getOrDefault("cloud_providers.name", ModuleBuildHelper.ODIGO_PROVIDER_NAME));
        if(ModuleBuildHelper.AWS_PROVIDER_NAME.equals(environment.getProvider())) {
            environment.setAws(new AWS().setAccountId((String) properties.getOrDefault("amazon_web_services.account" +
                                                                                       ".id", null)));
        }
        environment.setOccVersion((String) properties.getOrDefault("odigo.version", ""));
        environment.setDomain((String) properties.getOrDefault("client.dn", ""));

        environment.getUrls().setConsole(ModuleBuildHelper.buildConsoleUrls(properties));
        if(Utils.compareOccVersion(environment.getOccVersion(), "5.6") >= 0) {
            environment.getUrls().setHealthCheck(ModuleBuildHelper.buildHealthCheck(properties));
        }
        environment.getUrls().setRouting(ModuleBuildHelper.buildRoutingUrls(properties));
        environment.getUrls().setPortal(ModuleBuildHelper.buildPortalUrls(properties));
        environment.getUrls().setPif(ModuleBuildHelper.buildPIFUrls(properties));
        environment.getUrls().setPef(ModuleBuildHelper.buildPEFUrls(properties));
        environment.getUrls().setCmdb(ModuleBuildHelper.buildCMDBUrls(properties, envFile));
        environment.getUrls().setSsh(ModuleBuildHelper.buildSshUrls(properties));

        return environment;
    }

    private static void writeEnvsToFile(final OdigoEnvironments odigoEnvironments) {
        ObjectMapper mapper = new ObjectMapper();
        mapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        try {
            String json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(odigoEnvironments);
            FileUtils.write(
                    Paths.get("./configuration.json").toFile(),
                    json,
                    StandardCharsets.UTF_8);
        } catch (final IOException e) {
            LOGGER.error("Error while writing json file", e);
        }
    }
}
