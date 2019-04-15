---
title: "Why Should You Care About WebAssembly?"
date: "2018-05-14T22:12:03.284Z"
template: "post"
draft: false
slug: "/posts/the-birth-of-movable-type/"
category: "Engineering"
tags:
  - "WebAssembly"
  - "Wasm"
  - "JavaScript"
description: "Why should you care about WebAssembly as a JavaScript Developer?"
---

# WebAssembly In Ember?
There was a lot of really interesting topics of discussion at this year’s EmberConf — especially in the opening keynote by Tom Dale and Yehuda Katz. They closed out the talk by discussing [their work in glimmer with WebAssembly](https://youtu.be/NhtpXs0ZtUc?t=35m54s). In fact, they even showed a [version of the EmberConf website](https://schedule-wasm.emberconf.com/) running in WebAssembly (although it was [broken in iOS](https://www.construct.net/blogs/construct-official-blog-1/apple-broke-webassembly-and-are-leaving-it-broken-898) due to a vulnerability).

There was a lot of buzz and clapping and I did what I normally do: smiled and nodded like I knew what was going on.

![I totally get it](https://media.giphy.com/media/jyPlIQ7VGsLXQyEweP/giphy.gif)

So, I decided to dig into it more and try to get an understanding of what WebAssembly is and what problems it’s really solving.

## WebAssembly at a High Level
If you read a lot of blog posts on WebAssembly (a.k.a. Wasm) you’ll notice that one of the biggest points a lot of people make is that it enables them to build sites in languages other than JavaScript. For people with years of experience in other languages, I get how that could be a huge perk. As a JavaScript developer, however, I was still left with the question: but what does it do for me?

To answer that question, I had to ramp up my knowledge on how sites run now, where JavaScript started and how WebAssembly can fit into the current ecosystem.

## What’s wrong with JavaScript?
As most of you probably know, JavaScript was created in 1995 to enable web developers to add some functionality. It was intended to be a [loosely typed language](https://www.computerhope.com/jargon/l/looslang.htm) in the hopes that developers could get up and running much faster. That means that unlike languages like C, C++ or Rust, a variable could start as an integer, change to a string, then to an object without causing issues. Although this made it easy to learn, it meant the language was rather inefficient.

When a site with JavaScript was run back then, the process looked like this under the hood:

1. Parse the code
1. Execute the code from start to finish
1. Any garbage collection

That’s because JavaScript used what’s called an “interpreter” to run code. Much like a professional interpreter in real life, this would interpret and translate every line as it came up to a language the system understood - just like someone interpreting English to Spanish in a real-time conversation.

The problem here is that it becomes inefficient when you have to run the same block of code, loop or function multiple times. The interpreter translates that every time with no performance gain. This led browsers to start implementing [just-in-time compilers](https://en.wikipedia.org/wiki/Just-in-time_compilation), and users started seeing enormous performance gains in the browser.

What the JIT does is create compiled versions of functions to run them more efficiently on subsequent calls. However, since we’re still working with a loosely typed language, it needs to create multiple compiled versions of these functions. Take this function as an example:

```javascript
function putTogether(a, b) {
  return a + b;
}
```

If a and b are numbers, then what we get returned is a sum. However, if they are strings, we get a concatenated string in return. This works in JavaScript but lower-level languages need to know the type in order to perform the right operation. This is why the JIT has a “Monitor” that creates two compiled versions of this function — one that accepts numbers and one that accepts strings. When the function is called, the proper compiled version is found and executed. This is what is referred to as the [Baseline Compiler](https://blog.mozilla.org/javascript/2013/04/05/the-baseline-compiler-has-landed/).

As a note, it is a bit more complicated than all this, but we’ll keep our examples simple. If you want to learn more, I recommend [reading anything and everything from Lin Clark](https://hacks.mozilla.org/2017/02/a-crash-course-in-just-in-time-jit-compilers/).

So now the JIT is helping the browser run more efficiently as it isn’t interpreting every single line, but is instead interpreting types and finding the correct compiled version of a function. To help performance even more, the Monitor watches to see which of these baseline compiled functions is called most. If it finds that one function is being called a lot, it sends it to the Optimizing Compiler to create an even faster version.

As an example, if it finds that we are always calling our `putTogether` function with numbers, it makes the assumption that it should always be called that way and creates an optimized version. Now our function is at near-native speeds.

Our new process looks like this:

1. Parse
1. Compile (baseline compiler)
1. Optimize (optimize compiler)
1. Execute (much faster than before)
1. Any garbage collection

Although we have more steps, the JITs introduced in browsers made sites over ten times faster within the first couple of years of implementation. This is typically the workflow with compiled programs versus runtime. We spend a little time up front to compile but it pays major dividends as the execute time is reduced because we aren’t translating on the fly anymore.

## Ok… but where does WebAssembly fit in?
The above process was a marked improvement but there is still one major issue. Take our `putTogether` function as an example. Say we execute that function 1,000 times and pass it only numbers. The optimizing compiler made the assumption that it should only be called with numbers and wrote a low-level, compiled version of that function.

But then, for some reason on the 1,001st time we call the function, we pass it strings.

![Why would you do that?](https://media.giphy.com/media/Yj7m9DaV3sKjJMEEzw/giphy.gif)

When the compiled code sees that it made the wrong assumption it trashes the optimized function and starts the process of optimizing over again. This is what’s referred to as “bailing out,” and if it happens enough, eventually the optimizing compiler will give up and we never get the most efficient version of our function.

WebAssembly allows you (the developer) to write your own compiled version of these functions. This means the JIT is no longer creating baseline versions of functions, monitoring them, optimizing them, bailing out and re-optimizing. Instead, you’ve said “I know I want this function to operate this way” and the JIT doesn’t have to lift a finger.

So now our process can look like this:

1. Parse (with compiled code through WebAssembly)
1. Execute (just as fast as JIT)
1. Any garbage collection

Now you can have parts of your application running at the same speed as native apps. Although we won’t _completely_ remove JavaScript from the equation, a lot of computation can be moved to these lower level, compiled languages. For most web developers, these gains will come from third-party packages their apps consume and they won’t have to write any WebAssembly themselves. But just because you may not be writing it directly, that doesn’t mean it’s not handy to understand what is happening under the hood.
