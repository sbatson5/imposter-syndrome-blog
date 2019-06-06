---
title: "The Art of the Code Review"
date: "2019-06-06T00:20:07.392Z"
template: "post"
draft: false
slug: "/posts/the-art-of-the-code-review/"
category: "Engineering"
banner: ""
filename: "The-Art-of-the-Code-Review.md"
tags:
  - ""
description: "A huge part of our careers as developers is reviewing code other people have written and responding to our own reviews. These are a few of the things I have learned so far in my career when it comes to reviewing code."
---

If you have been an engineer/developer at a company with at least one other engineer/developer, then at some point, you have reviewed someone else's code.
Perhaps it wasn't through a formal Pull Request (PR) or pairing session, but at some point you looked at someone else's code and commented on it (either in person or online).
So much of our day is spent reading through other people's code and it can be so intimidating when you're starting out.
Luckily, I have picked up a lot of tricks along the way that have not only made me better at understanding code, but have made me better at boosting the confidence of the engineers around me.

## What is this post about?

Fair warning that this is not going to be an overly technical blog post.
So, if you're expecting to come out of this with some tips on how to quickly grok code and spot bugs, this isn't the post for you.
But I hope you still read it because I think it's important... and I want the clicks.

...Actually, I already got the click, so...

## What goes into a code review?

<figure>
	<blockquote>
		<p>Bro, I know how to review code. You look for the missing semicolons and then mark it as "needs changes."</p>
    <footer>
			<cite>— Brogrammers who are all business.</cite>
		</footer>
	</blockquote>
</figure>

First off, don't call me "bro."
Secondly, most people don't think like that, however they _are_ quick to search for refactors/linting rules and comment on your PR.
This isn't necessarily bad (I was so guilty of this when I was first learning) but it doesn't help as much as you think.

If you haven't heard of [April Wensel](https://twitter.com/aprilwensel), please follow her on twitter and [*watch this talk on compassionate code reviews*](https://www.youtube.com/watch?v=Ea8EiIPZvh0).
She summarize this topic in a great way -- some of which I learned on my own, but a lot of it was so eye opening.
One of the things she asks you do during a code review, is when you are leaving a comment, ask yourself "is this necessary?"

### Is the comment you are leaving necessary?

Here's a simple example:
```JavaScript
const getAdmins = (users) => {
  return users.filter((user) => {
    return user.isAdmin;
  });
}
```

Your first instinct might be to leave a comment, telling that developer they can write that all in one line.
```JavaScript
const getAdmins = users => users.filter(user => user.isAdmin);
```
One line!! And we got rid of the parenthesis!!
But is this comment _necessary_?
No, it isn't because the code does *exactly what it did before*.
The thing to remember is that the single line function is not _better_ (after all, it probably gets minified anyway, so there's no difference when it ships).

The hard thing to start to learn is what is the difference between your _preference_ and what is actually better.
Writing this all in one line is just how _you_ would want to do it.
And that's fine -- different strokes for different folks.

But if this is something you want enforced in your code base (perhaps you're the tech lead or owner of an open source library and you want consistency), then add some linting rules.
Or some pre-commit hooks that clean this stuff up.
At the very least, have a style guide you can point to when you leave this comment.
If you care enough about cleaning things like this up, then you should care enough to put something like a linter or style guide in.
Otherwise, you're just commenting for the sake of commenting.

The other benefit of only worrying about changes that are really necessary, is that you end reviewing PR's faster because you don't have to make so many "nitpick" comments.
In fact, if you are starting a comment with "nitpick" that might be a good sign that it isn't a comment worth making.

<figure>
	<blockquote>
		<p>So, as long as the code works, I shouldn't comment?</p>
    <footer>
			<cite>— People taking the point too far.</cite>
		</footer>
	</blockquote>
</figure>

That's definitely not what I am saying.
There's a difference between "write these 3 lines in one line" and "write this in a way that makes more sense."
It's ok if you can't tell the difference at first glance and you aren't sure if "is this necessary?" is a "yes" or "no."
If that's the case, ask yourself "is this clear?"

Here is an example that came up recently.

```JavaScript
let directors = [];

for (let i = 0; i < movie.crew.length; i++) {
  if(movie.crew[i].job.includes('Director')) {
    director.push(movie.crew[i]);
  }
}

```

What is happening here?
We are trying to pull out the `directors` from our `movie.crew` array.
If you're familiar with array methods, you know this is when we can use a filter.

```JavaScript
let directors = movie.crew.filter((crew) => crew.job.includes('Director'));
```

The `filter` method is more descriptive in this case -- when we see this, we know we're getting a subset of our `crew`.
A `for` loop can do anything and at first glance, we can't tell what is going on.
So, although both of these do the same thing, the second one *describes the intent* and I'd say that comment is worth making.

### How to comment

The next think to think about is "how do I leave a comment?"

<figure>
	<blockquote>
		<p>Code is emotionless. Just say "update this to `x` and move on"</p>
    <footer>
			<cite>— Programmers who are probably a <i>ton</i> of fun at parties.</cite>
		</footer>
	</blockquote>
</figure>

The thing I always try to remember is that there is a person at the other end receiving this feedback and I think about some of my first code reviews.
Some of the comments I had were direct shots to my confidence and when you're first starting out, this can be crippling.
Here is a real example of a comment I got on my first big feature as a professional programmer:

<figure>
	<blockquote>
		<p>Why didn't you just use a Service?</p>
	</blockquote>
</figure>

I still remember it to this day.
In fact, [April Wensel](https://twitter.com/aprilwensel), mentions an example just like this in her video: [Compassionate -- Yet Candid -- Code Reviews](https://www.youtube.com/watch?v=Ea8EiIPZvh0).
When I received this comment, I panicked; mostly because I'm a sensitive person, but also because I really respected and looked up to the engineer who left this comment.
I didn't want her to think I was stupid.

But the truth of the matter was *I didn't use a Service because I didn't know what Services were in Ember.*
I was still learning modern JavaScript at the time, not to mention the nuances of the framework we were using.
Even if I had 10 years of experience, there is still a chance that I just didn't know what Services did in Ember.

Rather than asking something like "Why didn't you just do X" it could have been worded like this:

<figure>
	<blockquote>
		<p>It looks like you're trying to manage state between a couple of components.  Services are specifically designed that -- are you familiar with them? You may want to look into using one here.</p>
	</blockquote>
</figure>

It's not overly verbose.
It is polite and points me toward something that I can look up myself.
If the developer wanted to go the extra mile, they could link to the documentation or even offer to explain it in person.

Another thing to consider is that I might have had a reason to _not_ use a Service that the developer hadn't thought of yet.
We've all left comments on a PR asking "why do we do this?" or "can we use this?" and then have the author of the PR reply with a perfectly reasonable explanation.

This happens because sometimes *you lack the full context*.

### Forest for the trees

Sometimes, you just cannot see the forest for the trees when reviewing a PR or looking through a codebase.
How many times have you or another dev looked at a library and said "this code sucks"?
I see it happen constantly, but the fact of the matter is it sucks to us because *we don't get it.*
There is context we're missing -- maybe it solves a problem we don't see, maybe it was written 5 years ago before better APIs existed, maybe it had to support IE8!

The point is that you can't think of everything when you are reviewing a pull request in a few minutes (especially when you consider this person spent hours on it).
So, when you are about to leave a comment, make a few assumptions.

1. Assume they are just as smart, if not smarter than you
1. Assume they had a good reason to do something in a way you dislike
1. If you know for a fact, there is a better way to do something, assume that maybe they don't know about it yet

These assumptions can help to frame your feedback.
This doesn't mean you _shouldn't_ leave a comment if you think something should be improved -- we're all trying to learn together, after all.
It just means you should shape your comment appropriately.
Sometimes, a good thing to think is "would I say this to their face in this way?"
If there answer is "no," odds are you're going to come across like a jerk.

### Compliment, don't just comment

At almost every one of my annual reviews with my manager (at every job I've had as a developer), I always receive some feedback about how people enjoy getting code reviews from me.
One of the nicest comments I got was that somebody said they always ask me for code reviews because I "made them feel smart."
That meant a lot to me because it was something I noticed myself -- when somebody said something nice on one of my PR's, it was a huge confidence boost.

That's why I started thinking in the "_Compliment, don't just comment_" mantra.
It's pretty simple:

1. Always try to find at least one nice thing to say in a PR (even if it's just "This works great!")
1. If you learned something, *say so* ("TIL selects have a native `selectedOptions` collection")
1. Don't try to convince the author you're smart

The last one is important to highlight and something you should consider when you're writing out a comment.
Along the lines of "is it necessary?" you can also ask yourself "do I just want to prove that I know this?"
Nobody walks away from a PR where you go on about some unrelated topic thinking "wow, that person is so dang smart."
If you're smart, people know it.
If you're worried about being seeming smart, PR reviews are not the place to prove it.

<figure>
	<blockquote>
		<p>Don't try to convince the author that you're the smartest person in the room.  Convince them that they are.</p>
    <footer>
			<cite>— Me, in an ideal world.</cite>
		</footer>
	</blockquote>
</figure>

It might go without saying, but it's hard to do all of this 100% of the time.
After all, a 2 line PR probably isn't worth leaving a "wow, great job" comment.
And we're all guilty of bike shedding from time to time (heck, sometimes it's healthy to have those conversations).
These aren't hard rules, just something to keep in mind.

And remember: _there is a human being receiving this feedback_.
If that means nothing to you, then you probably shouldn't be on a team where you need to review each other's work (and don't worry, there is plenty of work out there for you).

## TL;DR

If you have a lot of comments about code style, get a linter that can enforce that for you.
Assume the person has good reasons for doing something a certain way and _ask_ them politely about trying a different method.
Tell people they did a good job, or let them know you learned something from reviewing their PR!

Don't be a jerk!
