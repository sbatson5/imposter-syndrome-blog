---
title: "Fixing issues with Drag and Drop in Ember"
date: "2018-07-21T12:05:03.284Z"
template: "post"
draft: false
slug: "/posts/drag-and-drop-on-ios-with-ember/"
category: "Engineering"
banner: "https://i.imgur.com/9uJli8q.jpg"
filename: "Drag-and-Drop-In-Ember.md"
tags:
  - "Ember"
  - "JavaScript"
  - "Engineering"
description: "Drag and drop has some known issues on iOS.  How can we solve this within an ember application?"
---

![Dragon Statue](https://i.imgur.com/9uJli8q.jpg)

At DockYard, we specialize in making Progressive Web Apps (PWAs) that have a close to native feel. Just take our [Hightide application](https://hightide.earth/) as an example [(which was even featured at Google’s Dev Summit in 2017)](https://www.youtube.com/watch?v=5xj4kqSFs8Q&t=52m45s). Part of building these apps is building an intuitive experience that users would expect from a native app such as swiping to move through items or dragging and dropping items to order or sort things on a page.

While working on applications for Netflix, we had a need for an easy drag-and-drop experience. For this, we decided to use [ember-drag-drop](https://github.com/mharris717/ember-drag-drop) as we needed in-depth hooks when items are moved around on the page. For us, users needed to reorder events and we had to persist that order to the backend. With this addon, it worked great… on desktop.

# What was broken?
The majority of our users for this application use iPhones. When we rolled out the first version of the beta of our app in early 2017, we noticed that drag-and-drop worked fine on Android but didn’t do anything on iOS. Trying to move an item up or down the page just caused the window to scroll.

Drag events [did not work on iOS 10](https://caniuse.com/#search=drag), which was the current version when we rolled out the beta of our application. Luckily, there is an npm pack that solves this problem for us: [mobile-drag-drop](https://github.com/timruffles/mobile-drag-drop). However, there were a few caveats that I thought I would walk through so that others don’t run into the same problem.

# Solving drag-and-drop
I created a [simple application](https://github.com/sbatson5/ios-drag-drop-example) with a few items on the index route that we can simply drag around to re-order. The end result of this blog post will be a pull request you can view to see the finished product.

As a baseline, when we deployed the app without `mobile-drag-drop`, our app performed like this:

![No drag or drop](https://media.giphy.com/media/Asm8cSSHB2i87mjUbw/giphy.gif)

Notice that items don’t do anything. The page simply scrolls as the user drags the page up and down.

# Using mobile-drag-drop
How do we get this npm package into our Ember application? Most Ember devs know that the typical workflow to using an npm module is to find an addon that serves a shim. Since we were on the latest version of Ember, we could simply install the npm package.

```bash
npm install mobile-drag-drop --save
```

Be sure to add `--save` here as this will become a dependency of our application.

So, how do we get this into our Ember app? We need to import this package during build-time, which is done by updating our `ember-cli-build.js` file. Here, we can call `app.import('package-name')` to make something globally available. For mobile-drag-drop, there are two files that we would import as such:

```javascript
app.import('node_modules/mobile-drag-drop/index.js');
app.import('node_modules/mobile-drag-drop/default.css');
```

The `index.js` file gives us the polyfill we need to make drag-and-drop work on iOS and the `default.css` file adds the styles to make it appear just as it does on desktop. However, `mobile-drag-drop` offers us a minified version, which we will want to use for production builds. However, we’d also like to keep the non-minified version for development in case we need to debug anything. Our final build file looks like this:

```javascript
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
  });

  app.import({
    production: 'node_modules/mobile-drag-drop/index.min.js',
    development: 'node_modules/mobile-drag-drop/index.js'
  });
  app.import('node_modules/mobile-drag-drop/default.css');
  return app.toTree();
};
```
Now we have `MobileDragDrop` globally accessible. The next step is setting up how we use it within our application. There are a [ton of options](https://github.com/timruffles/mobile-drag-drop#api--options-) available with this package, but for our purposes, we only cared about one thing: `holdToDrag`. This was required as it allowed the user to scroll if they needed to on the page but if they held their finger down, they could drag an item instead.

To set this up, we needed to create an initializer and give it the options we wanted.

```bash
ember generate initializer mobile-drag-drop

installing initializer
  create app/initializers/mobile-drag-drop.js
installing initializer-test
  create tests/unit/initializers/mobile-drag-drop-test.js
```

Now, we can access MobileDragDrop and pass it any options we want:

```javascript
/* global MobileDragDrop */

export function initialize(/* application */) {
  if (typeof MobileDragDrop !== 'undefined') {
    MobileDragDrop.polyfill({
      holdToDrag: 100 // the delay added before allowing the user to drag
    });
  }
}

export default {
  name: 'mobile-drag-drop',
  initialize
};
```

This fixed the issue on iOS, however it added unnecessary noise on other browsers that weren’t experiencing these issues. To get around this, we simply added a check to only use this polyfill on iOS devices. To be clear, this isn’t completely necessary, but it’s always best not to run code when you can avoid it. Sadly, we found that Samsung’s “Internet” app (yes… it’s just called “Internet”) had the same issue. So we had to do some `userAgent` sniffing in order to see if the user was using that browser:

```javascript
/* global MobileDragDrop */

export function initialize(/* application */) {
  let isApple = ['iPhone', 'iPad', 'iPod'].includes(navigator.platform);
  let isSamsung = navigator.userAgent.includes('SamsungBrowser');

  if (typeof MobileDragDrop !== 'undefined' && (isApple || isSamsung)) {
    MobileDragDrop.polyfill({
      holdToDrag: 1
    });
  }
}

export default {
  name: 'mobile-drag-drop',
  initialize
};
```
Now our app was working great for everyone! Drag and drop on mobile wasn’t a problem until…

# iOS 11.3
The most recent release of iOS (as of this writing) caused a new issue for us on the drag-and-drop front.

![Drag and scroll](https://media.giphy.com/media/3FbGERy2RBwYayQGQC/giphy.gif)

Drag and drop is technically working here, but the window still scrolls as the user swipes.

![Facepalm](https://i.imgur.com/iWKad22.jpg)

## How do we fix this?
Unfortunately, this was not a problem we were going to solve by updating our addons. Instead, we needed to determine if the user was trying to drag an item and if so, prevent the window from scrolling. For this to work, we needed to edit the [draggable-object](https://github.com/mharris717/ember-drag-drop/blob/master/addon/components/draggable-object.js) component that we get from `ember-drag-drop`.

In our app, we created our own `draggable-object` component. `ember generate component draggable-object`

Rather than using a default Ember component, we import the object we get from the addon:

```javascript
import DraggableObject from 'ember-drag-drop/components/draggable-object';

export default DraggableObject.extend({
});
```

We don’t really want to edit any of the default behavior here, but instead want to add an event listener to the object that prevents the page from scrolling. We listen for the `touchmove` event and call a “noop” function that stops the window from scrolling. This event listener can be added in the `init` hook but we have to remember to remove the event listener if the component is destroyed. Our updated component looks like this:


```javascript
import DraggableObject from 'ember-drag-drop/components/draggable-object';

const noop = function() {
  return;
};

export default DraggableObject.extend({
  init() {
    this._super(...arguments);
    window.addEventListener('touchmove', noop, { passive: false });
  },

  willDestroyElement() {
    this._super(...arguments);
    window.removeEventListener('touchmove', noop);
  }
});
```

It’s important that you flag the event as `passive: false` as the behavior will persist otherwise. You can [read up on passive event listeners here](https://medium.com/@devlucky/about-passive-event-listeners-224ff620e68c) if you have questions.

Now with this change our draggable objects behave as expected on mobile.

![Working drag and drop](https://media.giphy.com/media/74W84ew8dsk7XgbuMK/giphy.gif)

Not only do we have drag and drop working on iOS and Samsung mobile browsers, but we also did it without adding extra noise to the browsers where it worked properly for us already. If you want to see all of the code added, you can view this [pull request for all of the changes](https://github.com/sbatson5/ios-drag-drop-example/pull/1).

*Originally published by [Scott Batson](https://github.com/sbatson5) on [DockYard's Blog](https://dockyard.com/blog/2018/07/20/drag-and-drop-on-ios-with-ember).*
