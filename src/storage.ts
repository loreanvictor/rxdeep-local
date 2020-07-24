import { Observable, fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';


export interface Storage<T> {
  save(t: T | undefined): void;
  load(): T | undefined;
  changes?(): Observable<T | undefined>;
}


export function local<T>(key: string): Storage<T> {
  return {
    save(t: T | undefined) {
      localStorage.setItem(key, JSON.stringify(t));
    },

    load() {
      const raw = localStorage.getItem(key);
      if (raw) {
        return JSON.parse(raw) as T;
      }
    },

    changes() {
      return fromEvent(window, 'storage')
            .pipe(
              map(event => event as StorageEvent),
              filter(event => event.key === key),
              map(event => event.newValue ? JSON.parse(event.newValue) : undefined)
            )
    }
  }
}
