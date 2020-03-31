// Debug is available from Extensions Loading page -->  Inspect views:xxxxx

console.log('Background script started....');

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
    console.log(tab);
    let msg = {
        txt: "Message sent from background script",
        tabURL: tab.url,
        tabTitle: tab.title
    }
    chrome.tabs.sendMessage(tab.id, msg);
}

//"default_popup": "popup.html"

// "background":{
//     "scripts": ["background.js"]
// },