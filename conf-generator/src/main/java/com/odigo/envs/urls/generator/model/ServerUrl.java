package com.odigo.envs.urls.generator.model;

/**
 * The type Url.
 */
public class ServerUrl {
    private String master;
    private String slave;

    /**
     * Gets master.
     *
     * @return the master
     */
    public String getMaster() {
        return master;
    }

    /**
     * Sets master.
     *
     * @param master the master
     *
     * @return the master
     */
    public ServerUrl setMaster(final String master) {
        this.master = master;
        return this;
    }

    /**
     * Gets slave.
     *
     * @return the slave
     */
    public String getSlave() {
        return slave;
    }

    /**
     * Sets slave.
     *
     * @param slave the slave
     *
     * @return the slave
     */
    public ServerUrl setSlave(final String slave) {
        this.slave = slave;
        return this;
    }
}
