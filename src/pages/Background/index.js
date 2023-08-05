import Browser from "webextension-polyfill";
// to listen action button click
Browser.action.onClicked.addListener(async (tab) => {
  try {
    await Browser.tabs.sendMessage(tab.id, { action: "btnClicked" })
  } catch (error) {
    Browser.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['js/contentScript.bundle.js']
    });
  }
});
