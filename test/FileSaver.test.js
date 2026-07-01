// Test suite for FileSaver.js
//
// The library has zero tests upstream. This file boots a JSDOM environment so
// the browser-only globals (window, document, navigator) are available, then
// loads src/FileSaver.js directly (no transpilation) and exercises the
// functions it exports.
//
// Run with: npm test

const { JSDOM } = require('jsdom')
const assert = require('assert')
const fs = require('fs')

// --- helpers ---------------------------------------------------------------

function bootDom ({ ua = 'Mozilla/5.0 (Test)' } = {}) {
  const dom = new JSDOM(
    '<!doctype html><html><head></head><body></body></html>',
    { url: 'http://localhost/', pretendToBeVisual: true }
  )
  // Override userAgent so platform-specific branches (macOS-WebView, Chrome
  // iOS) are deterministic across hosts.
  Object.defineProperty(dom.window.navigator, 'userAgent', { value: ua, configurable: true })
  return dom
}

// Load src/FileSaver.js in the *current* jsdom window. Returns the saveAs
// function the library attached, plus the module.exports value.
function loadFileSaverInWindow (dom) {
  const code = fs.readFileSync(require.resolve('../src/FileSaver.js'), 'utf8')
  const mod = { exports: {} }
  // The library references a handful of globals that aren't automatically
  // visible inside `new Function(code)` because that creates a fresh scope.
  // Pass the ones the source actually touches.
  const globals = {
    HTMLAnchorElement: dom.window.HTMLAnchorElement,
    Blob: dom.window.Blob,
    FileReader: dom.window.FileReader,
    MouseEvent: dom.window.MouseEvent,
    XMLHttpRequest: dom.window.XMLHttpRequest,
    URL: dom.window.URL,
    HTMLElement: dom.window.HTMLElement,
  }
  const args = ['module', 'window', 'document', 'navigator', 'self', ...Object.keys(globals)]
  // eslint-disable-next-line no-new-func
  new Function(...args, code)(
    mod, dom.window, dom.window.document, dom.window.navigator, dom.window,
    ...Object.values(globals)
  )
  return { saveAs: dom.window.saveAs, moduleExports: mod.exports }
}

// Load src/FileSaver.js in a *worker-like* context: `self` is defined but
// `window` is not. The library's no-op branch at the top of `var saveAs = ...`
// is taken.
function loadFileSaverAsWorker () {
  const code = fs.readFileSync(require.resolve('../src/FileSaver.js'), 'utf8')
  const mod = { exports: {} }
  const workerSelf = { self: null }
  workerSelf.self = workerSelf // self.self === self → worker branch
  // eslint-disable-next-line no-new-func
  new Function('module', 'self', code)(mod, workerSelf)
  return mod.exports
}

// --- tests -----------------------------------------------------------------

describe('FileSaver.js', () => {
  describe('web worker no-op (#779, PR #779)', () => {
    it('logs an error to console.error instead of failing silently', () => {
      const workerSaveAs = loadFileSaverAsWorker()
      assert.strictEqual(typeof workerSaveAs, 'function')

      const errors = []
      const origError = console.error
      console.error = (...args) => errors.push(args.map(String).join(' '))
      try {
        workerSaveAs()
      } finally {
        console.error = origError
      }

      assert.strictEqual(errors.length, 1, `expected exactly one console.error, got ${errors.length}`)
      assert.match(errors[0], /web worker/i, 'error message should mention web worker')
      assert.match(errors[0], /eligrey\/FileSaver\.js/, 'error message should link to the repo issue')
    })
  })

  describe('module loading', () => {
    it('attaches saveAs to window when loaded as a <script>', () => {
      const dom = bootDom()
      const { saveAs } = loadFileSaverInWindow(dom)
      assert.strictEqual(typeof dom.window.saveAs, 'function')
      assert.strictEqual(dom.window.saveAs, saveAs)
    })

    it('exposes saveAs via module.exports for CommonJS consumers', () => {
      const dom = bootDom()
      const { saveAs, moduleExports } = loadFileSaverInWindow(dom)
      assert.strictEqual(typeof moduleExports, 'function')
      assert.strictEqual(moduleExports, saveAs)
    })

    it('does not throw when loaded in a normal browser context', () => {
      const dom = bootDom()
      assert.doesNotThrow(() => loadFileSaverInWindow(dom))
    })
  })
})