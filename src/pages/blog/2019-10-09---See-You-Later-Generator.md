---
title: "See You Later, Generator"
date: "2019-10-19T03:11:14.857Z"
template: "post"
draft: false
category: "Engineering"
banner: "https://miro.medium.com/max/11686/0*ldnC6L7oOGMy3b26"
slug: "/posts/see-you-later-generator/"
tags:
  - "Engineering"
  - "JavaScript"
  - "Web Development"
description: "We had to solve a problem of asyncronous behavior that needed to be cancellable within our Vue app"
---

![A thing I thought was a generator but isn't](https://miro.medium.com/max/11686/0*ldnC6L7oOGMy3b26)

We are building a mobile app with [NativeScript-Vue](https://nativescript-vue.org/) and [Vuex](https://vuex.vuejs.org/) that allows a user to search for events nearby. The user can specify what type of events they want and how far they are willing to travel. The API we integrated with accepts a `radius` which is the number of miles away an event could be (based on the user’s zip code).

The larger the radius, the longer this request will take. In busier areas (like large metropolitan areas), this request could take quite a while; since we were dealing with mobile devices, the user’s connection could also be somewhat slow. On top of that, we had to search multiple types of events as well as events that could apply to any location… which compounds the request time and complexity.

<figure>
  <blockquote>
    <p>Ok, just add a nice loader and move on…</p>
    <footer>
      <cite>— People jumping to conclusions</cite>
    </footer>
  </blockquote>
</figure>

We can’t just add a loading state and ask them to wait because the radius is controlled through a couple of plus and minus buttons. Each click would result in a new API call and if the user decides to spam the button, too many requests might go out.

![Animation of controls increasing count](https://miro.medium.com/max/1168/1*zV-mNQaPGSSuDP52WZJWGQ.gif)

Because the user can increase or decrease this radius so quickly (as well as some other controls that we won’t get into), we have two problems to solve.

1. Throttle the update so that spamming the button only results in one execution
2. If we start making a request and the user then changes the control again, we should be able to safely abandon the last request

<figure>
  <blockquote>
    <p>Simple. `setTimeout` and then cancel it. Done. Ship it.</p>
    <footer>
      <cite>— Me after glancing at the problem</cite>
    </footer>
  </blockquote>
</figure>

First, let’s look at what this Vuex action looks like:

```javascript
const actions = {

  setEvents({ commit }, payload) {
    const { zip, radius } = payload;
    
    api.get('/events/general')
      .then(response => commit('SET_GENERAL_EVENTS', response.data)
      .catch(catchError);

    api.get(`/events/zip/${zip}`, { params: { radius } })
      .then(response => commit('SET_ZIP_EVENTS', response.data))
      .catch(catchError);

    api.get(`/events/students/zip/${zip}`, { params: { radius } })
      .then(response => commit('SET_STUDENT_EVENTS', response.data))
      .catch(catchError);
  },
}
```

This is a somewhat simplified version, but essentially, we have three total requests and each one can take a while depending on where the user is located. So… why can’t I just use a `setTimeout`? Couldn’t I just do:

```javascript
const timer = setTimeout(store.dispatch('setEvents', params), 500);
// then some stuff happens
clearTimeout(timer);
```

This would mean that our action would only be executed every half second, which is a reasonable amount of time when spamming buttons.

The problem is that you can only cancel a timer *before it starts*. Once that function fires, it will execute from start to finish, even if those promises take a while. As far as the timer is concerned, it did its job. This is a problem because these promises are going to resolve then commit things to our store, even if they aren’t up to date anymore.

In this scenario, we could start our request, searching events within 200 miles (a request that takes a while). Then, they could spam the button and search within 25 miles (a request that doesn’t take long). In this case, the 25 miles promise resolves first and commits its payload to our store. *Then*, the 200 miles promise resolves and commits its content… even though it’s out of date.

Wouldn’t it be nice if we could abandon that function entirely, even if it started already?

This is when we started looking at [generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).

![Generator Meme that is hilarious, trust me](https://miro.medium.com/max/1000/1*UYDyVipXT8T5Tzc1n9yK3w.jpeg)

If you aren’t familiar with generator functions, here are the Cliff’s Notes:
- They allow us to iterate over a function
- We can safely stop them and they *actually stop executing*

Here is the most basic example:

```javascript
function* genFunction() {
  yield 'Hi there!';
  yield 'Is this working?';
  yield 'Bye 👋';
};

const ourMethod = genFunction();

ourMethod.next();
// {value: "Hi there!", done: false}

ourMethod.next();
// {value: "Is this working?", done: false}

ourMethod.next();
// {value: "Bye 👋", done: false}

ourMethod.next();
// {value: undefined, done: true}
```

A generator function is something that we actually have to step through. When we call `next`, it returns an object with two properties. `value` is whatever we `yield`ed and `done` is whether or not the generator function has anything left to do.

If at any time we wanted to abandon this function, we could call `ourMethod.return()`. Now, even if we call `next()`, our function won’t do anything since we told it to stop.

So, if we want to “throttle” our Vuex action, how would we do that?

1. Wrap the whole thing in a generator function
2. `yield` each promise
3. Only call `next()` when the last promise has resolved
4. If we call the function again, check to see if there is already an instance of this generator function running. If there is, call `return()` to stop it

The last item in this list is the trickiest part. We need a way to know which function was called last.[ If you read my last blog post, we came up with a way of extending the Vuex store to know what the “last action” called was](https://medium.com/stories-from-upstatement/last-vuex-action-hero-f8482c985b27). I’m going to use that here but you could easily just pass a unique string to track this yourself.

I created a separate util file that I could import. This file has 2 things:

1. `Concurrency` class — this is *only* for saving the instance of these functions so I can cancel them
2. `throttle` function — this function takes a generator function. It cancels any previously running instances of that function. Then steps through each `yield` block until it’s finished

```javascript
import store from '@/store';

/**
 * A simple class we create just for tracking our running functions
 */
class Concurrency {
  get(key) {
    return this[key] || {};
  }

  set(key, value) {
    this[key] = value;
  }
};

const concurrencyInstance = new Concurrency();

/**
 *
 * @param {function} generatorFunction to be called
 * @param {number} timeToWait time in milliseconds - default half a second
 */
const throttle = (generatorFunction, timeToWait = 500) => {
  // I explain how I got this convenient method in a blog post:
  // https://medium.com/stories-from-upstatement/last-vuex-action-hero-f8482c985b27
  // Get the name of the last action called
  const { name } = store.state.lastDispatchedAction;

  // See if there is a stored function with the same name as the one we are trying
  const instanceFunction = concurrencyInstance.get(name);

  // If there is, stop it from running
  if (instanceFunction.return) {
    instanceFunction.return();
  }

  // Reset it with the new version of the function we just received
  const newInstance = generatorFunction();
  concurrencyInstance.set(name, newInstance);

  // An internal function that will actually execute our generator function
  const run = async () => {
    // Go to the next yield block
    const result = newInstance.next();

    // Generator functions have a concept of `done`
    // Which means they have completed any task written or been cancelled
    if (result.done) {
      return result.value;
    } else {
      // if it is not finished, wait for the promise to resolve and go onto the next promise
      await result.value;
      run();
    }
  };

  // Wait a small amount of time before actually completing the function
  // Meaning we won't ever call the same function more than once in a small period of time
  setTimeout(run, timeToWait);
};

export { throttle, concurrencyInstance };
```

I tried to leave some useful comments (which makes the file look a lot bigger than it really is).

Our `throttle` function waits half a second before executing our action and then steps through it, waiting for each individual promise to resolve before moving onto the next one.

Now we just wrap everything up in a generator function that is passed to our `throttle` method:

```javascript
import { api, throttle } from '@/utils';

const actions = {

  setEvents({ commit }, payload) {
    throttle(function* () {
      const { zip, radius } = payload;

      yield api.get('/events/general')
        .then(response => commit('SET_GENERAL_EVENTS', response.data)
        .catch(catchError);

      yield api.get(`/events/zip/${zip}`, { params: { radius } })
        .then(response => commit('SET_ZIP_EVENTS', response.data))
        .catch(catchError);

      yield api.get(`/events/students/zip/${zip}`, { params: { radius } })
        .then(response => commit('SET_STUDENT_EVENTS', response.data))
        .catch(catchError);
    })
  },
}
```

If our user spams that button, we will only ever execute our API requests every half second. Then, if they click the button again before any of these promises are solved, we safely stop the request, avoid committing anything incorrect to the store, and then start over.

Generator functions are great for use cases like this: debouncing and throttling functions but they can be used for so much more. Really, any time you have to iterate over something, generators are a great solution. As well as any time you have to use `setTimeout` but then write logic around cancelling it. Consider a generator as a more robust solution.


*Originally published by [Scott Batson](https://github.com/sbatson5) on [Upstatements's Blog](https://medium.com/stories-from-upstatement/see-you-later-generator-a3da3a8ef699).*