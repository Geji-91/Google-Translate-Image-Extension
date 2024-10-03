## Google_Translate_Image_Extension
An extension to make it more convient to use Google Translate on images.

## Overview

In our increasingly global world, powered by the internet, the ability to convert different languages without a translator is a necessity. One area where I find this lacking is on images. As an avid manga reader I often find that my favorite titles aren't available in my native language, whether thats because they're not popular enough to recieve an official english release, not popular enough to recieve a fantranslation, fantranslators are too busy with their real jobs to do updates, or just someone throwing a tantrum and quitting translation. 

While there are paid services, PCs are currently lacking in free do-it-yourself image translation options. Google Translate is a wonderful tool for this, with the ability to translate and replace text in images automatically. However, current access methods are insufficient for ease of use. The previous best method -- the "Search image with Google" context menu item -- is being depreciated in favor of Google Lens. This method wasn't amazing in the first place, as it opens the image in a side panel and does not allow you to get the image to full size, and as a result the only readable portion is the translation log under the image, but it was serviceable. With its depreciation, the only alternative is copy the image and open Google Translate and translate it there, which is much slower and more labor intensive, however this also provides the ability to open the image at full size. 

This extension aims to improve upon the depreciating "Search images with Google" and create a non-predatory open source alternative to paid automatic translation services. It adds a new context menu item called "Translate image with Google". Clicking this item automatically copy the image in question, open Google Translate, and feed the image to be translated in one step. This will significantly improve the ease of use for Google Translating images, and spirutally succeed and improve upon the existant "Search image with Google" context menu item. 

The first few updates will provide the initial functionality. 1.0 will be when the functionality above has been completed. After that, I want to try to add a few more advanced features, such as the ability to translate images in-page and availability in multiple browsers. I want all of these to run from the extension, and not require an external server or fee for use. I hope that this tool will be valueable for the manga community and help to grow less popular titles via greater access. 

## Implementation Notes

Currently, this tool will only be available as a Chrome test extension from this repo. Eventually, I hope to make this into a legitimate extension or to pressure Google to make its own access of Google Translate more convienient, but that is a long term goal. Right now you can choose whether to open google translate in a new tab or the same tab in the code itself. Eventually I'll add an extension dropdown to hold this and other settings. 

## Running this extension

1. Clone this repository.
2. Load the extension_files directory in Chrome as an [unpacked extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked).
3. Right-click on images to view the context menu with the "Search images with Google" item.
