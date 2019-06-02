---
title: "How to import CSV files with JavaScript"
date: "2018-11-26T12:05:03.284Z"
template: "post"
draft: false
slug: "/posts/importing-csv-with-javascript/"
category: "Engineering"
banner: "https://i.imgur.com/E38jtL8.jpg?1"
filename: "Importing-CSV-With-JavaScript.md"
tags:
  - "Ember"
  - "JavaScript"
  - "Engineering"
description: "Reading CSV files with JavaScript can be tricky, but definitely possible. But how do you test it?"
---

![Files stacked](https://i.imgur.com/E38jtL8.jpg?1)

Recently, we started building a web application for Netflix that allows users to upload CSV files and quickly add records in bulk. The records weren’t anything complicated but reading and parsing a CSV file comes with its own challenges:

1. How do we parse and read a CSV file?
1. How do we test this?

# Reading a CSV File
The first thing we need is an input that allows us to upload a file. So, we create a new component with `ember g component file-upload`. Our template looks like this:

```html
<input type="file" name="csv" accept=".csv">
<button type="submit">Submit</button>
```

And we want this to be a form so we can hook into the `submit` action. If we update our `component.js` file, we can update the `tagName` to be form and write our own submit hook:

```javascript
import Component from '@ember/component';

export default Component.extend({
  tagName: 'form',
  submit(event) {
    // this is where our logic will go
  }
});
```

Now we have our component set up to accept a CSV file, and we can overwrite the `submit` action to grab the file and read it.

To accomplish that, first we want to stop our form from submitting with `event.preventDefault()` since we aren’t actually submitting this form anywhere. Next, we want to grab the file that is actually attached to our input. We can do this with a simple `querySelector`. By default, inputs with type `file` will return a `files` object, which is an array of all attached files. Let’s update our submit action:

```javascript
submit(event) {
  event.preventDefault();
  let file = this.element.querySelector('[name="csv"]').files[0];
}
```

Now we can do something with our file. This is when the [FileReader API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) comes in handy. `FileReader` allows us to read a file safely and catch any errors we may run into. Specifically, we want to use the [`onload` function](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload) and [`readAsText` function](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText) to read the content of this CSV.

Note: our example is a simple CSV file, which is just plain text. But there’s a lot more to `FileReader` such as `readAsBinaryString` or `readAsArrayBuffer` that you can research on [the File API documentation site](https://w3c.github.io/FileAPI/#dfn-filereader).

To read the file, we wanted to extract it to its own method so we could easily wrap it in a promise and catch any errors that might come up:

```javascript
readFileContent(file) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result);
    reader.onerror = error => reject(error);
    reader.readAsText(file);
  });
}
```
Now, we can call our method in our `submit` action to get the file content:

```javascript
submit(event) {
  event.preventDefault();
  let file = this.element.querySelector('[name="csv"]').files[0];
  this.readFileContent(file).then((textFile) => {
    // do stuff with the file
  });
}
```

So we have the whole CSV as one long text string. How do we create records from this long text string? Well, let’s assume your CSV file looked like this:

![CSV File](https://i.imgur.com/CJ4jcMG.png)

The first row (the column headers) are the attributes on our model. Our first step is separate those out, as all the other rows are our actual data. The first thing we have to do, however, is turn this long string of text into an array. Our CSV will be one long string, separated by line breaks. We can add `textFile.split('\n');` to create an array. This will give us an array where each item is a row from our file. This way, we can just grab the first index of the array to get our attributes/column headers with array.shift().

```javascript
submit(event) {
  event.preventDefault();
  let file = this.element.querySelector('[name="csv"]').files[0];
  this.readFileContent(file).then((textFile) => {
    let content = textFile.split('\n');
    let fieldNames = content.shift().split(','); // the columns are separated by commas
  });
}
```

Now it’s just a matter of lining up everything. Since we know our indices will match, we can just iterate over our remaining items and find the corresponding column header (or `fieldName`).

It’s easy to get lost in the weeds here, but the thing to remember is:

1. When we used `shift()` we actually mutated the original array. So our variable `content` only has the list of characters left.
1. Since the CSV file is always in the same order, we know that the first value for a row matches the first item in our `fieldName` array.

Let’s add this submit action to our component:

```javascript
export default Component.extend({
  tagName: 'form',
  store: service(),
  submit(event) {
    event.preventDefault();
    let file = this.element.querySelector('[name="csv"]').files[0];
    // this is our method for reading the file
    this.readFileContent(file).then((textFile) => {
      let content = textFile.split('\n');
      let fieldNames = content.shift().split(',');
      // for every row remaining, let's create a "character"
      content.forEach((characterString) => {
        let character = this.store.createRecord('character');
        // much like our `fieldNames` we have to split each row by commas
        characterString.split(',').forEach((fieldValue, index) => {
          // find the match field name
          let fieldName = fieldNames[index];
          character[fieldName] = fieldValue;
        });
      });
    });
  },

  readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = event => resolve(event.target.result);
      reader.onerror = error => reject(error);
      reader.readAsText(file);
    });
  }
});
```

Well, that was a journey. Once we had it working, however, we ran into a not-so-obvious problem: testing.

# Testing the Files
Testing that the form submits is rather straightforward, and I’m not going to go over testing that the records are created (as our example is rather trivial). The real issue was figuring out how to test uploading and submitting a file.

My first instinct was to just stub the value of the input. After all, that’s easy to do for every other type of input. Turns out that’s not possible. I was a bit miffed at first, but it makes sense. After all, if it was easy to change the value of a file input, then you could easily write a script to steal people’s files.

## How to stub the file
To get around this, I moved the line of grabbing the file to a private method — that way I could overwrite that method in my tests:

```javascript
_getFile() {
  return this.element.querySelector('[name="csv"]').files[0];
}
```

Now that I had moved this one line, I could easily overwrite in my tests by [reopening my component](https://guides.emberjs.com/release/object-model/reopening-classes-and-instances/):

```javascript
import uploadComponent from 'my-app/components/file-upload';

uploadComponent.reopen({
  _getFile() {
    // do something clever here
  }
});
```

You can add this to any `beforeEach` hook in acceptance or integration tests. But how do we actually create a file object? After all, I want to test this behavior as close to the actual implementation as possible. Lucky for us, `File` is a JavaScript class that we can easily create. All we need is a long string of text that matches our CSV format. We created a test helper called `create-file` to do just this:

```javascript
const SimpsonsCSV = `Name,Phone Number,Email
Homer Simpson,5551234422,homer@springfield.com
Seymour Skinner,1235663322,a@b.c
Bart Simpson,2675465026,bart@spring.field
Montgomery Burns,2233459922,hi@bye.cya
Mayor Quimby,2222222222,mayor@springfield.gov
Waylon Smithers,3333333333,ok@hey.bye
Barney Gumble,111111111111,barney@gumble.gum
Marge Simpson,2627338461,marge@springfield.com
Edna Krabappel,2656898220,a@b.c
Lisa Simpson,2222222222,lisa@bix.com
Maggie Simpson,2716017739,maggie@spring.field
Linel Hutz,2745577499,hire@now.me
Troy McClure,2314928822,troy@acting.now
Rainer Wolfcastle,2221114455,rainer@acting.now
Krusty Clown,2321221188,krusty@acting.now
`;

export default function() {
  return new File([SimpsonsCSV], "simpsons.csv", { type: 'text/csv' });
}
```

This is the exact format it would come back to use from our input, and now we can test every possible behavior other than clicking the “upload” button and grabbing a file from our computer. Our test would now look like this:

```javascript
import uploadComponent from 'my-app/components/file-upload';
import createFile from 'my-app/tests/helpers/create-file';

uploadComponent.reopen({
  _getFile() {
    return createFile();
  }
});
```

We did it.

*Originally published by [Scott Batson](https://github.com/sbatson5) on [DockYard's Blog](https://dockyard.com/blog/2018/11/26/use-these-steps-to-test-csv-file-uploads).*
