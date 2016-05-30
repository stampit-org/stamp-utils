# stamp-utils
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/stampit-org/stampit?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Essential Stamp Utilities

## Composition > Class Inheritance

Stamp utils is a collection of utilities for the creation of [**stamps: Composable factory functions**](https://github.com/stampit-org/stamp-specification).

Stamps contain a method called `.compose()` which has properties attached to it that form a **stamp descriptor**. A stamp descriptor is a metadata object that tells the stamp how to create object instances. The stamp descriptor is like a recipe that tells any stamp-compatible function everything it needs to know to compose the stamp with other composables.

The compose method takes any number of composables and combines them with the current stamp to produce a new stamp with the properties and behaviors of all the combined stamps.


## Status

Very new, but should be usable and API stable. Try it. Kick the tires. If you find any problems, please [open an issue](https://github.com/stampit-org/stamp-utils/issues/new) or pull request.


## What's a composable?

A composable is any factory function or Plain Old JavaScript Object (POJO) with a stamp descriptor.

## Reading Function Signatures

This documentation uses the [rtype specification](https://github.com/ericelliott/rtype#rtype). `(param: Type) => ReturnType`


## What's included here?

### compose()

Take any number of stamps or descriptors (or both), and return a new stamp with the composed behaviors and properties.

```js
compose(...composables: [...Composable]) => Stamp
```

**Example:** Create a music player that supports several music sources:

```js
// Create the MusicPlayer factory
const MusicPlayer = compose(playerUI, soundCloud, youtube, spotify);

// Create a MusicPlayer instance
const myPlayer = MusicPlayer();
```


### isComposable()

Take an any object and return `true` if the object is a composable, e.g. POJO descriptor or stamp. Return `false` otherwise.

```js
(obj: Any) => Boolean
```

### isDescriptor()

Take an any object and return `true` if the object is a POJO (Plain Old JavaScript Object) descriptor. Return `false` otherwise.

```js
(obj: Any) => Boolean
```


### isStamp()

Take an any object and return `true` if the object is a stamp. Return `false` otherwise.

```js
(obj: Any) => Boolean
```

**Example**:

```js
import {isStamp} from 'stamp-utils';

const foo = compose();
const isFooAStamp = isStamp(foo); // true

const bar = {};
const isBarAStamp = isStamp(bar); // false
```


### init()

Easily add initializer functions to your stamps. Take a function (or many functions) and return a stamp that runs the function when an instance is created.

```js
(...functions: [...Function]) => Stamp
```

**Example:** Log to the console every time a new instance is created.

```js
const InstanceLogger = init(({ name }) => {
  console.log(`Created new instance: ${ name }`);
});

const george = InstanceLogger({ name: 'George' }); // Created new instance: George
```
