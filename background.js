chrome.runtime.onConnect.addListener((port) => {
    if (port.name === "sample-extension") {
        chrome.browserAction.setIcon({
            path: {
                "16": "img/cool.png"
            }
        });

        port.onDisconnect.addListener(() => {
            chrome.browserAction.setIcon({
                path: {
                    "16": "img/vomiting.png"
                }
            });
        });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'publish-trade') {
        sendResponse();
    }
  });
