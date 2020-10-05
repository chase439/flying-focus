# Improvements to Original Repository

This is a fork of [flying-focus](https://github.com/NV/flying-focus/). In the original repository, the focus disappears after 150ms. In this fork, it will remain visible when navigating using tab. Also, this fork:
 - adds package.json
 - separates src files (js and scss)
 - modularlizes the libary to work with [turbolinks](https://github.com/turbolinks/turbolinks)
 - jslints javascript
 - removes unnecessary files for the standalone version.

# To Use

Install the package:
```bash
$ npm install @chase439/flying-focus
```

If you're using Turbolinks and jQuery,
```javascript
// Require the javascript inside your application.js
require("@chase439/flying-focus/src/js/flying-focus.js")

// Import stylesheet inside your application.scss
@import "~@chase439/flying-focus/src/scss/flying-focus";

// Activate FlyingFocus
$( document ).on('turbolinks:load', function() {
  FlyingFocus.start();
});
```

If you're using native JavaScript, add the script and stylesheet files to your HTML and then activate it:
```javascript
// Activate FlyingFocus
document.addEventListener("DOMContentLoaded", function() {
  FlyingFocus.start();
});
```

# [Focus Transition](http://n12v.com/focus-transition/)

![Flying Focus icon](http://nv.github.io/flying-focus/chrome/icon_128.png)

Flying Focus is a UI concept. It adds a transition to the focus outline when you tab around inputs, buttons, and links.
