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
          func: (blob) => {
            //Moved function definitions to scripting section to put them in the same context. 

            //Function for converting image blog into png image blob.
            function convertJpeg(jpegImage){
              return new Promise((resolve, reject) => {
                //creates new blank image
                const img = new Image();
                const url = URL.createObjectURL(jpegImage);
                
                //copies existent jpeg to new png.
                img.onload = () => {
                  const canvas = document.createElement('canvas');
                  canvas.width = img.width;
                  canvas.height = img.height;

                  const ctx = canvas.getContext('2d');
                  ctx.drawImage(img,  0, 0);

                  canvas.toBlob((pngImg) => {
                    if (pngImg){
                      resolve(pngImg);
                    } else {
                      reject(new Error('Failed to convert to PNG'));
                    }
                  }, 'image/png');
                };

                img.onerror = (error) => {
                  reject(error);
                };

                img.src  = url;
              });  
            }

            //Function for copying image to clipboard
            async function copyImageToClipboard(imageUrl) {
              try {
                //gets image blob from the selection    
                const response = await fetch(imageUrl);
                const initialBlob = await response.blob();
                console.log("Blob created:", initialBlob);

                //Since clipboard API only takes png, all other types must be converted to png first.
                //Check if the image is a png, if not convert it first
                if (initialBlob.type !== 'image/png'){
                  console.log("Requested image is " + initialBlob.type + ". beginning conversion to png.");
                  clipboardBlob = await convertJpeg(initialBlob);
                  console.log("Image converted to png: ", clipboardBlob);
                } else {
                  clipboardBlob = initialBlob;
                }

                //Check if clipboard API is working
                if (typeof ClipboardItem === 'undefined'){
                  console.error('Clipboard API is not supported in this context.');
                  return;
                }

                //adds image blob to the clipboard
                const item = new ClipboardItem({ [clipboardBlob.type]: clipboardBlob });
                await navigator.clipboard.write([item]);
                console.log("Image copied to clipboard!");

                //Calls to open Google Translate
                chrome.runtime.sendMessage({ action: "openTranslate" });
              
              } catch (err) {
                console.error("Failed to copy image:", err);
              }
            }

            //Calls the function to begin the process
            copyImageToClipboard(blob);
          },
          args: [info.srcUrl]
      },
      (results) => {
          console.log("Translating Image. ", results);
      });
  } else {
      console.log("Context menu clicked, but no valid image selected.");
  }
});  

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
