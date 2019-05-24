---
title: "Working In Ember"
date: "2019-05-27T12:05:03.284Z"
template: "post"
draft: false
slug: "/posts/working-in-ember/"
category: "Engineering"
banner: "https://i.imgur.com/bM8ljia.jpg"
tags:
  - "Engineering"
  - "Lifestyle"
description: "After years of working in Ember, I recently took a job working in other technologies. I thought I'd take a moment to reflect on my time with the framework."
---

![Laptop and notepad](https://i.imgur.com/bM8ljia.jpg)
<aside>Photo by Lukas from Pexels</aside>

I worked with Ember.js for several years, across multiple companies.
In fact, it was the first JavaScript framework I had worked in professionally.
I am so grateful for my experience with the community and the learning curve -- I am a better developer because of the conventions it forced on me.
But after 4+ years of writing Ember, I took another job where I won't be writing it anymore, and I have a few thoughts overall on the framework.

# My Credentials

<figure>
	<blockquote>
		<p>Who does this guy think he is, talking about my precious Ember?</p>
    <footer>
			<cite>— Surly people who judge too quickly.</cite>
		</footer>
	</blockquote>
</figure>

I'm not going to claim that I'm the best Ember developer in the world but since you may not know who I am, I figured I'd at least give _some_ reasons why my opinion isn't completely without merit.
I worked at a startup that wrote Ember and Elixir for a couple of years.
During that time, we contracted with [DockYard](http://dockyard.com), who was pretty well known for Ember in the world and especially so in Boston.
When that startup didn't last (because that's what happens at startups, unfortunately...), I actually went to DockYard.
My time at DockYard was mostly spent in Ember (with some Rails sprinkled in for good measure), where I spent most of my time (about 2 years) contracted to work for the biggest content provider in the world.

During my time with Ember, I've [contributed to the framework itself](https://github.com/emberjs/data/pulls?utf8=%E2%9C%93&q=is%3Apr+is%3Aclosed+author%3Asbatson5+), written [multiple blog posts](https://dockyard.com/blog/authors/scott-batson) and helped [author](https://github.com/sbatson5/ember-wistia) and [maintain](https://github.com/poteto/ember-cli-flash) many open source projects.
I also have a [YouTube Channel](https://www.youtube.com/c/scottbatson) where I've done [a lot of Ember tutorials](https://www.youtube.com/playlist?list=PLelL5s7nDFKVVPZNwfnuDG-Xe_28F1PSO) with about 65,000 views.
My [Ember Data tutorial](https://www.youtube.com/watch?v=ljLxZw-XStw) has over 16,000 views at the moment (which I recorded long before I considered myself "senior" by any means).

I'm not trying to brag (...ok, maybe a little) but I just wanted to say that I have been a part of the Ember.js Community for quite a while and as more than just a passive user.
So, hopefully my opinion isn't discredited immediately.

# What's the point of this post?

This isn't meant to serve as a "this is why Ember is great" or "this is why Ember is bad" post (although I certainly have opinions on both).
It's just meant to be a reflection on the framework, community, the greater web community and maybe just a bit of personal reflection.

![Ember Trophies](/media/ember.png)

## Ember is not dead and everyone knows it

<figure>
	<blockquote>
		<p>Lol, people think Ember is dead but look at these random stats!</p>
    <footer>
			<cite>— Overly defensive web devs.</cite>
		</footer>
	</blockquote>
</figure>

I feel like I see a ton of tweets and posts from really smart people in the community answering the question "is Ember dead?" with a resounding "heck no!"
But honestly, I don't actually see a lot of people asking that question (except for the occasional troll).
Nobody thinks Ember is going to disappear -- there are a lot of companies that are invested in it, a community that is passionate about maintaining it and enough smart people behind it to help drive it into the future.
Nobody seriously thinks it is going to just end and disappear, so we need to stop being overly defensive about this.

Yes, less people use it -- that's just the truth.
Every year, during the "State of the Web" survey or the NPM survey, Ember is always going to come in behind React, Vue and Angular.
But that's always been the state of Ember and it will probably be the state of it indefinitely.
We, as a community, don't love Ember because we think it will be the framework to rule them all.
It is 100% ok if Ember's market share isn't rapidly growing (although it can be worrisome when it continues to shrink).

## The issues with learning Ember

Ember has a reputation for having a steep learning curve and I think that was definitely true when I learned Ember 4(ish) years ago.
There wasn't a lot of documentation and the documentation we did have at the time was a bit contrived.

But that's not the case any more!
The documentation is some of the best in the JavaScript landscape and there are so many more resources now.
Not to mention the API's have been simplified in a lot of ways and it's so easy to upgrade your applications and get the latest features.

That being said, it is still harder to learn Ember than React and Vue because *they are different things*.
I think everyone in the Ember community gets that and can make that argument, but I don't think they quite realize the impact on adoption.
Yes, "batteries included" solves so many problems out of the box that larger applications run into.
The problem is that newer and more junior developers don't understand those problems yet.
They aren't worried about state management, routing, built-in testing, etc.
So they learn React because it _is_ easy to get started and when they hit those problems, they find other people have solutions already.

You can make the argument for "batteries included" and I think people really understand that, but at the end of the day why would they switch from a React/Redux/React-Router project after they invested so much time in learning it?
By the time developers understand the problems that Ember really solves, they are experienced enough with other JavaScript libraries to have a preference.
Why switch?

## Would I have picked Ember on my own?

I don't think I would have picked Ember on my own.
I remember during a job interview, the interviewer had asked me what brought me to Ember.
My response was something about the community and the conventions and the same things I've heard other people say 100 times.
The truth is: I wrote Ember because that's what my company was doing.
And I think that's a completely valid response.
We can list all the reasons about the time Ember can save and the ergonomics, but not everyone gets to pick their company's tech stack (in fact, _most_ of us don't), regardless of our arguments.

Obviously, I really like Ember and I would have liked a job where I could keep writing it.
Unfortunately, that just isn't that easy because most companies just aren't writing Ember.
React has almost become a default in the web dev community and regardless of whether you *like* it or not, the truth is that you are more employable if you know it.

So, I started volunteering some time at a pre-funding startup with a mission I believed in to get some experience in React (since I wasn't going to get it at work).
That's when I learned how much easier it is to get started with a library that just cares about the view layer.

Secondly, I formed a lot of good habits because of Ember in terms of structuring an application, writing tests, handling how data moves through my components and more.
But I also formed some bad habits without realizing it.
I didn't quite know how to write native JavaScript classes.
Things like `Component.extend({})` over `Foo extends Component`, `init` over `constructor`, `this._super` or `super()` and more, made me feel like I had fallen behind other JavaScript developers.

<figure>
	<blockquote>
		<p>But Ember paved the way! Those things weren't around when Ember started!</p>
    <footer>
			<cite>— People who miss the point.</cite>
		</footer>
	</blockquote>
</figure>

I get that Ember helped pave the way for these things because weren't available yet.
I also get that "stability without stagnation" means that sweeping changes can't be implemented as the goal is to not break every app out there with each release.
But it still boils down to me not knowing something that the rest of the Web Dev world has figured out.
Take [`broccoli.js` for example](https://github.com/broccolijs/broccoli).
I learned a lot of about trees in broccoli, build pipelines and more!
But everyone else in the world was using [webpack](https://webpack.js.org/) and I knew absolutely nothing about it.
My skills didn't feel transferable.

<figure>
	<blockquote>
		<p>Just because you can explain why something is bad, doesn't mean it's not bad</p>
    <footer>
			<cite>— Me.</cite>
		</footer>
	</blockquote>
</figure>

Even if your current company writes Ember and you love your job and you never want to leave, there may come a time when that isn't the case.
Wouldn't you want to feel like you could find another job quickly if you had to?
And yes, most companies won't disqualify you for not know their tech stack... but what about the ones that will?
It would stink to miss out because you couldn't write a class properly in JavaScript or explain how to do something webpack.

If someone was starting out and they asked me what JS library they should start learning, I would 100% tell them to learn React even though I prefer and love Ember.
There are simply more people and companies writing React out there.
Learn what will get you a job.

![Tomster and Zoe](https://emberjs.com/images/tomsters/octane-c5c0d459236649c60b715256e5b3c48c.png)

## Is it worth learning Ember at all?

Everything is worth learning.
Ember will teach you how to structure an app by being opinionated.
A lot of people hate this at first because they don't want to be forced into a certain solution.
However, I think if you stick with it long enough, you see the benefit.
Even if you don't stick with Ember, you can take what you've learned from the tried-and-true framework and apply it elsewhere.

I structure my React apps in a similar way to Ember.
I think of testing in terms of `unit`, `integration` and `acceptance` and understand when each makes sense.
I know how to give back to a community through open source documentation or tutorials -- the Ember community taught me these skills!

# Conclusion?

I feel like I mostly complained in this post, but I hope it doesn't come across that way.
I love Ember and would be happy writing it for the rest of my career (I honestly feel this way).
But it didn't seem like that was up to me -- I'm not in a position to make the call on what technology my company uses.
Maybe one day I'll be in that position, but if the landscape stays the same, I'd probably go with React simply because so many more people know it.
My hope is that Ember keeps leaning into the conventions that the rest of the JavaScript world have adopted ([Ember Octane a great step](https://emberjs.com/editions/octane/)) and that those with experience in Vue or React can jump into an Ember project and not feel lost.

Until then, I'll still find Ember projects when I can and contributing to the community when I have time.
