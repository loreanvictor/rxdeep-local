![banner](/rxdeep-local-banner.png)

```bash
npm i rxdeep-local
```

Reactive states that persist on `localStorage` and are shared between different tabs/windows, based on [RxDeep](https://loreanvictor.github.io/rxdeep/):

```ts
import { LocalState } from 'rxdeep-local';
import { State } from 'rxdeep';

const s = new LocalState(new State(42), 's');
s.subscribe();

s.value = 43; // --> updates local storage, informs other tabs/windows of the change.
```
