var count = 0;
var timerIds = {};
// function paste(){
//   console.log("this is paste. " + count);
//   count++;
//   console.log(this);
//   console.log("printed this");
//   return "data";
// }
function refresh(interval, tabId) {
    timerIds[tabId] = setInterval(function(){
        chrome.tabs.reload(tabId);
    }, interval);
    console.log("setting timer with id:" + timerIds[tabId]);
}
function stop(tabId) {
    console.log("stopping timer with ID: " + timerIds[tabId]);
    clearInterval(timerIds[tabId]);
}

// var timerId;

// chrome.runtime.onInstalled.addListener(function() {
//     chrome.contextMenus.create({
//       "id": "sampleContextMenu",
//       "title": "Sample Context Menu",
//       "contexts": ["selection"]
//     });
//   });

//   chrome.runtime.onMessage.addListener(function(message, callback) {
//     if (message.data == "refresh") {
//         console.log("refreshing!");
//         timerId = setInterval(function(){
//             chrome.tabs.reload(message.tabId);
//         }, message.interval);
//     } else if (message.data == "stop") {
//         clearInterval(timerId);
//     };
//   });
