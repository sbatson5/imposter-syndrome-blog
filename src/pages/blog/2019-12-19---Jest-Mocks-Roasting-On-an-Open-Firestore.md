---
title: "Jest Mocks Roasting On an Open Firestore"
date: "2019-12-13T03:11:14.857Z"
template: "post"
draft: false
category: "Engineering"
banner: "https://miro.medium.com/max/2000/0*epQcPYjgs0mBAe8h"
slug: "/posts/jest-mocks-roasting-on-an-open-firestore/"
tags:
  - "Engineering"
  - "JavaScript"
  - "Web Development"
description: "We had to solve the problem of writing tests against a cloud based database. Our solution ended up being scalable became a great open source project"
---

![Roasting marshmallows](https://miro.medium.com/max/2000/0*epQcPYjgs0mBAe8h)

Recently, we wrapped up a project where we built a Native iOS and Android app and [an accompanying admin tool for a client](https://medium.com/stories-from-upstatement/building-a-headless-mobile-app-cms-from-scratch-bab2d17744d9). The admin tool served as a CMS, allowing users to create content that would later appear in the native apps. Behind all of this is an API built with Node and Express, serving data that ultimately lives in [Google’s Cloud Firestore](https://cloud.google.com/firestore/).

We wanted to move as much logic as possible to the API, allowing the apps to make simple requests and receive meaningful data back. Data is scoped based on the user who is logged in. For example, if you belong to “Group A” you should see events applicable to Group A as well as events in your area. This should be as simple as making a request to `/events` instead of passing a bunch of query-params. The API knows who is logged in, so it will take care of querying Firestore appropriately.

Since the API is in charge of so much logic, it was important for us to test it thoroughly. We wanted to make sure that if you made a request to `/events` that we would make all of the correct queries to Firestore. But how exactly do we go about testing this?

## What to test

![Homer Simpson reading books](https://miro.medium.com/max/1000/1*czCGEPaouwtCWXh4h_srpQ.gif)

If you come from the world of Rails or a similar database backed framework, you might be used to the concept of having a test database for your application. You seed the database before your tests, hit your API endpoints and ensure you get the correct data back. The database is wiped and reseeded between test runs, which is fine since you are most likely running these tests on your local machine.

When you store your data in a cloud service though, it gets trickier. First of all, let’s assume we want to go with the same strategy. We have a “test” instance of Firestore that we will seed right before our tests and clear afterwards. It should work, right?

The problem is that multiple people couldn’t run tests at the same time. If I tried to run my tests after someone else had just started theirs, I would inadvertently wipe their test data. Since we had multiple developers working on this application and automated tests running in [Circle CI](https://circleci.com/) with each pull request, that wasn’t an option.

Not to mention that Cloud Firestore charges you for the number of reads and writes. It wouldn’t be frugal to pay for a premium tier for just a test instance and since we run our tests so often, we would hit our limit pretty quickly. Ultimately, it’s best to not have your tests hitting your actual cloud database.

## Fully mocking firestore

![Nelson from the Simpsons laughing at Firestore](https://miro.medium.com/max/960/1*JQO4e_ptECbceXfhjs3s2w.gif)

We came to the conclusion that our test suite would need to mock the calls to Firebase/Firestore. Since we were using [Jest](https://jestjs.io/) to write our tests, we wanted to `usejest.mock` to stub all of the calls to Firestore.

Ok… but how?

So, let’s start with a simple example of using Firestore taken from the [documentation](https://firebase.google.com/docs/firestore/quickstart#add_data):

```javascript

const firebase = require('firebase');

const db = firebase.firestore();

db.collection("users").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
```

How would we go about mocking this? If we just take it at face value, we could say:
1. Firebase is an object that has a `firestore` function
2. `firestore()` returns an object with a `collection` function
3. `collection()` returns an object that has an add function
4. `add()` returns a promise

A mock like this could work:

```javascript
jest.mock('firebase', () => ({
  firestore: jest.fn().mockReturnValue({
    collection: jest.fn().mockReturnValue({
      add: jest.fn().mockResolvedValue({
        id: 'abc123'
      })
    })
  })
}));
```

This would allow us to call all of those methods without hitting the real Firestore, and our test could pass, but this isn’t a real representation of how Firestore works. Not to mention that we would have to write some long stubs when we have to do something like this:

```javascript
const firebase = require('firebase');

function getCurrentEventsByStateForAdmins(state) {
  const db = firebase.firestore();

  db.collection('events')
    .orderBy('expirationDate', 'asc')
    .where('expirationDate', '>', new Date().toISOString())
    .where('state', '==', state)
    .where('isAdmin', '==', true)
    .get()
    .then((querySnapshot) => {
      // do some logic here
    });
}
```

And that’s a simplified example! A lot of the queries we have in our app are conditional, so they may not even be called based on the user.

We soon realized that what we needed was a mocked class. Our mocked Firestore object would have a collection function that set the `collection`, but also returned itself so that we could keep chaining methods. Something like:

```javascript
class FakeFirestore {

  collection(name) {
    this.currentCollection = name;
    return this;
  }
  
  where() {
    return this;
  }
  
  add() {
    return this;
  }
  
  get() {
    // do some logic
    // return the query
  }
}
```

This is a simplified version, but now when we call `jest.mock('firebase')`, we can return a new `FakeFirestore`, which will allow us to chain those methods. Yes, it’s a lot of code to stub but at least we can do it once instead of in every test instance.

Better yet, it would be great if we could get back to that old practice of “seeding a database” and have some data moving through our tests.

So, we kept going down the path of creating a `FakeFirestore` class and [we ended up with something that fit our needs for this API](https://github.com/Upstatement/firestore-jest-mock/blob/master/mocks/firestore.js). Then, we wrote a mockFirebase method that ran the `jest.mock` function for us. This method could accept a fake database that our fake Firestore would return for our tests.

```javascript
const { mockFirebase } = require('firestore-jest-mock');

mockFirebase({
  database: {
    users: [
      { id: 'abc123', first: 'Bob', last: 'builder', born: 1998 },
      { id: '123abc', first: 'Blues', last: 'builder', born: 1996 }
    ],
    cities: [
      { id: 'LA', name: 'Los Angeles', state: 'CA', country: 'USA' },
      { id: 'DC', name: 'Disctric of Columbia', state: 'DC', country: 'USA' }
    ]
  }
});
```

## Only Test YOUR Code

What is this function doing? It fully mocks Firebase, allowing us to run all of those queries, and if we are querying the right [collection](https://firebase.google.com/docs/firestore/data-model), we will get some test data back! Best of all, we never make an actual request to Cloud Firestore.

So, what should the assertions in your test look like? If you have a query that gets all the events in Alabama, should you write an assertion that makes sure that only events from Alabama are returned?

Simply put: *no*.

When mocking a library, it is not your job to fully recreate its functionality. What you do want to test is that you interfaced with it correctly.
Let’s look at a simple example:

```javascript
const firebase = require('firebase');

function maybeGetEventsByState(state) {
  const db = firebase.firestore();
  
  const query = db.collection('events');
  
  if (state) {
    query = query.where('state', '==', state);
  }
  
  return query.get();
}
```

Here, we are conditionally querying. If we pass a `state`, we query by that state; otherwise, we return everything. If we are using our mocked version of Firebase, we want to test that our `where` function was called correctly in each scenario. That’s why we decided to export mocked versions of every function we have on our `FakeFirestore` class.

It’s probably best to see an example:

```javascript
// These are the mocked version of some firestore methods
// And we want to assert they are called correctly
const {
  mockCollection,
  mockGet,
  mockWhere,
} = require('firestore-jest-mock/mocks/firestore');

const { mockFirebase } = require('firestore-jest-mock');

describe('Querying events', () => {
  mockFirebase({
    database: {
      events: [{ id: 'abc123', state: 'vermont' }, { id: '123abc', state: 'maine' }]
    }
  });
  
  test('It can query by state', async () => {
    // From https://gist.github.com/sbatson5/c9d018a3d46de1ce6be770848f88e47f
    maybeGetEventsByState('vermont');

    // Assert we are looking at the right collection
    expect(mockCollection).toHaveBeenCalledWith('events');
    // Assert that the correct state was queried
    expect(mockWhere).toHaveBeenCalledWith('state', '==', 'vermont');
    // Assert that we finally request the data
    expect(mockGet).toHaveBeenCalled();
  });
    
  test('It can request all', async () => {
    // From https://gist.github.com/sbatson5/c9d018a3d46de1ce6be770848f88e47f
    maybeGetEventsByState();

    // Assert we are looking at the right collection
    expect(mockCollection).toHaveBeenCalledWith('events');
    // Assert that we make no queries
    expect(mockWhere).not.toHaveBeenCalled();
    // Assert that we finally request the data
    expect(mockGet).toHaveBeenCalled();
  });
});
```

In this example, we test that if we pass `vermont` to this function, it will result in the correct query in Firestore. If we don’t pass a state to this function then we assert that `where` wasn’t called at all.

<figure>
  <blockquote>
    <p>But what about the data? You should assert that only the Vermont events were returned!</p>
    <footer>
      <cite>— People trying to test too much</cite>
    </footer>
  </blockquote>
</figure>

With our `FakeFirestore`, we do not actually run queries against the collections. This means that in this test, all events will be returned. If there’s one thing to take away from this whole post it’s: *you are testing your code, not Google’s*.

We don’t actually care what gets returned here as long as it is in the right format. Even if we did recreate all of the querying logic in our mock (which would be way more work than it’s worth), we’d only be testing our mock. Instead, we want to test the logic that *we* wrote in our application, which is the logic around building the query. The result of that query doesn’t matter; as long as it matches the right format our app expects, we’re good.

## We Open Sourced It!

It’s a niche use case, but we decided to open source our `mockFirebase` library. It covers all our particular use cases but we’re sure there are more ways it can be used. If you’re interested in contributing or want to try it in an app that uses Firestore, let us know!

[Firestore-jest-mock](https://github.com/Upstatement/firestore-jest-mock)


*Originally published by [Scott Batson](https://github.com/sbatson5) on [Upstatements's Blog](https://medium.com/stories-from-upstatement/jest-mocks-roasting-on-an-open-firestore-36fa55b76953).*