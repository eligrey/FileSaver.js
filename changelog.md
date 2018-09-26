# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0-rc.2] - 2018-09-26

- Added a changelog.md
- Reverted `a.click()` to use dispatch with a try-catch (#382)
- Made third argument to an object where you have to pass `{ autoBom: true }`
  - boolean are depricated but still works

## [2.0.0-rc.1] - 2018-09-26

- saveAs don't return anything
  - The object that dispatched `writestart progress write writeend` are gone
  - detecting such features was never possible and nobody seems to use it.
- Removed the demo folder
- Removed date/version from top of the file
- Dosen't crash in web workers (#449)
- Support saving urls (#260 with workarounds for cross origin)
- Uses babel universal module pattern (UMD) to export the package
- Provides source map now as well.
- use a[download] before msSaveAs (#193, #294)
- removed dist from .gitignore (npm uses it if it don't find a .npmignore)
- autoBom is now reversed so you have to tell when you want to use autoBom (#432)
- `a.click()` since there are new and depricated event constructors that works differently (#382)
- opens up a new popup (tab) directly for the fallback method since the FileReader is async
- removed the explicitly MSIE [1-9] check
