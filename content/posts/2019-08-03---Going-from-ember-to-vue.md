---
title: "Going From Ember to Vue"
date: "2019-08-03T17:02:38.041Z"
template: "post"
draft: false
slug: "/posts/going-from-ember-to-vue/"
category: "Engineering"
banner: "https://miro.medium.com/max/3840/1*nfvapd86apvGH-hNBYkYuw.png"
filename: "Going-from-ember-to-vue.md"
tags:
  - "Engineering"
  - "Ember"
  - "Vue"
  - "JavaScript"
  - "Web Development"
description: "Thinking of looking into another framework other than Ember? React might seem like the obvious choice due to popularity, but consider taking a look at Vue first!"
---

![Vue.js logo](https://miro.medium.com/max/3840/1*nfvapd86apvGH-hNBYkYuw.png)

If you know me, you know that I love Ember and have worked with it (and the community) for several years.
But recently, I took another job where I won't be writing it anymore [(I wrote a whole post about this if you're interested)](/posts/a-few-thoughts-on-ember/).
My first instinct when looking for a new job was to learn React, due to popularity.
But I found it was hard to jump straight from Ember into React; not impossible, but I felt I had to unlearn some habits that I had formed.
For the past few months though, I have been working on a Vue project and I have found the leap from Ember to Vue was much more straight forward.

So, I was going to take some time and write about the similarities and differences I have experienced.
Even if you still love Ember and plan on working with it for a while, I would encourage you to look at Vue just to see what else is out there.

# Some big differences

Much like React, Vue is a component library -- which means you'll be using components for <strong>everything.</strong>
That means no controllers or route objects.
When you create a route, you are pointing to a component.
There is literally nothing special about this component -- it can be literally any component that you want (in fact, you can use it both as a route _and_ component on the page... although, you really shouldn't).

In my opinion, this is a good habit to get into as it will help you transition to something like React down the line if you have to.

## Batteries aren't included

![Batteries](https://i.imgur.com/65SKMnM.jpg?1)
<aside>Photo by <a href="https://www.pexels.com/@hilaryh">Hilary Halliwell on Pexels</a></aside>

This isn't meant to be a knock on Vue, but it doesn't come with as much stuff out of the box as Ember.
In fact, this is probably a huge plus.
[Vue CLI](https://cli.vuejs.org/) allows you to generate a project quickly, but much like Create React App, you are getting a pretty simple UI application with webpack pre-configured for you.
And yes, webpack over Brocolli is another big difference... but it's probably a good one.

However, anything you want to do in ember, probably already has an equivalent library in Vue.
And most of these libraries are maintained by core team members, so they feel very official.
With just a couple more `vue add` commands, you can get routing and state management in your app, so it's really not a _huge_ knock against Vue.

## Components are one file

I found this weird at first, but boy, do I like components with both markup and JavaScript in the same file.
I hated having to bounce between files so often in Ember (especially when the community wanted to move away from pod structure).

<figure>
  <blockquote>
    <p>Ugh, markup and JS in the same file?? I believe in separation of concerns.</p>
    <footer>
      <cite>— People who want you to know they're smart.</cite>
    </footer>
  </blockquote>
</figure>

I've actually heard this complaint a few times about "I don't like JS/HTML/CSS in the same file because I like separation of concerns."
I get the sentiment, but to be clear, just because "concerns" are in the same file, doesn't mean they aren't separated.
The JavaScript of a component is too tightly tied to the markup (as it should be), so why force yourself to bounce between the two files?

## State management

The popular state management solution seems to be [Vuex](https://vuex.vuejs.org/) (another "official" Vue library written by core team members).
This is much closer to [Redux](https://redux.js.org/) or [NGRX](https://ngrx.io/).
I'm not going to claim that these patterns are the end-all-be-all solutions for state management on the front-end, but it's where most of the community seems to be going right now.
Which is a huge plus over Ember.
The skills/practices you pick up writing Vuex will translate to these other libraries.

You are also much more explicit when updating your "store" and that makes it feel so much less magical than Ember Data.
No, there's no identity mapping or convenient CRUD methods, but that also means you get to be more flexible with how you request data (and as a result, you'll probably be much more aware of what is going on in your application).

# Similarities

![Spider-Man pointing to Spider-Man](https://i.kym-cdn.com/entries/icons/mobile/000/023/397/C-658VsXoAo3ovC.jpg)

Ok, let's talk about the similarities (which is really the point of this post).

## Components

Components in Vue are more similar to Ember than the ones in React.
First of all, you aren't writing JSX -- you are writing plain ol' HTML.

Here is a typical setup for a component in Vue:

```html
<template>
  <div>
    <SomeCustomComponent :title="title" @click="someMethod" />
  </div>
</template>

<script>
import SomeCustomComponent from './somewhere/SomeCustomComponent';

export default {
  name: 'YourComponent',
  
  components: {
    SomeCustomComponent
  },

  props: {
    jobs: {
      type: Array,
      required: false,
    }
  },

  data() {
    return {
      firstName: 'Scott',
      lastName: 'Batson',
      title: 'Boss'
    }
  },

  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  },

  methods: {
    someMethod() {
      this.$store.dispatch('foo', this.title);
      this.emit('something-that-bubbles');
    }
  }
}
</script>
```

Ok, it might seem like there is a lot there, but not every component will need all of these things.
I just wanted some examples of the major key pieces.

First off, all of the markup is wrapped in a `template`.
After that, you are writing normal HTML.
You call other components just like `<AngleBracket />` components in Ember, but the differences (for now) is that you have to import them.
This saves from potential name collision, as an npm package might have a component with the same name as one of yours.
You could do `import SomeCustomComponent as Monkey from '@something/components';` and rename a component without any magic.

## Methods/Actions

When calling a component, we have similar patterns as Ember.
You need to append a `:` to properties you pass down to a component and `@` for events that map to functions (think `actions`).
`methods` are the equivalent of `actions` in Ember -- if there is a function that is going to be called from the template, it is in the `methods` hash.

If you look at the `someMethod` function, you will see the last line calls `this.emit('something-that-bubbles');`.
This is how we accomplish something similar to "Data Down, Actions Up" (DDAU).
It's a bit different and shouldn't be used for every case, but basically, when we `emit` something, any parent component can listen to that event (in this case `something-that-bubbles`) and respond to it.
This means that child component does not need to receive an action as a parameter.
All it does is emit something, pass any properties along with it and then it stops caring.
It's up to the parent component to listen to it and respond.

One of the things I disliked with the actions helper in Ember was when the child component could call `this.passedAction()` and I would get an error that it wasn't a function because I forgot to pass it down, the child component stopped working.
With emitting, the child component can continue to function.
To be clear: making API calls to your backend should happen through the Vuex store -- mutating applicaton state should not be done with `emit`.
However, if you have buttons component that toggles something on and off, this is a good case for using `emit` as the parent component is most likely the only thing that cares about the event.

## Computed Properties

Properties that needs to be available on the template, need to be declared in the hash returned by the `data` function.
This ends up being really handy in documenting what shows up in your template.
Computed properties are declared in the `computed` hash and behave very similarly.

I love computed properties in Ember and was a bit miffed when there wasn't something similar in React.
With Vue, you declare your computed properties as functions and Vue is smart enough to observe anything you declare within the function.
So, we go from something like this Ember:

```javascript
fullName: computed('firstName', 'lastName', function() {
  return `${this.firstName} ${this.lastName}`;
})
```

To this in Vue:

```javascript
fullName() {
  return `${this.firstName} ${this.lastName}`;
}
```

Computed properties have the same issues in Vue as Ember, in that it won't observe nested keys more than one level deep and it has some issues with observing arrays.

## The Router

![A Router](https://i.imgur.com/xlUWWN7.jpg?1)
<aside>Photo by <a href="https://www.pexels.com/@rawpixel">Rawpixel on Pexels</a></aside>

The router in Vue feels like a good mix between react-router and the Ember Router.
Let's just look at a full example of a router in Vue:

```javascript
import Vue from 'vue';
import Router from 'vue-router';
import { auth } from 'utils';

import { NotFound, Dashboard, Login } from 'routes';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: NotFound
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      meta: {
        layout: 'sidebar',
        requiresAuth: true
      },
      component: Dashboard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      // If they were redirected here, don't bother doing our auth check
      beforeEnter: async (to, from, next) => {
        if (to.params.redirected) {
          next();
        } else {
          if (auth.currentUser) {
            next({ name: 'Dashboard' });
          } else {
            next();
          }
        }
      }
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const { currentUser } = auth;

  // If the page requires authentication
  // make sure they are logged in
  // if they aren't, kick them to the login page
  if (to.meta.requiresAuth) {
    if (currentUser) {
      next();
    } else {
      next({
        name: 'Login',
        params: { redirected: true } // indicate they are redirected
      });
    }
  } else {
    next(); // business as usual
  }
});

export default router;
```

Much like react-router, we specify the route name and point it to a component that we have imported (here, we store them in a `routes/index.js` file, but they could live anywhere).
We can specify a path, just like in Ember but we can also attach additional information in any format we want.
This becomes really handy for when you want to mark some pages as public and some that need authentication.
In Ember, you would do that in the `route.js` file for a particular route/path but in Vue, you handle it all here.
This can be really nice because it allows us to either write one large `beforEach` function, like you see at the bottom of the file or you can write those functions individually for every route (like you see for the `login` route).

So, the pattern is very similar to routes in Ember, but you are keeping your logic in one file rather than spread across a ton of different route object files that may or may not extend from one another.

# Conclusion

I feel like those are the major pieces I found that allowed me to shift into Vue without a steep learning curve.
Obviously, there is so much more to Vue than what is discussed here, but being able to map my mental model of Ember to things within Vue was a big help.
So, if you're looking to move away from Ember or just want to check out another framework, I would recommend starting with Vue!
