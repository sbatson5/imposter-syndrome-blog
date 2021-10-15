---
title: "Last (Vuex) Action Hero"
date: "2019-09-27T03:11:14.857Z"
template: "post"
draft: false
slug: "/posts/last-vuex-action-hero/"
category: "Engineering"
banner: "https://miro.medium.com/max/1200/0*E0IPtZKFPm_LVbfM"
filename: "Last-(Vuex)-Action-Hero.md"
tags:
  - "Engineering"
  - "Vue"
  - "JavaScript"
  - "Web Development"
description: "Do you want your app users to have a seamless experience? In this post we show how to implement a “retry last action” feature in Vuex that allows failed API calls to be retried without disrupting the user."
---

![Action Clapper](https://miro.medium.com/max/10796/0*E0IPtZKFPm_LVbfM)

At Upstatement we’re currently developing a pair of mobile apps using NativeScript-Vue, which lets us build fully featured Android/iPhone apps with a framework we already know and love: Vue and Vuex. 
Apart from the general challenges of native applications (such as offline states and navigation), we had to rethink our approach to some data management. 
Specifically, managing seamless retries when users can’t easily click back or refresh the app themselves.

## The Project

Our project has 3 major pieces:
1. The mobile app (Android and iOS)
1. A web-based admin tool (also built in Vue)
1. A Node.js API with Express that powers both

We use Google’s Cloud Firestore to house our data (this isn’t a post about Firestore… sorry). 
However, our clients don’t communicate directly with Firestore, but instead rely on our API to handle that communication. 
Since there are a few other systems that our apps talk to, it made sense to have the API handle all of this and make the front-end as dumb as possible.

The only time our front-end applications communicate with something other than the API is for authentication. 
We authenticate with Firebase and leverage a lot of the great auth features that come out of the box. 
So, the front-end knows who is logged in, but how do we communicate that to our Node API?

## Auth with Firebase

This is when we have to get an “ID Token” from Firebase. 
Again, this isn’t a Firebase/Firestore blog post, but for full context, the flow is as follows:

1. Authenticate with Firebase
2. Request an “ID Token” from Firebase
3. Attach that token as an “Authorization” header for every request to our API
4. The API checks that token against Firestore to make sure you are who you say you are (and handle any appropriate permissions or scoping)

Ok, that was a lot of context to get to the crux of the problem. 
Sometimes, that token expires and a request will fail if that happens. 
In a web app, simply refreshing the page fixes the issue, but for our native app, the user would have to completely quit out and relaunch in order to refresh the token.

<figure>
  <blockquote>
    <p>Why don’t you just implement pull-to-refresh?</p>
    <footer>
      <cite>— Other developers with opinions.</cite>
    </footer>
  </blockquote>
</figure>

Pull-to-refresh is not the same as hitting refresh in the browser. 
It is simply a hook we can listen to and it is up to us to call all the right actions/functions when a user triggers this. 
Yes, we could implement a giant “pull-to-refresh” feature that essentially reloads the app, but that would be overkill given that the user probably just wants the latest records. 
More importantly, though, it won’t be obvious to the user why requests are failing, so they may not think to try it.

Also, if that solved all of our problems, then I wouldn’t have a blog post… so… there’s that.

## The Solution

Now, we could obviously check to see if the token is expired before every request, but that is a lot of overhead, especially when you consider the API is checking that anyway. 
So, we have the API send back a specific error when this happens:

Here is our isAuthenticated middleware method we wrote in Express for our NodeJS API:

```javascript
const isAuthenticated = async (req, res, next) => {
  const { headers } = req;

  if (headers && headers.authorization) {
    try {
      // Fetch the user from our cache or from firebase if no cache exists
      const user = await getOrSetUserFromCache(headers);
      if (!user) {
        return res.status(403).json({ message: 'You must be authenticated.' });
      }
      // If there is a user matching the auth token,
      // set that as the user on the request and pass it along
      req.user = user;

      next();
    } catch (e) {
      // This is the error code firebase gives us if the token expires
      if (e.code === 'auth/id-token-expired') {
        return res.status(401).json({ error: 'Firebase token has expired' });
      }
      logError(e);
      return res.status(422).json({ error: e.message });
    }
  }
};
```
<aside>Checking the auth token in node</aside>

We send back a 401 status code with an error saying “Firebase token has expired.” 
This means that within our front-end applications, we can look for this error and refetch our id token if necessary. 
Seems simple, right?

The issue is that we want a seamless experience for our app users — if an API call fails for this reason, our app should be smart enough to retry that same request after the token has been refreshed. 
Since we need this token for every request (because all of our data is scoped), we would have to write handlers for every single Vuex action…

![Nope](https://media.giphy.com/media/xTiTnCQ47e1DXdkaw8/giphy.gif)

What if we could just tell our application to retry the last action? How can we do that without copying and pasting the same block of code over and over?

That’s when we had the idea to leverage the object prototype of our store instance and make Vuex track this for us!

Our store/index file returns a new Vuex.Store instance. 
This is then imported in our `main.js` file, which is where a lot of the NativeScript initialization happens. 
So, to get Vuex to track the last action for us, we do this:

```javascript
import store from '@/store';

// Store the initial instance of the store's dispatch function
const initialDispatch = store.dispatch;

// overwrite `dispatch` on store so that it additionally tracks
// which function was called last
// this is used so we can retry any given function if auth has expired
Object.defineProperty(store, 'dispatch', {
  value(name, payload) {
    store.commit('LAST_DISPATCHED_ACTION', { name, payload });
    return initialDispatch(...arguments);
  },
});
```
<aside>Overwrite store.dispatch for Vuex</aside>

It’s important that we store initialDispatch in a variable so that we can ultimately call it the way it intends. 
Right now, dispatch only accepts two arguments: name and payload but we use ...arguments here just in case that changes in a future version (plus, it makes us look smart).

Since we are using store.commit, we do need a mutation that matches this given key. 
Our `LAST_DISPATCHED_ACTION` mutation could look something like this:

```javascript
const mutations = {
  ...
  'LAST_DISPATCHED_ACTION': (state, actionObject) => {
    state.lastDispatchedAction = actionObject;
  },
  ...
}
```

We simply save an object that reflects what we were trying to dispatch before. 
Now, when something fails, we can look at lastDispatchedAction and try to dispatch it again. 
But we can even take this a step further and add a convenience method to our store. 
Since we’re overwriting the object anyway, we can follow that same pattern:

```javascript
Object.defineProperty(store, 'retryLastAction', {
  value() {
    const { name, payload } = store.state.lastDispatchedAction;
    return store.dispatch(name, payload);
  },
});
```
<aside>Add “retryLastAction” method to Vuex store</aside>

Now, at any time, we can simply call store.retryLastAction() and our app is smart enough to call the last thing that failed with the same exact parameters. 
So, how does this look in practice? Here is an example of some actions:

```javascript
import firebase from 'nativescript-plugin-firebase';
import { api } from '@/utils';
import store from '@/store';

/**
 * If we get an auth token failure, refresh it with firebase and try calling the same action again.
 * Otherwise, log an error listing which one failed
 */
const catchError = error => {
  const { status, data } = error.response;
  const { lastDispatchedAction, firebaseAuthUser } = store.state;

  if (status === 401 && data.error === 'Firebase token has expired') {
    return firebaseAuthUser.getIdToken(true)
      .then(idToken => {
        setToken(idToken); // Function to set token as a header
        return store.retryLastAction();
      })
      .catch(error => {
        console.error('📣: Could not fetch token from firebase', error);
        return store.dispatch('logout');
      });
  } else {
    console.error(`📣: ${lastDispatchedAction.name} -> error`, error);
    throw error;
  }
};

const actions = {
  // Set onboarding content
  setWelcomeContent({ commit }) {
    return api.get(`/content`)
      .then(response => {
        commit('SET_WELCOME_CONTENT', response.data);
      })
    .catch(catchError);
  },
  
  setProfile({ commit }, payload) {
    return api.post('/profile', payload)
      .then(response => {
        commit('SET_PROFILE', response.data);
      })
      .catch(catchError);
  }
  // etc.
};
```
<aside>Vuex Actions</aside>

There’s a lot going on here but the crux of it all is in the catchError method. 
We can look for that specific 401 error and if we see it, call our handy retryLastAction method. 
If we get a failure for another reason and can’t resolve it, we can have a nice error log that specifically lists which action failed.

Best of all, we could use this for a lot of different cases. 
What if the user loses internet connection briefly? Just retry!

This isn’t right for all cases and there is a caveat here that multiple actions could fire before a promise is resolved. 
For example, you make a request, it errors, but by the time the error is returned, you’ve made other requests and the “last action” is no longer accurate. 
So, use with caution. However, there is some value in knowing the last thing attempted.

And yes, we use emojis in our error logging. 
We take our jobs seriously, but we like to have fun.

*Originally published by [Scott Batson](https://github.com/sbatson5) on [Upstatements's Blog](https://medium.com/stories-from-upstatement/last-vuex-action-hero-f8482c985b27).*