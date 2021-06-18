import firebaseConfig from './credential';
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();

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
        console.log("publish-trade")
        db.collection("users").doc("ms8sCRkVbOPcJMyAqWpa")
            .collection("trades").add({
                "hello": "world"
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        sendResponse();
    }
  });
