import { Action } from 'redux';

import { CLICKED, IClickAction } from '../actions';
import { reducer, reduce, ReducerClass } from './decorators';

export interface iClickerState {
    clicker: number;
    timesClicked: number;
}

// Describe state shape and what it's default values should be
@reducer({
    clicker: 0,
    timesClicked: 0,
})
class ClickerReducer extends ReducerClass {
    // Extending ReducerClass gives us access to a static 'getReducers()' method

    // First param is which state should be reduced, second is for which action types the reduce function should be run
    @reduce('clicker', CLICKED)
    static clicker(state : number, action : IClickAction) : number {
        // Function name above can be anything, doesn't matter
        return state + action.increment;
    }

    @reduce('timesClicked', CLICKED)
    static timesClicked(state: number) : number {
        return state + 1;
    }
}
export default ClickerReducer.getReducers();

{{#if_eq useReselect true}}
// Selectors
export function getAvgIncrease(clicker : number, timesClicked : number) : number {
    return clicker/timesClicked;
}
{{/if_eq}}
