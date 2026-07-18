// registers the app-root sw.js regardless of which page/subfolder includes this script,
// and regardless of what path this whole app is mounted under
if ('serviceWorker' in navigator) {
    var swUrl = new URL('../sw.js', document.currentScript.src);
    var scope = new URL('../', document.currentScript.src);
    navigator.serviceWorker.register(swUrl, { scope: scope });
}
