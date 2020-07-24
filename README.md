![banner](/rxdeep-local-banner.png)

```bash
npm i rxdeep-local
```

Provides a _storage_ concept for [RxDeep](https://loreanvictor.github.io/rxdeep/) states, alongside `localStorage` integration for convenience.
This means reactive states that load their value from a storage upon initialization, save their value into the store upon change, and can also
keep their value in sync if the storage mechanism provides a push update mechanism. The storage mechanism can be browser's `localStorage` (which
is provided by the package itself), or it can be a remote server where data is fetched and modified by `GET/PUT` requests and updates are
pushed via a websocket.
