import {firebaseConfig} from './credential.js';
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();

console.log(4);
chrome.extension.onMessageExternal.addListener((message, sender, sendResponse) => {
    console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
    console.log("message sent", message);
    if (message.type === 'publish-trade') {
        console.log("publish-trade")
        delete message.type;
        message.time = firebase.firestore.Timestamp.now();
        db.collection("users").doc("ms8sCRkVbOPcJMyAqWpa")
            .collection("trades").add(
                message
            )
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        sendResponse("done");
    }
  });

chrome.runtime.onConnect.addListener((port) => {
    console.log(port);
    if (port.name === "psa-chrome-ext") {
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

        // port.onMessage.addListener(msg => {
        //     console.log('message received',msg);
        //     if (msg.request === 'publish-trade'){
        //         console.log("publish trade");
        //         db.collection("users").doc("ms8sCRkVbOPcJMyAqWpa")
        //             .collection("trades").add({
        //                 "hello": "world"
        //             })
        //             .then((docRef) => {
        //                 console.log("Document written with ID: ", docRef.id);
        //             })
        //             .catch((error) => {
        //                 console.error("Error adding document: ", error);
        //             });
        //     }
        // })
    }
});