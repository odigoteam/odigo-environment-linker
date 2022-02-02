class AwsRoleSwitcher {
    executeAction(tabId, action, data) {
        return tabsObject.sendMessage(tabId, {action, data}, {});
    }

    sendSwitchRole(tabId, data) {
        this.executeAction(tabId, 'switch', data).then(() => {
            window.close();
        });
    }

    getCurrentUrlAndRegion(aURL) {
        const url = aURL.href;
        let region = '';
        const md = aURL.search.match(/region=([a-z\-1-9]+)/);
        if (md) region = md[1];
        const notGlobal = /^[a-z]{2}\-[a-z]+\-[1-9]\.console\.aws/.test(aURL.host);
        return {url, region, notGlobal};
    }

    createRedirectUri(currentUrl, curRegion, destRegion) {
        let redirectUri = currentUrl;
        if (curRegion && destRegion && curRegion !== destRegion) {
            redirectUri = redirectUri.replace('region=' + curRegion, 'region=' + destRegion);
        }
        return encodeURIComponent(redirectUri);
    }
}

const awsRoleSwitcher = new AwsRoleSwitcher();