# stamp-utils

Essential Stamp Utilities

## Composition > Inheritance

Stamp utils is a collection of utilities for the creation of **stamps: Composable factory functions**.

Stamps contain a method called `.compose()` which has properties attached to it that form a **stamp descriptor**. A stamp descriptor is a metadata object that tells the stamp how to create object instances. The stamp descriptor is like a recipe that tells any stamp-compatible function everything it needs to know to compose the stamp with other composables.

The compose method takes any number of composables and combines them with the current stamp to produce a new stamp with the properties and behaviors of all the combined stamps.


## Status

Experimental. Not usable yet.


## What's a composable?

A composable is any factory function or Plain Old JavaScript Object (POJO) with a stamp descriptor.

## Reading Function Signatures

This documentation uses the [rtype specification](https://github.com/ericelliott/rtype#rtype). `(param: type): returnType`


## What's included here?

### compose()

Take any number of stamps or descriptors (or both), and return a new stamp with the composed behaviors and properties.

```js
(...composables: stamp || descriptor): stamp
```

**Example:** Create a music player that supports several music sources:

```js
// Create the MusicPlayer factory
const MusicPlayer = compose(playerUI, soundCloud, youtube, spotify);

// Create a MusicPlayer instance
const myPlayer = MusicPlayer();
```

### isStamp()

Take an any object and return `true` if the object is a stamp. Return `false` otherwise.

```js
(any): boolean
```

**Example**:

```js
const foo = compose();
const isFooAStamp = isStamp(foo); // true

const bar = {};
const isBarAStamp = isStamp(bar); // false
```


### init()

Easily add initializer functions to your stamps. Take a function (or many functions) and return a stamp that runs the function when an instance is created.

```js
(...func): stamp
```

**Example:** Log to the console every time a new instance is created.

```js
const InstanceLogger = init(({ name }) => {
  console.log(`Created new instance: ${ name }`);
});

const george = InstanceLogger({ name: 'George' }); // Created new instance: George
```
