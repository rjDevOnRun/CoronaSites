console.log("Content.js started");

let paragraphs = document.getElementsByTagName('P');

for (let i = 0; i < paragraphs.length; i++){
    paragraphs[i].style['background-color'] = '#FF00FF';
    //console.log("Inside for Loop" + i);
}

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
    console.log(message.txt);
    console.log(message.tabURL);
    console.log(message.tabTitle);
}