class BrowserStorage {
  constructor(browser) {
    this.runtime = browser.runtime
    this.storageArea = browser.storage['sync']
  }

  get(key) {
    return new Promise(resolve => {
      this.storageArea.get(key, resolve)
    })
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

const storage = new BrowserStorage(chrome || browser);