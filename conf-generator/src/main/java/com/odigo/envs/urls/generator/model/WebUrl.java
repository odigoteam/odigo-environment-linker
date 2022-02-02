package com.odigo.envs.urls.generator.model;

/**
 * The type Url.
 */
public class WebUrl {
    private String internal;
    private String external;

    /**
     * Gets url 1.
     *
     * @return the url 1
     */
    public String getInternal() {
        return internal;
    }

    /**
     * Sets url 1.
     *
     * @param internal the url 1
     *
     * @return the url 1
     */
    public WebUrl setInternal(final String internal) {
        this.internal = internal;
        return this;
    }

    /**
     * Gets url 2.
     *
     * @return the url 2
     */
    public String getExternal() {
        return external;
    }

    /**
     * Sets url 2.
     *
     * @param external the url 2
     *
     * @return the url 2
     */
    public WebUrl setExternal(final String external) {
        this.external = external;
        return this;
    }
}
