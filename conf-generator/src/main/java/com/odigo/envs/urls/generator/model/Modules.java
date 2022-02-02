package com.odigo.envs.urls.generator.model;

/**
 * The type Modules.
 */
public class Modules {
    // Odigo CC module links
    private WebUrl console;
    private WebUrl healthCheck;
    private WebUrl portal;
    private PaaS pif;
    private PaaS pef;
    private WebUrl routing;
    // Technical links
    private ServerUrl cmdb;
    // Tooling links
    private ServerUrl ssh;

    /**
     * Gets console.
     *
     * @return the console
     */
    public WebUrl getConsole() {
        return console;
    }

    /**
     * Sets console.
     *
     * @param console the console
     *
     * @return the console
     */
    public Modules setConsole(final WebUrl console) {
        this.console = console;
        return this;
    }

    /**
     * Gets health check.
     *
     * @return the health check
     */
    public WebUrl getHealthCheck() {
        return healthCheck;
    }

    /**
     * Sets health check.
     *
     * @param healthCheck the health check
     *
     * @return the health check
     */
    public Modules setHealthCheck(final WebUrl healthCheck) {
        this.healthCheck = healthCheck;
        return this;
    }

    /**
     * Gets routing.
     *
     * @return the routing
     */
    public WebUrl getRouting() {
        return routing;
    }

    /**
     * Sets routing.
     *
     * @param routing the routing
     *
     * @return the routing
     */
    public Modules setRouting(final WebUrl routing) {
        this.routing = routing;
        return this;
    }

    /**
     * Gets portal.
     *
     * @return the portal
     */
    public WebUrl getPortal() {
        return portal;
    }

    /**
     * Sets portal.
     *
     * @param portal the portal
     *
     * @return the portal
     */
    public Modules setPortal(final WebUrl portal) {
        this.portal = portal;
        return this;
    }

    /**
     * Gets pif.
     *
     * @return the pif
     */
    public PaaS getPif() {
        return pif;
    }

    /**
     * Sets pif.
     *
     * @param pif the pif
     *
     * @return the pif
     */
    public Modules setPif(final PaaS pif) {
        this.pif = pif;
        return this;
    }

    /**
     * Gets pef.
     *
     * @return the pef
     */
    public PaaS getPef() {
        return pef;
    }

    /**
     * Sets pef.
     *
     * @param pef the pef
     *
     * @return the pef
     */
    public Modules setPef(final PaaS pef) {
        this.pef = pef;
        return this;
    }

    /**
     * Gets cmdb.
     *
     * @return the cmdb
     */
    public ServerUrl getCmdb() {
        return cmdb;
    }

    /**
     * Sets cmdb.
     *
     * @param cmdb the cmdb
     *
     * @return the cmdb
     */
    public Modules setCmdb(final ServerUrl cmdb) {
        this.cmdb = cmdb;
        return this;
    }

    /**
     * Gets ssh.
     *
     * @return the ssh
     */
    public ServerUrl getSsh() {
        return ssh;
    }

    /**
     * Sets ssh.
     *
     * @param ssh the ssh
     *
     * @return the ssh
     */
    public Modules setSsh(final ServerUrl ssh) {
        this.ssh = ssh;
        return this;
    }
}
