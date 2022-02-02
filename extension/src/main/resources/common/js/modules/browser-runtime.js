class BrowserRuntime {
  constructor(browser) {
    this.runtime = browser.runtime
  }

  getId() {
    return this.runtime.id;
  }

  set(items) {
    return new Promise((resolve, reject) => {
      this.storageArea.set(items, () => {
        const { lastError } = this.runtime;
        if (lastError) return reject(lastError)
        resolve()
      })
    })
  }
}

const runtime = new BrowserRuntime(chrome || browser);