import { PersistentState, State, Change } from 'rxdeep';
import { OperatorFunction } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { storage } from './storage';


export class LocalState<T> extends PersistentState<T> {
  constructor(
    readonly state: State<T>,
    readonly key: string,
    readonly transform: OperatorFunction<Change<T>, Change<T>> = debounceTime(100),
  ) {
    super(state, storage(key), transform);
  }
}
