{{#if_eq useReducerDecorator false}}
import { iClickerState } from './clicker';
{{/if_eq}}
{{#if_eq useReducerDecorator true}}
import { iClickerState } from './clickerClass';
{{/if_eq}}

export interface iState {
    clickState: iClickerState;
}