![banner](/rxdeep-local-banner.png)

```bash
npm i rxdeep-local
```
Reactive states that persist on `localStorage` and are shared between different tabs/windows, based on [RxDeep](https://loreanvictor.github.io/rxdeep/)
and [RxJS](https://rxjs.dev). Store deep nested objects, persist select parts of a state-tree, modify/listen to changes on any node in the state-tree
in a [fast](https://loreanvictor.github.io/rxdeep/docs/performance) and [precise](https://loreanvictor.github.io/rxdeep/docs/precision) manner.

<br><br>

## Example Usage

▷ Create state object:
```ts
import { local } from 'rxdeep-local';
import { state } from 'rxdeep';

const s = local(state(42), 's');
s.subscribe();

s.value = 43; // --> updates local storage, informs other tabs/windows of the change.
```
> ⚡⚡ **IMPORTANT** ⚡⚡
>
> The local state will not start picking/storing values from/to `localStorage` unless
> it is somehow subscribed to (either itself or one of its sub-states). It is always a good idea
> to call `.subscribe()` and manage that subscription.

▷ You can also use the class constructor instead of the shorthand function:
```ts
import { LocalState } from 'rxdeep-local';

const s = new LocalState(state(42), 's');
```
▷ Nested complex values are also possible:

```ts
const s = local(state({ x: 2, y: [{ z: 4 }, {z : 5}, {z : 6}]}, 's');
```
▷ You can also just persist part of another state tree:

```ts
const s = state({ x: 2, y: [{ z: 4 }, {z : 5}, {z : 6}]});
const l = local(s.sub('x'), 's.x');
```
▷ As per any [RxDeep](https://loreanvictor.github.io/rxdeep/) state, you can listen to and/or modify parts of a deep nested state:

```ts
const s = local(state({ x: 2, y: [{ z: 4 }, {z : 5}, {z : 6}]}, 's');

s.sub('y').sub(2).sub('z').subscribe(console.log);     // --> logs 5
s.sub('x').value = 3;                                  // --> updates the state, 
                                                       // ... rewriting on localStorage 
                                                       // ... and notifying other tabs
```

<br>

👉 Read [RxDeep documentation](https://loreanvictor.github.io/rxdeep/) for more info.

<br><br>

## UI Frameworks

Like [RxDeep](https://loreanvictor.github.io/rxdeep/), RxDeep-Local is framework agnostic and similarly
integrates nicely with common UI frameworks. You can use it in any context that you can use [RxJS](https://rxjs.dev):

<img src="https://reactjs.org/favicon.ico" width="16"/> [Use with React](https://loreanvictor.github.io/rxdeep/#react)

<img src="https://angular.io/assets/images/favicons/favicon.ico" width="16"/> [Use with Angular](https://loreanvictor.github.io/rxdeep/#angular)

<img src="https://vuejs.org/images/logo.png" width="16"/> [Use with Vue.js](https://loreanvictor.github.io/rxdeep/#vuejs)

[👉 Learn more.](https://loreanvictor.github.io/rxdeep/#ui-frameworks)

<br><br>

## Performance

Since serialization can be expensive, it is debounced by default by a `100ms` so that you can more easily bind states to UI events
without performance drops.

You can customize any of that behavior. You can for example throttle instead of debounce, picking the last value:

```ts
import { local } from 'rxdeep-local';
import { state } from 'rxdeep';
import { auditTime } from 'rxjs/operators';

const l = local(state(42), 's', auditTime(300));
```

<br><br>

## Serialization / Encoding

By default, `JSON.parse()` and `JSON.stringify()` are used for serialization/deserialization (or encoding/decoding).
You can provide custom encoders for that purpose:

```ts
// my-encoder.ts
import { of } from 'rxjs';
import { Encoder } from 'rxdeep-local';

export class MyEncoder<T> implements Encoder<T> {
  encode(t: T | undefined) {
    return of(<encoded-string>);
  }

  decode(s: string | undefined | null) {
    return of(<decoded-object>);
  }
}
```
```ts
import { persistent, state } from 'rxdeep';
import { storage } from 'rxdeep-local';

import { MyEncoder } from './my-encoder';

const l = persistent(state(42), storage('<local-storage-key>', new MyEncoder<number>()));
```

<br>

Your custom encoder can be asynchronous in encoding/decoding. Encoding can be done in streaming mode, i.e. your encoder can
generate the encoded string in subsequent segments and emit each segment instead of emitting it all at once. It however does need
to complete to singal the process being finished.

Decoding can be iterative. Any value emitted by the decoder will be propagated in the state-tree, allowing for iterative refinement / completion
of a state object.
