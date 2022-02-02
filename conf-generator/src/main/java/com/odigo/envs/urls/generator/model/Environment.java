package com.odigo.envs.urls.generator.model;

import java.util.Objects;

/**
 * The type Environment.
 */
public class Environment {
    private String env;
    private String type;
    private String name;
    private String logo;
    private String provider;
    private AWS aws;
    private String occVersion;
    private String domain;
    private Modules urls;

    /**
     * Gets env.
     *
     * @return the env
     */
    public String getEnv() {
        return env;
    }

    /**
     * Sets env.
     *
     * @param env the env
     *
     * @return the env
     */
    public Environment setEnv(final String env) {
        this.env = env;
        return this;
    }

    /**
     * Gets type.
     *
     * @return the type
     */
    public String getType() {
        return type;
    }

    /**
     * Sets type.
     *
     * @param type the type
     *
     * @return the type
     */
    public Environment setType(final String type) {
        this.type = type;
        return this;
    }

    /**
     * Gets name.
     *
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * Sets name.
     *
     * @param name the name
     *
     * @return the name
     */
    public Environment setName(final String name) {
        this.name = name;
        return this;
    }

    /**
     * Gets logo.
     *
     * @return the logo
     */
    public String getLogo() {
        return logo;
    }

    /**
     * Sets logo.
     *
     * @param logo the logo
     *
     * @return the logo
     */
    public Environment setLogo(final String logo) {
        this.logo = logo;
        return this;
    }

    /**
     * Gets provider.
     *
     * @return the provider
     */
    public String getProvider() {
        return provider;
    }

    /**
     * Sets provider.
     *
     * @param provider the provider
     *
     * @return the provider
     */
    public Environment setProvider(final String provider) {
        this.provider = provider;
        return this;
    }

    /**
     * Gets aws.
     *
     * @return the aws
     */
    public AWS getAws() {
        return aws;
    }

    /**
     * Sets aws.
     *
     * @param aws the aws
     *
     * @return the aws
     */
    public Environment setAws(final AWS aws) {
        this.aws = aws;
        return this;
    }

    /**
     * Gets occ version.
     *
     * @return the occ version
     */
    public String getOccVersion() {
        return occVersion;
    }

    /**
     * Sets occ version.
     *
     * @param occVersion the occ version
     *
     * @return the occ version
     */
    public Environment setOccVersion(final String occVersion) {
        this.occVersion = occVersion;
        return this;
    }

    /**
     * Gets domain.
     *
     * @return the domain
     */
    public String getDomain() {
        return domain;
    }

    /**
     * Sets domain.
     *
     * @param domain the domain
     *
     * @return the domain
     */
    public Environment setDomain(final String domain) {
        this.domain = domain;
        return this;
    }

    /**
     * Gets modules.
     *
     * @return the modules
     */
    public Modules getUrls() {
        if(Objects.isNull(urls))
            urls = new Modules();
        return urls;
    }

    /**
     * Sets modules.
     *
     * @param urls the modules
     *
     * @return the modules
     */
    public Environment setUrls(final Modules urls) {
        this.urls = urls;
        return this;
    }
}
