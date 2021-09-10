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
My first instinct when looking for a new job was to learn React, due to popularity, but I found it was hard to jump straight from Ember into React.
It wasn't impossible, but I felt I had to unlearn some habits that I had formed.
For the past few months though, I have been working on a Vue project and I have found the leap from Ember to Vue was much more straight forward.

So, I was going to take some time and write about the similarities and differences I have experienced.
Even if you still love Ember and plan on working with it for a while, I would encourage you to look at Vue just to see what else is out there.

## What's the point of this post?

I mostly want to focus on what similarities exist to encourage those writing Ember to try taking a look at Vue.
Obviously, there are too many differences to list, so I just want to talk about some major points.

# Some big differences

Much like React, Vue is a component library -- which means you'll be using components for <strong>everything.</strong>
That means no controllers or route objects.
When you create a route, you are pointing to a component.
There is literally nothing special about this component -- it can be any component that you want (in fact, you can use it both as a route _and_ component on the page... although, you really shouldn't).

## Batteries aren't included

![Batteries](https://i.imgur.com/65SKMnM.jpg?1)
<aside>Photo by <a href="https://www.pexels.com/@hilaryh">Hilary Halliwell on Pexels</a></aside>

This isn't meant to be a knock on Vue, but it doesn't come with as much stuff out of the box as Ember.
[Vue CLI](https://cli.vuejs.org/) allows you to generate a project quickly, but much like [Create React App](https://github.com/facebook/create-react-app), you are getting a pretty simple UI application with webpack pre-configured for you.
And yes, webpack over brocolli is another big difference... but it's probably a good one (noted disclaimer that [ember-embroider](https://github.com/embroider-build/embroider) is helping the community move towards webpack).

However, anything you want to do in ember, probably already has an equivalent library in Vue.
And most of these libraries are maintained by core team members, so they feel very official (unlike the React ecosystem).
With just a couple more `vue add` commands, you can get routing and state management in your app, so "batteries not included" isn't a _huge_ knock against Vue.
In fact, both [Vuex](https://vuex.vuejs.org/) and [Vue Router](https://router.vuejs.org/) are subdomains of the official Vue website -- showing developers that these are real considerations by the core team.
You probably won't find a large Vue application without these things installed already.

## Components are one file

I found this weird at first, but boy, do I like components with both markup and JavaScript in the same file.
I hated having to bounce between files so often in Ember (especially when the community wanted to move away from pod structure).
Disclaimer: there is [currently an rfc that could help move toward single-file components](https://github.com/emberjs/rfcs/pull/454).

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
This is much closer to [Redux](https://redux.js.org/) or [NGRX](https://ngrx.io/) -- if you're familiar with those libraries, you'll be able to jump right into Vuex.
As I [learned from the reviews on this post](https://github.com/sbatson5/imposter-syndrome-blog/pull/14), there are way too many differences to list here as [Ember data](https://github.com/emberjs/data) and Vuex are two very different approaches.
I will say that if you learn Vuex, you'll be able to jump into Redux without issue, which I consider a huge plus.
You might find the learning curve steep here if you have only used Ember data, but it's definitely worth checking out other solutions.

# Similarities

![Spider-Man pointing to Spider-Man](https://i.kym-cdn.com/entries/icons/mobile/000/023/397/C-658VsXoAo3ovC.jpg)

Ok, let's talk about the similarities (which is really the point of this post).

## Components

Components in Vue are more similar to Ember than the ones in React.
Obviously, there is a lot that goes on under the hood, but I just want to focus on how this affects you, the developer.
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
The syntax is just like `<AngleBracket />` components in Ember, but the differences (for now) is that you have to import them.
This saves you from potential name collision, as an npm package might have a component with the same name as yours.
You could do: 
```
import SomeCustomComponent as Monkey from '@something/components';
``` 
and rename a component easily.
Again, this is something in an RFC for Ember already but it cements a point I made in an earlier post that [the resolver is a bit too clever sometimes](/posts/a-few-thoughts-on-ember/#3-make-the-resolver-less-clever).

## Methods/Actions

When using a component, we have similar patterns as Ember.
You need to append a `:` to properties you pass down to a component.
So, if my parent component has a property called `author` and I want to pass `author.name` down to a child component as `fullname`, here is how it would by comparison: 
```html
<!-- Vue -->
<AuthorInfo :fullname="author.name" />
<!-- Ember -->
<AuthorInfo @fullname={{author.name}} />
```
As you can see the syntax isn't hard to learn.

`methods` are the equivalent of `actions` in Ember -- if there is a function that is going to be called from the template, it is in the `methods` hash.
Functions can live outside of that hash (obviously) but this tells you what you expect to interact with your markup.
In Ember, you can call functions on your component by _not_ using the `action` helper, but Vue forces this convention on you, separating your template functions.

If you look at the `someMethod` function, you will see the last line calls `this.emit('something-that-bubbles');`.
This is how we accomplish something similar to "Data Down, Actions Up" (DDAU).
It's a bit different and shouldn't be used for every case, but basically, when we `emit` something, any parent component can listen to that event (in this case `something-that-bubbles`) and respond to it.
This means that the child component does not need to receive an action as a parameter.
All it does is emit something, pass any properties along with it and then it stops caring.
It's up to the parent component to listen to it and respond.

If you are doing something that updates application state, then `emit` and passing functions around isn't the right solution and you should instead rely on Vuex.

One of the things I disliked with the actions helper in Ember was that I might not always pass an action down for every instance of my component.
Say you had a component like this in Ember: 
```html
<!-- Ember component -->
<AuthorInfo @updateProfile={{action "updateProfile"}} />
```
We pass down an action called `updateProfile` which allows the logged in user to update their profile.
However, I want to use that same layout elsewhere when viewing a post, but it isn't editable.
So, I simply don't pass down that action: `<AuthorInfo />`.
If the user triggers that action, however, I will get an error like `this.updateProfile is not a function` (or something similar).
That might be the behavior you want (throwing an error when something isn't properly passed down), but I felt there was a lot of confusion when we moved from `sendAction` to calling the action directly as a function.

With emitting, the child component won't hit that type of error, as all it does is emit something out and it's up to the parent to intercept it.
Calling `this.emit('update-profile')` won't cause an error if parent component doesn't have a method for updating that profile.

## Computed Properties

Properties that needs to be available on the template, need to be declared in the hash returned by the `data` function.
This would be for local state on the component (computed properties and props passed down don't need to be added here).
This ends up being really handy in documenting what shows up in your template.
Computed properties are declared in the `computed` hash and behave very similarly to Ember.

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

Computed properties have the same issues in Vue as Ember, in that it won't observe nested arrays for performance reasons -- instead, you'd usually create an intermediary computed property.

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
The provided hooks (which are called [navigation guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)) can be asynchronous and hold transitions until a promise has resolved.
And we get [route splitting out of the box](https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components).

We can specify a path, just like in Ember but we can also attach additional information in any format we want.
This becomes really handy for when you want to mark some pages as public and some that need authentication or just store meta information for specific pages.
Ember has something similar with `routeDidChange` but if you want to handle everything in a particular route's lifecycle (i.e. `willTransition`, `didTransition`, `beforeModel`, etc.), you'd handle that in an optional `route.js` file.
So, we can do all the same things, with similar approaches, they just happen in different spots.

# Conclusion

I feel like those are the major pieces I found that allowed me to shift into Vue without a steep learning curve.
Obviously, there is so much more to Vue than what is discussed here, but being able to map my mental model of Ember to things within Vue was a big help.
So, if you're really only familiar with Ember but have found it intimidating to jump into something like React, I would recommend you check out Vue.
You might even get a blog post out of it!
