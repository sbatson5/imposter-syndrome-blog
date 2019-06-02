---
title: "What Does It Mean To Be Enumerable?"
date: "2018-02-21T22:40:32.169Z"
template: "post"
draft: false
slug: "/posts/what-does-it-mean-to-be-enumerable/"
category: "Engineering"
banner: "https://i.imgur.com/7JgR7X5.jpg"
filename: "What-Does-It-Mean-To-Be-Enumerable.md"
tags:
  - "Engineering"
  - "JavaScript"
  - "Web Development"
description: "Understanding the enumerable property and JavaScript `Object.prototype` properties"
---

![Inspecting math papers](https://i.imgur.com/7JgR7X5.jpg)

# Enumerable
When you start learning any programming language (especially JavaScript) there are a lot of terms to digest at once. Some of them are taught formally: your course work, tutorials or videos most likely cover functions, objects, arrays, etc. Then there are some that you just pick up on your own by seeing them: state, scope, etc. For me, there were always a few terms that everyone seemed to understand but me. The first was “Enumerable.”

If you haven’t worked in computer science, the term is most likely foreign to you (and should not be confused with “innumerable”). I wasn’t sure if it was a type, a property or just a general term. So, I decided to look it up on [developer.mozilla.org](https://developer.mozilla.org).

> Enumerable properties are those properties whose internal [[Enumerable]] flag is set to true, which is the default for properties created via simple assignment or via a property initializer

![Imgur](https://i.imgur.com/KwNuQ1M.gif)

As a junior developer, this wasn’t super helpful, so I kept reading. Further down:

> Enumerable properties show up in for...in loops

“Great.” I thought. “I’ll just look up for...in loops.”

> The for…in statement iterates over the enumerable properties of an object

![Imgur](https://i.imgur.com/0mPchiE.gif)

So, to summarize: “Enumerable properties are things that show up in for...in loops. And for...in loops are things that go over enumerable properties.” Glad we cleared that up…

## What’s really going on?
It’s best to start with an example. Here is a simple POJO:

```javascript
let person = {
  name: 'Scott',
  occupation: 'Lion Tamer',
  isTheBest: true
};
```

Now, we can write a for...in loop to get all of those properties:

```javascript
for (let prop in person) {
  console.log(`${prop}: ${person[prop]}`);
}
```
And we get:

```javascript
name: Scott
occupation: Lion Tamer
isTheBest: true
```

We created an object with some properties and all of them showed up in our for...in loop. That means (by definition) that they are Enumerable. So, my first thought was “well, aren’t all properties Enumerable, then?” Not quite.

If you create the person object in your console, you will find that there is a lot more to it than just the properties that you added. Start typing in person. and the auto-complete in your dev tools will show you what is available:

```
isTheBest
name
occupation
constructor
hasOwnProperty
isPrototypeOf
propertyIsEnumerbale
toLocaleString
toString
valueOf
```

There’s a lot more to this object than what we added. Methods like toString and valueOf come from JavaScript’s `Object` prototype. These properties are extremely helpful (in fact, I’m willing to bet you’ve used some of them) but you wouldn’t want them to show up in that for...in loop that we wrote above, correct? That’s why these properties have their Enumerable flag set to false. That way, when we iterate over our object, we don’t get a lot of extra noise.

So, how can we see how this is set up? We will want to use the `Object.getOwnPropertyDescriptor()` method to see how these properties are constructed. Let’s stick with our person object:

```javascript
Object.getOwnPropertyDescriptor(person, 'name');
// gives us:
{
  configurable: true,
  enumerable: true,
  value: "Scott",
  writable: true
}
```
This is what is actually created when you add a new key to an object. The enumerable flag is true by default, allowing you to iterate over all the attributes you created and ignore the ones you don’t care about. But what if you wanted to create your own method but have it ignored? Well, you can do that with `Object.defineProperty()`

```javascript
Object.defineProperty(person, 'getNameWithTitle', {
  enumerable: false,
  value: function() {
    return `${this.name} is a ${this.occupation}`;
  }
});
```

Now, we can run the method person.getNameWithTitle() and we get:

```javascript
person.getNameWithTitle();
// gives us:
"Scott is a Lion Tamer"
```
But best of all, this doesn’t show up in our `for...in` loop at all. We can iterate over our attributes just as before but now we have a nice convenience method that won’t add any noise.

## Does this really come up?
If you’ve been working in Ember for a while, you most likely know that it ships with prototype extensions by default. That means that Array, String and Function are all extended to add additional properties. String, for instance, has `camelize()`, `w()` and `dasherize()` added for you. When these methods were added, they were enumerable by default and a recent PR was merged to address this very issue.

If you didn’t know about prototype extensions in Ember and want them disabled, don’t worry — you can do that quite easily. It should also be noted that these extensions will be going away in a future version of Ember.

## Conclusion
You might not write many for...in loops but it is still handy to know how to add properties like this to your objects. You may see a lot of documentation about `__defineGetter__` or `__lookupGetter__` but these are being deprecated in favor of defineProperty and getOwnPropertyDescriptor and are no longer considered private methods.

*Originally published by [Scott Batson](https://github.com/sbatson5) on [DockYard's Blog](https://dockyard.com/blog/2018/02/21/what-does-it-mean-to-be-enumerable).*
