![banner](/rxdeep-local-banner.png)

```bash
npm i rxdeep-local
```

<br>

Reactive states that persist on `localStorage` and are shared between different tabs/windows, based on [RxDeep](https://loreanvictor.github.io/rxdeep/):

```ts
import { local } from 'rxdeep-local';
import { state } from 'rxdeep';

const s = local(state(42), 's');
s.subscribe();

s.value = 43; // --> updates local storage, informs other tabs/windows of the change.
```

<br>

Nested complex values are also possible:

```ts
const s = local(state({ x: 2, y: [{ z: 4 }, {z : 5}, {z : 6}]}, 's');
```

<br>

As per any [RxDeep](https://loreanvictor.github.io/rxdeep/) state, you can listen to and/or modify parts of a deep nested state:

```ts
const s = local(state({ x: 2, y: [{ z: 4 }, {z : 5}, {z : 6}]}, 's');

s.sub('y').sub(2).sub('z').subscribe(console.log);     // --> logs 5
s.sub('x').value = 3;                                  // --> updates the state, rewriting on localStorage and notifying other tabs
```
👉 Read [RxDeep documentation](https://loreanvictor.github.io/rxdeep/) for more info.
