function getBrowserRuntime() {
  return (chrome || browser).runtime;
}
function getBrowserStorage() {
  return (chrome || browser).storage.sync;
}
function isChromeBrowser() {
  return chrome !== undefined;
}
function getBrowserTabs() {
  return (chrome || browser).tabs;
}
