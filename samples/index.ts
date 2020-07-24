import { LocalState } from '../src';
import { State } from 'rxdeep';


const s = new LocalState(new State(42), 'number');
(window as any).s = s;
