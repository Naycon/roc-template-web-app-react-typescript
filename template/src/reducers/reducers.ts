{{#if_eq useReducerDecorator false}}
export {default as clickState} from './clicker';
{{/if_eq}}
{{#if_eq useReducerDecorator true}}
export {default as clickState} from './clickerClass';
{{/if_eq}}
