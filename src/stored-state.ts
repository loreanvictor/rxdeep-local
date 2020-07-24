import { State } from 'rxdeep';
import { merge } from 'rxjs';
import { tap, filter, share } from 'rxjs/operators';

import { Storage } from './storage';


export class StoredState<T> extends State<T> {
  constructor(
    readonly state: State<T>,
    readonly storage: Storage<T>,
  ) {
    super(
      storage.load() || state.value,
      merge(
        ...[state.downstream.pipe(tap(change => storage.save(change.value)))],
        ...(storage.changes ? [
          storage.changes().pipe(
            tap(value => this.next(value)),
            share(),
            filter(() => false),
          )
        ] : [])
      ),
      state.upstream,
    );
  }
}
