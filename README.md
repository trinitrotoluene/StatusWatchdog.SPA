# ServiceWatchdog.SPA

This is the public facing client application for ServiceWatchdog. It's referenced by the web components of the service as a git submodule so you should rarely need to clone this repository directly.

## Getting started

```
npm install

npm run watch
```

### Compiles and minifies for production

To customise the title of the webpage, edit the `name` property in `package.json`.

```
npm run build
```

In order for the client application to be served correctly by the web component, the build artifacts in `../wwwroot` must be located in the `wwwroot` folder of the API project. This will be done automatically if this repository is cloned as a submodule.
