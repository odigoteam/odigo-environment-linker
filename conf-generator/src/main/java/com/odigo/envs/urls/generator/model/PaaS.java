package com.odigo.envs.urls.generator.model;

/**
 * The type PaaS.
 */
public class PaaS {
    private WebUrl publisher;
    private WebUrl store;

    /**
     * Gets publisher.
     *
     * @return the publisher
     */
    public WebUrl getPublisher() {
        return publisher;
    }

    /**
     * Sets publisher.
     *
     * @param publisher the publisher
     *
     * @return the publisher
     */
    public PaaS setPublisher(final WebUrl publisher) {
        this.publisher = publisher;
        return this;
    }

    /**
     * Gets store.
     *
     * @return the store
     */
    public WebUrl getStore() {
        return store;
    }

    /**
     * Sets store.
     *
     * @param store the store
     *
     * @return the store
     */
    public PaaS setStore(final WebUrl store) {
        this.store = store;
        return this;
    }
}
