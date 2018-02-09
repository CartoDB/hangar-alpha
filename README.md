# hangar-alpha

Share frontend assets between different web repositories

## Development

The workflow for development will be usually this:

* Run `grunt dev` in one tab to see the styleguide html view working, which is open by default.
* Run `grunt test` in another tab to run the tests. This uses karma underneath.

For more details, take a look to the `Grunfile` to see all tasks available.

## Release

In order to release a new version of Hangar, from master branch run:

```
npm run release
```

This will make a new build, publish the new version to github pages and then launch the interactive UI that guides you through publishing a new version to npm and unpkg:

![hangar-release](https://user-images.githubusercontent.com/1366843/36023755-d37be730-0d8d-11e8-8e35-8c5abc460c4d.png)

## CDN

As we already published hangar to npm, unpkg.com is the best choice, and the good thing is, we don't need to do anything to version the assets:

* https://unpkg.com/hangar-alpha@0.1.22/dist/js/hangaralpha.js
* https://unpkg.com/hangar-alpha@0.1.22/dist/css/hangaralpha.css

Use @latest as latest version.
