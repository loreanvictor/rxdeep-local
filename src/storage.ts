import { fromEvent, merge, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Storage } from 'rxdeep';


export function storage<T>(key: string): Storage<T> {
  return {
    save(t: T | undefined) {
      localStorage.setItem(key, JSON.stringify(t));
    },

    load() {
      return merge(
        of(localStorage.getItem(key))
        .pipe(
          filter(v => v !== null),
          map(v => JSON.parse(v!!))
        ),
        fromEvent(window, 'storage')
        .pipe(
          map(event => event as StorageEvent),
          filter(event => event.key === key),
          map(event => event.newValue ? JSON.parse(event.newValue) : undefined)
        )
      );
    },
  }
}
