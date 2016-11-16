# stamp-utils [![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/stampit-org/stampit?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) ![Greenkeeper Badge](https://badges.greenkeeper.io/BlackDice/nome.svg)

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

```js
import compose from 'stamp-utils/compose';
```

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

```js
import {isComposable} from 'stamp-utils';
```

Take an any object and return `true` if the object is a composable, e.g. POJO descriptor or stamp. Return `false` otherwise.

```js
(obj: Any) => Boolean
```

### isDescriptor()

```js
import {isDescriptor} from 'stamp-utils';
```

Take an any object and return `true` if the object is a stamp descriptor. Return `false` otherwise.

```js
(obj: Any) => Boolean
```


### isStamp()

```js
import {isStamp} from 'stamp-utils';
```

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

```js
import {init} from 'stamp-utils';
```

Easily add initializer functions to your stamps. Take a function (or many functions) and return a stamp that runs the function when an instance is created.

```js
(...functions: Function|[...Function]) => Stamp
```

**Example:** Log to the console every time a new instance is created.

```js
const InstanceLogger = init(({ name }) => {
  console.log(`Created new instance: ${ name }`);
});

const george = InstanceLogger({ name: 'George' }); // Created new instance: George
```


### assignToInstance()

```js
import {assignToInstance} from 'stamp-utils';
```

Assign the stamp options properties to the instantiated object.

```js
(...keys?: String|[...String]) => Stamp
```

**Example:** Assign all properties:

```js
const Uri = assignToInstance();

const uri = Uri({host: 'example.com', port: 80, protocol: 'http://'});
console.log(uri); // { host: 'example.com', port: 80, protocol: 'http://' }
```

**Example:** Assign only two properties:

```js
const Uri = assignToInstance('host', 'port');

const uri = Uri({host: 'example.com', port: 80, protocol: 'http://'});
console.log(uri); // { host: 'example.com', port: 80 }
```

Check out [Fun with Stamps](https://medium.com/@koresar/fun-with-stamps-episode-3-comparing-with-the-es2015-classes-e387ef041896#.sl51g3mav) for example of use case scenario.

### namespaced()

```js
import {namespaced} from 'stamp-utils';
```

Takes the stamp's options, passes them by name to the given "child" stamps, and assigns the obtained results back to the original instance. 

```js
(options: {String: Stamp}) => Stamp
```

**Example:** Create `uri` property from the `Uri` stamp:

```js
const Uri = assignToInstance('host', 'port');
const Connection = namespaced({uri: Uri}); // create 'uri' property from 'Uri' stamp

const connection = Connection({uri: {
  host: 'example.com', port: 80, protocol: 'http://' // pass this to 'Uri' stamp
}});
console.log(connection); // { uri: { host: 'example.com', port: 80 } }
```


### methods()

```js
import {methods} from 'stamp-utils';
```

Easily add methods to your stamps. Take an object (or many object) and return a stamp that adds those methods to a prototype when instance is created.

```js
(...methods: [...Object]) => Stamp
```

**Example:** Add `stringify` method to instance

```js
const Stringifiable = methods({ stringify() {
  return JSON.stringify(this);
}});

const Named = compose(Stringifiable, assignToInstance('name'));
const george = Named({ name: 'George' });
console.log(george.stringify()); // '{"name":"George"}'
```
