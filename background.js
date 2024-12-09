function toggleClass() {
  document.body.classList.toggle("simi-web-enabled");
}

chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: toggleClass,
    });
  }
});
