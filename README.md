FileSaver.js
============

FileSaver.js implements the W3C `saveAs()` [FileSaver][1] interface in browsers that do
not natively support it. There is a [FileSaver.js demo][2] that demonstrates saving
various media types.

FileSaver.js is the solution to saving files on the client side, and is perfect for
webapps that need to generate files or for saving sensitive information that shouldn't be
sent to an external server.

Supported Browsers
------------------

* Internet Explorer 10+
  * Up to 600 MiB per blob
  * **Supports filenames**
* Firefox
  * Up to 800 MiB per blob
  * **Supports filenames**
* Google Chrome
  * Up to 345 MiB per blob
  * **Supports filenames**
* Google Chrome for Android Beta
  * **Supports filenames**
* Opera Next
  * **Supports filenames**
* Safari 5+
  * Requires [Blob.js](https://github.com/eligrey/Blob.js)
  * Does not support filenames
* Opera ≤15
  * Requires [Blob.js](https://github.com/eligrey/Blob.js)
  * Does not support filenames
* Firefox <4
  * Requires [Blob.js](https://github.com/eligrey/Blob.js)
  * Does not support filenames

Unlisted future versions of browsers will probably work too; I just haven't
tested them.

Feature detection is possible:

    var isFileSaverSupported = !!self.Blob;

Syntax
------

    FileSaver saveAs(in Blob data, in DOMString filename)

Examples
--------

### Saving text

    var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "hello world.txt");

The standard W3C File API [`Blob`][3] interface is not available in all browsers.
[Blob.js][4] is a cross-browser `Blob` implementation that solves this.

### Saving a canvas

    var canvas = document.getElementById("my-canvas"), ctx = canvas.getContext("2d");
	// draw to canvas...
    canvas.toBlob(function(blob) {
        saveAs(blob, "pretty image.png");
    });

Note: The standard HTML5 `canvas.toBlob()` method is not available in all browsers.
[canvas-toBlob.js][5] is a cross-browser `canvas.toBlob()` implementation that solves
this.

### Aborting a save

    var filesaver = saveAs(blob, "whatever");
    cancel_button.addEventListener("click", function() {
        if (filesaver.abort) {
            filesaver.abort();
        }
    }, false);

This isn't that useful unless you're saving very large files (e.g. generated video).

![Tracking image](https://in.getclicky.com/212712ns.gif)

  [1]: http://www.w3.org/TR/file-writer-api/#the-filesaver-interface
  [2]: http://eligrey.com/demos/FileSaver.js/
  [3]: https://developer.mozilla.org/en-US/docs/DOM/Blob
  [4]: https://github.com/eligrey/Blob.js
  [5]: https://github.com/eligrey/canvas-toBlob.js
