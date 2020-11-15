document.addEventListener('DOMContentLoaded', function() {
    var bgPage = chrome.extension.getBackgroundPage();
    // console.log(bgPage);
    // var dat =  bgPage.paste();
    // console.log(dat);

    chrome.tabs.getSelected(null, function(tab) {
        document.getElementById("tabName").innerHTML = tab.title;
    });

    var refreshButton = document.getElementById('refresh');
    refreshButton.addEventListener('click', function() {
        chrome.tabs.getSelected(null, function(tab) {
            bgPage.refresh(document.getElementById('interval').value * 1000, tab.id);
            
            // chrome.runtime.sendMessage({
            //     data: "refresh",
            //     interval: interval * 1000
            // });
        });   
    }, false);

    var stopButton = document.getElementById('stop');
    stopButton.addEventListener('click', function() {
        chrome.tabs.getSelected(null, function(tab) {
            bgPage.stop(tab.id);
        });
        // chrome.runtime.getSelected(null, function(tab) {
        //     chrome.runtime.sendMessage({ data: "stop" });
        // });
    //   chrome.tabs.getSelected(null, function(tab) {
    //     clearInterval(timerId);
    //   });
    }, false);
  }, false);


  
    // var timerId;
    // alert("Doing something!");
    // console.log("initializing ...");

    // chrome.runtime.onMessage.addListener(
    //     function(request, sender, sendResponse) {
    //       console.log(sender.tab ?
    //                   "from a content script:" + sender.tab.url :
    //                   "from the extension");
    //       if (request.greeting == "hello")
    //         sendResponse({farewell: "goodbye"});
    //     });


    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //     chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    //         console.log(response.farewell);
    //     });
    // });