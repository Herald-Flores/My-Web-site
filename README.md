# Herald Flores one page

## Quick Start
```
# Install all node packages
npm install

# Get started
gulp serve - starts localhost server with browser-sync, watches HTML, Sass, JS with hot reloading
gulp - minify CSS/JS/IMAGES and builds your app into the build directory, ready for production
```

## Requirements
This project requires you have [nodejs](https://nodejs.org/en/) with [npm](https://www.npmjs.com/get-npm) installed.
This project requires you have a global installation of [gulp](http://gulpjs.com/).
```
# Install gulp globally
npm install -g gulp
```

## Gulp commands
**gulp serve**

The gulp serve command starts a local Browsersync server that serves your files in the browser.
It reloads the current page when changing HTML, PHP, Sass and JS files.
The output of all Sass files go to main.css
All JS files are concatenated into main.js
You can access the development server with other devices on the same network. Go to the "External" address specified by Browsersync (see the terminal) in the web browser of your device.
```
gulp serve
```

**gulp (build)**

The default gulp command is set to creating a "build" directory with a production version of the project, ready to be deployed.
It minifies and renames JS/CSS assets as well as cleaning the old "build" directory. CSS is autoprefixed for the latest two browser versions.
```
gulp
```

**gulp concatScripts**

The gulp concatScripts command combines the specified JS resources into main.js
You can add new JS files to this command on line 16 in gulpfile.js
You might want to run concatScripts once separately after adding new JS files.
```
gulp concatScripts
```

## Overwriting Bootstrap sass variables
You can overwrite specific bootstrap sass variables by uncommenting lines in assets/css/1-frameworks/bootstrap/bootstrap-user-variables.scss

## PHP
If you need a server with PHP support you can use the project with [MAMP Pro](https://www.mamp.info/en/mamp-pro/) or similar.
* Create a new host in the hosts panel of MAMP Pro and choose the project folder as the document root.
* Enable Symlinks settings in the "Extended" tab of the host configuration.
* On line 82 in gulpfile.js change the browserSync.init function to the following:
```
browserSync.init({
    proxy: "http://localhost:8888",
    open: "external"
});
```
* Start the XAMP services and run "gulp serve" as before.
