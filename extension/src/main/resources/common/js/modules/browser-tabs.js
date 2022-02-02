class BrowserTabs {
  constructor(browser) {
    this.tabs = browser.tabs;
  }

  query(queryInfo, callback) {
    this.tabs.query(queryInfo, callback);
  }

  sendMessage(tabId, message, {}) {
    if (utils.isChrome()) {
      return new Promise((callback) => {
        this.tabs.sendMessage(tabId, message, {}, callback);
      });
    } else {
      return this.tabs.sendMessage(tabId, message, {});
    }
  }

  create(createProperties) {
    this.tabs.create(createProperties);
  }
}

const tabsObject = new BrowserTabs(chrome || browser);