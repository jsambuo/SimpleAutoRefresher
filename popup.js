document.addEventListener('DOMContentLoaded', function() {
    var interval = document.getElementById('interval');
    var cbxRefresh = document.getElementById('cbxRefresh');
    var bgPage = chrome.extension.getBackgroundPage();
    chrome.tabs.getSelected(null, function(tab) {
        var state = bgPage.getState(tab.id);
        interval.value = state.interval;
        interval.disabled = state.active;
        cbxRefresh.checked = state.active;
    });

    cbxRefresh.onclick = function() {
        if (this.checked) {
            interval.disabled = true;
            chrome.tabs.getSelected(null, function(tab) {
                bgPage.refresh(interval.value, tab.id);
            });   
        } else {
            interval.disabled = false;
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

    chrome.tabs.getSelected(null, function(tab) {
        document.getElementById("tabName").innerHTML = tab.title;
    });
  }, false);
