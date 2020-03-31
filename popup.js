
// Add New Sites Function
document.querySelector('#addSite').onclick = function(){
    addNewSite();
}

function addNewSite(){
    // var siteURL = prompt("Enter the site URL:");
    var siteURL = window.location.href;
    var siteTitle = window.document.title;
    // var siteIcon = getFavIcon();

    //chrome.tabs.getCurrent(gotTag);
    let params = {
        active: true,
        currentWindow: true
    }
    chrome.tabs.query(params, gotTab);

    function gotTab(tabs) {

        console.log(tabs[0]);
        var currentTabURL = tabs[0].url;
        var currenTabTitle = tabs[0].title;
        var currentTabFavIcon = tabs[0].favIconUrl;

        var listOfSites = document.querySelector('#siteList');
        var mySiteInfo = document.createElement("div");
        var myHtml = '<div class="flex-container">' + 
                        '<div class="flex">'+
                            '<a href="'+ currentTabURL +'" target="_blank">'+
                                currenTabTitle +
                                '<img src="'+ currentTabFavIcon +'" height="50" width="150"></img>'
                            '</a>'+
                        '</div>'+
                    '</div>';
        mySiteInfo.innerHTML = myHtml;
        
        listOfSites.appendChild(mySiteInfo);

    }
}

/* tab object
active: true
audible: false
autoDiscardable: true
discarded: false
favIconUrl: "https://images.indianexpress.com/2018/10/fav-icon.png?w=32"
height: 837
highlighted: true
id: 58
incognito: false
index: 5
mutedInfo: {muted: false}
pinned: false
selected: true
status: "complete"
title: "Latest News, India News | Coronavirus News Updates, Breaking News, Live News Online, Today Headline's | The Indian Express"
url: "https://indianexpress.com/"
width: 532
windowId: 1
__proto__: Object
*/

function getFavIcon(){
    var links = document.getElementsByTagName('link');
    var icons = [];

    for(var i = 0; i < links.length; i++) {
        var link = links[i];

        //Technically it could be null / undefined if someone didn't set it!
        //People do weird things when building pages!
        var rel = link.getAttribute('rel');
        if(rel) {
            //I don't know why people don't use indexOf more often
            //It is faster than regex for simple stuff like this
            //Lowercase comparison for safety
            if(rel.toLowerCase().indexOf('icon') > -1) {
                var href = link.getAttribute('href');

                //Make sure href is not null / undefined            
                if(href) {
                    //Relative
                    //Lowercase comparison in case some idiot decides to put the 
                    //https or http in caps
                    //Also check for absolute url with no protocol
                    if(href.toLowerCase().indexOf('https:') == -1 && href.toLowerCase().indexOf('http:') == -1
                        && href.indexOf('//') != 0) {

                        //This is of course assuming the script is executing in the browser
                        //Node.js is a different story! As I would be using cheerio.js for parsing the html instead of document.
                        //Also you would use the response.headers object for Node.js below.

                        var absoluteHref = window.location.protocol + '//' + window.location.host;

                        if(window.location.port) {
                            absoluteHref += ':' + window.location.port;
                        }

                        //We already have a forward slash
                        //On the front of the href
                        if(href.indexOf('/') == 0) {
                            absoluteHref += href;
                        }
                        //We don't have a forward slash
                        //It is really relative!
                        else {
                            var path = window.location.pathname.split('/');
                            path.pop();
                            var finalPath = path.join('/');

                            absoluteHref += finalPath + '/' + href;
                        }

                        icons.push(absoluteHref);
                    }
                    //Absolute url with no protocol
                    else if(href.indexOf('//') == 0) {
                        var absoluteUrl = window.location.protocol + href;

                        icons.push(absoluteUrl);
                    }
                    //Absolute
                    else {
                        icons.push(href);
                    }
                }
            }
        }
    }

    return icons;

    // var favicon = undefined;
    // var nodeList = document.getElementsByTagName("link");
    // for (var i = 0; i < nodeList.length; i++)
    // {
    //     if((nodeList[i].getAttribute("rel") == "icon")||(nodeList[i].getAttribute("rel") == "shortcut icon"))
    //     {
    //         favicon = nodeList[i].getAttribute("href");
    //     }
    // }
    // return favicon;  
}
