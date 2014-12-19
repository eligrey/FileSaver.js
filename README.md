FileSaver.js
============

FileSaver.js implements the HTML5 W3C `saveAs()` FileSaver interface in browsers that do
not natively support it. There is a [FileSaver.js demo][1] that demonstrates saving
various media types.

FileSaver.js is the solution to saving files on the client-side, and is perfect for
webapps that need to generate files, or for saving sensitive information that shouldn't be
sent to an external server.

Looking for `canvas.toBlob()` for saving canvases? Check out
[canvas-toBlob.js](https://github.com/eligrey/canvas-toBlob.js) for a cross-browser implementation.

Supported browsers
------------------

| Browser        | Constructs as | Filenames    | Max Blob Size | Dependencies |
| -------------- | ------------- | ------------ | ------------- | ------------ |
| Firefox 20+    | Blob          | Yes          | 800 MiB       | None         |
| Firefox < 20   | data: URI     | No           | n/a           | [Blob.js](https://github.com/eligrey/Blob.js) |
| Chrome         | Blob          | Yes          | 345 MiB       | None         |
| Chrome for Android | Blob      | Yes          | 345 MiB       | None         |
| IE 10+         | Blob          | Yes          | 600 MiB       | None         |
| Opera 15+      | Blob          | Yes          | 345 MiB       | None         |
| Opera < 15     | data: URI     | No           | n/a           | [Blob.js](https://github.com/eligrey/Blob.js) |
| Safari 6.1+*   | Blob          | No           | ?             | None         |
| Safari < 6     | data: URI     | No           | n/a           | [Blob.js](https://github.com/eligrey/Blob.js) |

Feature detection is possible:

```js
try {
    var isFileSaverSupported = !!new Blob;
} catch (e) {}
```

### IE < 10

It is possible to save text files in IE < 10 without Flash-based polyfills.
See [ChenWenBrian and koffsyrup's `saveTextAs()`](https://github.com/koffsyrup/FileSaver.js#examples) for more details.

### Safari 6.1+

Blobs may be opened instead of saved sometimes—you may have to direct your Safari users to manually
press <kbd>⌘</kbd>+<kbd>S</kbd> to save the file after it is opened. Using the `application/octet-stream` MIME type to force downloads [can cause issues in Safari](https://github.com/eligrey/FileSaver.js/issues/12#issuecomment-47247096).

### iOS

saveAs must be run within a user interaction event such as onTouchDown or onClick; setTimeout will prevent saveAs from triggering. Due to restrictions in iOS saveAs opens in a new window instead of downloading, if you want this fixed please [tell Apple](https://bugs.webkit.org/show_bug.cgi?id=102914) how this bug is affecting you.

Syntax
------

```js
FileSaver saveAs(in Blob data, in DOMString filename)
```

Examples
--------

### Saving text

```js
var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
saveAs(blob, "hello world.txt");
```

The standard W3C File API [`Blob`][3] interface is not available in all browsers.
[Blob.js][4] is a cross-browser `Blob` implementation that solves this.

### Saving a canvas

```js
var canvas = document.getElementById("my-canvas"), ctx = canvas.getContext("2d");
// draw to canvas...
canvas.toBlob(function(blob) {
    saveAs(blob, "pretty image.png");
});
```

Note: The standard HTML5 `canvas.toBlob()` method is not available in all browsers.
[canvas-toBlob.js][5] is a cross-browser `canvas.toBlob()` that polyfills this.


![Tracking image](https://in.getclicky.com/212712ns.gif)

  [1]: http://eligrey.com/demos/FileSaver.js/
  [3]: https://developer.mozilla.org/en-US/docs/DOM/Blob
  [4]: https://github.com/eligrey/Blob.js
  [5]: https://github.com/eligrey/canvas-toBlob.js

Contributing
------------

The `FileSaver.js` distribution file is compiled with Uglify.js like so:

```bash
uglifyjs FileSaver.js --comments /@source/ > FileSaver.min.js
```

Please make sure you build a production version before submitting a pull request.
