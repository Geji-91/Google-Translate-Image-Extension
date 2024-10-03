//add context menu button
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copyImageToClipboard",
    title: "Translate Image with Google",
    contexts: ["image"]
  });
  console.log("Translate context menu item created.");
});

//info is whatever is selected at the time the context menu is opened.
chrome.contextMenus.onClicked.addListener((info, tab) => {
  //calls the function when the button is clicked
  if (info.menuItemId === "copyImageToClipboard" && info.srcUrl) {
      chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: copyImageToClipboard,
          args: [info.srcUrl]
      },
      (results) => {
          console.log("Translating Image. ", results);
      });
  } else {
      console.log("Context menu clicked, but no valid image selected.");
  }
});
  
//Fuction for copying image to clipboard
async function copyImageToClipboard(imageUrl) {
  try {
    //gets image blob from the selection    
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    console.log("Blob created:", blob);
  
    //adds image blob to the clipboard
    const item = new ClipboardItem({ [blob.type]: blob });
    await navigator.clipboard.write([item]);
    console.log("Image copied to clipboard!");

    //Calls to open Google Translate
    chrome.runtime.sendMessage({ action: "openTranslate" });
  
  } catch (err) {
    console.error("Failed to copy image:", err);
  }
}  

// Listener to open Google Translate in a new tab
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "openTranslate") {
    //opens Google Translate in a new tab
    chrome.tabs.create({ url: "https://translate.google.com/?hl=en&sl=auto&tl=en&op=images" });

    //opens Google Translate in the current tab
    /*chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.update(tabs[0].id, {url: "https://translate.google.com/?hl=en&sl=auto&tl=en&op=images"});
    });*/
  }
});
