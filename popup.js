document.addEventListener('DOMContentLoaded', function() {
    var interval = document.getElementById('interval');
    var cbxRefresh = document.getElementById('cbxRefresh');
    var tbxStatus = document.getElementById('tbxStatus');
    var bgPage = chrome.extension.getBackgroundPage();
    chrome.tabs.getSelected(null, function(tab) {
        var state = bgPage.getState(tab.id);
        interval.value = state.interval;
        interval.disabled = state.active;
        cbxRefresh.checked = state.active;
        tbxStatus.value = state.active ? "Refreshing" : "Stopped";
    });

    cbxRefresh.onclick = function() {
        if (this.checked) {
            interval.disabled = true;
            tbxStatus.value = "Refreshing";
            chrome.tabs.getSelected(null, function(tab) {
                bgPage.refresh(interval.value, tab.id);
            });   
        } else {
            interval.disabled = false;
            tbxStatus.value = "Stopped";
            chrome.tabs.getSelected(null, function(tab) {
                bgPage.stop(tab.id);
            });
        }
    };

    interval.onchange = function() {
        chrome.tabs.getSelected(null, function(tab) {
            bgPage.updateInterval(tab.id, interval.value);
        });
    };

    interval.addEventListener("focusout", function() {
        console.log("focus out");
        if (interval.value < 1) {
            interval.value = 1;
        }
    });

    chrome.tabs.getSelected(null, function(tab) {
        document.getElementById("tabName").innerHTML = tab.title;
    });
  }, false);
