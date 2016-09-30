import { combineReducers } from 'redux';
import { IClickAction, CLICKED } from '../actions';

export interface iClickerState {
    clicker: number;
    timesClicked: number;
}

function clicker(state : number = 0, action : IClickAction) : number {
    if (action.type === CLICKED) {
        return state + action.increment;
    }

    return state;
}

function timesClicked(state : number = 0, action : IClickAction) : number {
    if (action.type === CLICKED) {
        return state + 1;
    }

    return state;
}

export default combineReducers<iClickerState>({
    clicker,
    timesClicked
});

{{#if_eq useReselect true}}
// Selectors
export function getAvgIncrease(clicker : number, timesClicked : number) : number {
    return clicker/timesClicked;
}
{{/if_eq}}