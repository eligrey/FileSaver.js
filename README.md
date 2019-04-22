If you need to save really large files bigger then the blob's size limitation or don't have
enough RAM, then have a look at the more advanced [StreamSaver.js][7]
that can save data directly to the hard drive asynchronously with the power of the new streams API. That will have
support for progress, cancelation and knowing when it's done writing

FileSaver.js [![Backers on Open Collective](https://opencollective.com/filesaverjs/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/filesaverjs/sponsors/badge.svg)](#sponsors) 
============

FileSaver.js is the solution to saving files on the client-side, and is perfect for
web apps that generates files on the client, However if the file is coming from the
server we recommend you to first try to use [Content-Disposition][8] attachment response header as it has more cross-browser compatiblity.

Looking for `canvas.toBlob()` for saving canvases? Check out
[canvas-toBlob.js][2] for a cross-browser implementation.

Supported Browsers
------------------

| Browser        | Constructs as | Filenames    | Max Blob Size | Dependencies |
| -------------- | ------------- | ------------ | ------------- | ------------ |
| Firefox 20+    | Blob          | Yes          | 800 MiB       | None         |
| Firefox < 20   | data: URI     | No           | n/a           | [Blob.js](https://github.com/eligrey/Blob.js) |
| Chrome         | Blob          | Yes          | [2GB][3]      | None         |
| Chrome for Android | Blob      | Yes          | [RAM/5][3]    | None         |
| Edge           | Blob          | Yes          | ?             | None         |
| IE 10+         | Blob          | Yes          | 600 MiB       | None         |
| Opera 15+      | Blob          | Yes          | 500 MiB       | None         |
| Opera < 15     | data: URI     | No           | n/a           | [Blob.js](https://github.com/eligrey/Blob.js) |
| Safari 6.1+*   | Blob          | No           | ?             | None         |
| Safari < 6     | data: URI     | No           | n/a           | [Blob.js](https://github.com/eligrey/Blob.js) |
| Safari 10.1+   | Blob          | Yes          | n/a           | None         |

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

saveAs must be run within a user interaction event such as onTouchDown or onClick; setTimeout will prevent saveAs from triggering. Due to restrictions in iOS saveAs opens in a new window instead of downloading, if you want this fixed please [tell Apple how this WebKit bug is affecting you](https://bugs.webkit.org/show_bug.cgi?id=167341).

Syntax
------
### Import `saveAs()` from file-saver
```js
import { saveAs } from 'file-saver';
```

```js
FileSaver saveAs(Blob/File/Url, optional DOMString filename, optional Object { autoBOM })
```

Pass `{ autoBOM: true }` if you want FileSaver.js to automatically provide Unicode text encoding hints (see: [byte order mark](https://en.wikipedia.org/wiki/Byte_order_mark)).

Examples
--------

### Saving text using `require()`
```js
var FileSaver = require('file-saver');
var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
FileSaver.saveAs(blob, "hello world.txt");
```

### Saving text

```js
var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
FileSaver.saveAs(blob, "hello world.txt");
```

### Saving URLs

```js
FileSaver.saveAs("https://httpbin.org/image", "image.jpg");
```
Using URLs within the same origin will just use `a[download]`.
Otherwise, it will first check if it supports cors header with a synchronous head request.
If it does, it will download the data and save using blob URLs. 
If not, it will try to download it using `a[download]`.

The standard W3C File API [`Blob`][4] interface is not available in all browsers.
[Blob.js][5] is a cross-browser `Blob` implementation that solves this.

### Saving a canvas
```js
var canvas = document.getElementById("my-canvas");
canvas.toBlob(function(blob) {
    saveAs(blob, "pretty image.png");
});
```

Note: The standard HTML5 `canvas.toBlob()` method is not available in all browsers.
[canvas-toBlob.js][6] is a cross-browser `canvas.toBlob()` that polyfills this.

### Saving File

You can save a File constructor without specifying a filename. If the
file itself already contains a name, there is a hand full of ways to get a file
instance (from storage, file input, new constructor, clipboard event). 
If you still want to change the name, then you can change it in the 2nd argument.

```js
// Note: Ie and Edge don't support the new File constructor,
// so it's better to construct blobs and use saveAs(blob, filename)
var file = new File(["Hello, world!"], "hello world.txt", {type: "text/plain;charset=utf-8"});
FileSaver.saveAs(file);
```



![Tracking image](https://in.getclicky.com/212712ns.gif)

  [1]: http://eligrey.com/demos/FileSaver.js/
  [2]: https://github.com/eligrey/canvas-toBlob.js
  [3]: https://bugs.chromium.org/p/chromium/issues/detail?id=375297#c107
  [4]: https://developer.mozilla.org/en-US/docs/DOM/Blob
  [5]: https://github.com/eligrey/Blob.js
  [6]: https://github.com/eligrey/canvas-toBlob.js
  [7]: https://github.com/jimmywarting/StreamSaver.js
  [8]: https://github.com/eligrey/FileSaver.js/wiki/Saving-a-remote-file#using-http-header

Installation
------------------

```bash
# Basic Node.JS installation
npm install file-saver --save
bower install file-saver
```

Additionally, TypeScript definitions can be installed via:

```bash
# Additional typescript definitions
npm install @types/file-saver --save-dev
```

## Contributors

This project exists thanks to all the people who contribute. 
<a href="https://github.com/eligrey/FileSaver.js/graphs/contributors"><img src="https://opencollective.com/filesaverjs/contributors.svg?width=890&button=false" /></a>


## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/filesaverjs#backer)]

<a href="https://opencollective.com/filesaverjs#backers" target="_blank"><img src="https://opencollective.com/filesaverjs/backers.svg?width=890"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/filesaverjs#sponsor)]

<a href="https://opencollective.com/filesaverjs/sponsor/0/website" target="_blank"><img src="https://opencollective.com/filesaverjs/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/filesaverjs/sponsor/1/website" target="_blank"><img src="https://opencollective.com/filesaverjs/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/filesaverjs/sponsor/2/website" target="_blank"><img src="https://opencollective.com/filesaverjs/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/filesaverjs/sponsor/3/website" target="_blank"><img src="https://opencollective.com/filesaverjs/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/filesaverjs/sponsor/4/website" target="_blank"><img src="https://opencollective.com/filesaverjs/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/filesaverjs/sponsor/5/website" target="_blank"><img src="https://opencollective.com/filesaverjs/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/filesaverjs/sponsor/6/website" target="_blank"><img src="https://opencollective.com/filesaverjs/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/filesaverjs/sponsor/7/website" target="_blank"><img src="https://opencollective.com/filesaverjs/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/filesaverjs/sponsor/8/website" target="_blank"><img src="https://opencollective.com/filesaverjs/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/filesaverjs/sponsor/9/website" target="_blank"><img src="https://opencollective.com/filesaverjs/sponsor/9/avatar.svg"></a>


