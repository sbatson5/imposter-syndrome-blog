---
title: "A Few Thoughts On Ember"
date: "2019-05-21T12:05:03.284Z"
template: "post"
draft: false
slug: "/posts/a-few-thoughts-on-ember/"
category: "Engineering"
banner: "https://i.imgur.com/bM8ljia.jpg"
filename: "Working-In-Ember.md"
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
During that time, we contracted with [DockYard](http://dockyard.com), who was pretty well known for Ember (in the world and especially so in Boston).
When that startup didn't last (because that's what happens at startups, unfortunately...), I went to DockYard.
My time at there was mostly spent in Ember (with some Rails sprinkled in for good measure), where I spent most of my time (about 2 years) contracted to work for the biggest content provider in the world.

During my career with Ember, I've [contributed to the framework itself](https://github.com/emberjs/data/pulls?utf8=%E2%9C%93&q=is%3Apr+is%3Aclosed+author%3Asbatson5+), written [multiple blog posts](https://dockyard.com/blog/authors/scott-batson) and helped [author](https://github.com/sbatson5/ember-wistia) and [maintain](https://github.com/poteto/ember-cli-flash) many open source projects.
I also have a [YouTube Channel](https://www.youtube.com/c/scottbatson) where I've done [a lot of Ember tutorials](https://www.youtube.com/playlist?list=PLelL5s7nDFKVVPZNwfnuDG-Xe_28F1PSO) with about 65,000 views.
My [Ember Data tutorial](https://www.youtube.com/watch?v=ljLxZw-XStw) has over 16,000 views at the moment (which I recorded long before I considered myself "senior" by any means).

I'm not trying to brag (...ok, maybe a little) but I just wanted to say that I have been a part of the Ember.js Community for quite a while and as more than just a passive user.
So, hopefully my opinion isn't discredited immediately.

# What's the point of this post?

This isn't meant to serve as a "this is why Ember is great" or "this is why Ember is bad" post (although I certainly have opinions on both).
It's just meant to be a reflection on the framework, community, the greater web community and hopes for where Ember will go in the future.

![Ember Trophies](../../assets/images/ember.png)

## Ember is not dead and everyone knows it

<figure>
	<blockquote>
		<p>Lol, people think Ember is dead but here are some random reasons why it's not!</p>
    <footer>
			<cite>— Overly defensive web devs.</cite>
		</footer>
	</blockquote>
</figure>

I feel like I see a ton of tweets and posts from really smart people in the community answering the question "is Ember dead?" with a resounding "heck no!"
But honestly, I don't actually see a lot of people asking that question (except for the occasional troll).
Nobody thinks Ember is going to disappear -- there are a lot of companies that are invested in it, a community that is passionate about maintaining it and enough smart people behind it to help drive it into the future.
We need to stop being overly defensive about this.

Yes, less people use it -- that's just the truth.
Every year, during the "State of the Web" survey or the NPM survey, Ember will come in behind React, Vue and Angular.
But that's always been the state of Ember and it will probably be the state of it indefinitely.
We, as a community, don't love Ember because we think it will be the framework to rule them all.

## The issues with learning Ember

Ember has a reputation for having a steep learning curve and I think that was definitely true when I learned Ember 4(ish) years ago.
There wasn't a lot of documentation and the documentation we did have at the time was a bit contrived.

But that's not the case any more!
The documentation is some of the best in the JavaScript landscape and there are so many more resources now.
Trust me, I've been on a project using a library and CMS that is new and poorly documented and it has left pining for Ember Guides and community driven README's.
Not to mention the API's have been simplified in a lot of ways and it's so easy to upgrade your applications and get the latest features.

That being said, it is still harder to learn Ember than React and Vue because *they are different things*.
I think everyone in the Ember community gets that and can make that argument, but I don't think they quite realize the *impact* on adoption.
Yes, "batteries included" solves so many problems out of the box that larger applications run into.
The problem is that newer and more junior developers don't understand those problems yet.
They aren't worried about state management, routing, built-in testing, etc.
So they learn React because it _is_ easy to get started and when they hit those problems, they find other people have solutions already.

Need a routing solution?
There's React Router.
Need state management?
Redux, Apollo, Mobx and more!

These are problems that devs run into one at a time and they find these solutions one at a time.
When they finally get to the point where "batteries included" clicks, they already have their own framework and mental model they are comfortable with.
I've talked with other devs, explaining the virtue of all the things Ember gives us and the response is typically "Oh wow, I wish I had all that when I was starting this project."
It's a great sentiment but doesn't change the fact that their project is already invested in React or Vue.

## Is Ember Evolving Too Slowly?

Obviously, I really like Ember and I would have liked a job where I could keep writing it.
Unfortunately, it just isn't that easy because most companies just aren't using it.
React has almost become a default in the web-dev community and regardless of whether you *like* it, the truth is that you are more employable if you know it.

So, I started volunteering some time at a pre-funding startup with a mission I believed in to get some experience in React (since I wasn't going to get it at work).
That's when I learned how much easier it is to get started with a library that just cares about the view layer.

I formed a lot of good habits because of Ember in terms of structuring an application, writing tests, handling how data moves through my components and more.
But I also formed some bad habits without realizing it.
I didn't quite know how to write native JavaScript classes.
Things like `Component.extend({})` over `Foo extends Component`, `init` over `constructor`, `this._super` or `super()`, years of `Ember.get` / `Ember.set`, and more, made me feel like I had fallen behind other JavaScript developers.

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

The next thing I noticed when I started working outside of Ember is that I was getting some stuff for free without realizing it.
Native extensions are cool and I love using things like `findBy` or `firstObject` on arrays.
But when I was starting out and learning array methods at the same time as I was learning Ember, the lines were too blurred for me and I didn't know what Ember was giving me versus native JavaScript.

I get that you can opt out of these things but as a junior dev, you don't even realize _they exist_ yet, let alone have an understanding of how to opt out of them.

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
And yes, most companies won't disqualify you for not knowing their tech stack... but what about the ones that will?
It would stink to miss out because you couldn't write a class properly in JavaScript or explain how to do something in webpack.

If someone was starting out and they asked me what JS library they should start learning, I would 100% tell them to learn React even though I prefer and love Ember.
There are simply more people and companies writing React out there.
Learn what will get you a job.

![Tomster and Zoe](https://emberjs.com/images/tomsters/octane-c5c0d459236649c60b715256e5b3c48c.png)

# Where should Ember go?

I know it's sounded like a lot of gripes so far in this post and I don't want to be overly negative.
Again, I can't stress enough how much I *enjoy working with Ember*.
But the point I'm trying to drive home is that it took a few years and a lot of intimate knowledge to appreciate all the amazing things Ember does for me.
That's why my biggest wish for Ember is that it becomes even _more_ accessible to junior developers.

<figure>
	<blockquote>
		<p>Easier said than done, Scott</p>
    <footer>
			<cite>— Overly defensive people that still have a good point.</cite>
		</footer>
	</blockquote>
</figure>

People in the Ember community aren't unaware of this issue and a lot of steps have been made in this direction.
However, I want to list out a few thoughts I have.

### 1. Make glimmer the default `ember new` install

The web dev community is used to starting projects with just the view layer, then adding things in later when they feel they need it.
Yes, _we_ like that the batteries are included, but only because we have this mental model in place already and know what we're looking for.

### 2. Don't include Ember Data with default apps

A new app is too bloated and Ember Data is *huge*.
I'm not trying to discredit the library at all, but it has become too synonymous with Ember itself and the lines between Ember Data and Ember proper need to be clearly defined.

Let people hit a wall first and then go to Ember Data as the solution.

### 3. Make the resolver less clever

This feels like a weird suggestion, but until I started working with other libraries, I didn't understand just how much the resolver did for me.
And I think that made me a worse developer in some ways.
In my React app, I have to import my components all over the place -- the app isn't aware of them just because I put them in the components folder!

And although it feels more verbose, it also feels so much more obvious to newer developers -- sometimes "it just works" can make things _more_ confusing.

### 4. Get rid of controllers

A few others have said this in other posts, but I want to reiterate: get rid of controllers and just use components for controlling whats available to a template and services for singleton behavior.
I hate explaining controllers to developers coming other JS libraries.

<figure>
	<blockquote>
		<p class="left-align">No... Controllers aren't components</p>
		<p class="left-align">No... Controllers in Ember aren't like Rails controllers</p>
		<p class="left-align">No... Controllers are stateful and coming back to this route means your state is maintained</p>
    <footer>
			<cite>— Me, trying to <strong>control</strong> my impatience (get it??).</cite>
		</footer>
	</blockquote>
</figure>

### 5. Make it easier to break Ember

Just like opting out of native extensions, there are other parts of the framework where it feels like you have to possess an intimate knowledge in order to work around it.
Breaking Ember conventions shouldn't feel so hard (but to be fair, it's easier now than it was 2 years ago).

### 6. Make query params not awful

This is kind of a joke... but also... it's not.

### 7. Go to where the developers are

This is the biggest one but also the most vague -- make Ember familiar to people from other frameworks.
I'm not saying that Ember should be identical to something like Vue or React, but it shouldn't feel quite so foreign at first glance.
[Ember Octane is a great step](https://emberjs.com/editions/octane/) toward this goal and I'm so excited to try it out soon on a real project.
As a community, we may have to do away with "stability without stagnation" if we want the user base to grow -- it's an awesome goal but sometimes it feels like we're getting left behind.

# Conclusion?

I love Ember and would be happy writing it for the rest of my career (I honestly feel this way) and I formed so many great habits that I can take into any front-end project.
But I'm not in a position where I get to choose my tech stack at my company, so my undying love for Ember won't result in my writing it.
Maybe one day I'll be in that position, but if the landscape stays the same, I'd probably go with React simply because so many more people know it.
My hope is that Ember keeps leaning into the conventions that the rest of the JavaScript world have adopted and that those with experience in Vue or React can jump into an Ember project and not feel lost.

Until then, I'll still find Ember projects when I can and contribute to the community when I have time.
