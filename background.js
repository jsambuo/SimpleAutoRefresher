var count = 0;
var timers = {};

function refresh(interval, tabId) {
    var timerId = setInterval(function(){
        chrome.tabs.reload(tabId);
    }, interval * 1000);
    timers[tabId] = {
        timerId: timerId,
        interval: interval,
        active: true
    };

    // console.log("setting timer with id:" + timerIds[tabId]);
}
function stop(tabId) {
    // console.log("stopping timer with ID: " + timerIds[tabId]);
    timers[tabId].active = false;
    clearInterval(timers[tabId].timerId);
}
function getState(tabId) {
    var timerInfo = timers[tabId];
    if (!timerInfo) {
        timers[tabId] = {
            active: false,
            interval: 10
        };
    }
    return timers[tabId];
}

function updateInterval(tabId, interval) {
    timers[tabId].interval = interval;
}

chrome.tabs.onRemoved.addListener(function(tabId) {
    stop(tabId);
    delete timers[tabId];
});
