import { State } from 'rxdeep';

import { StoredState } from './stored-state';
import { local } from './storage';


export class LocalState<T> extends StoredState<T> {
  constructor(
    readonly state: State<T>,
    readonly key: string,
  ) {
    super(state, local(key));
  }
}
