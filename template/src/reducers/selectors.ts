import { createSelector } from 'reselect';
import { iState } from './stateType';

{{#if_eq useReducerDecorator false}}
import * as fromClicker from './clicker';
{{/if_eq}}
{{#if_eq useReducerDecorator true}}
import * as fromClicker from './clickerClass';
{{/if_eq}}
export const avgIncreaseSelector = createSelector(
    (state : iState) => state.clickState.clicker,
    (state : iState) => state.clickState.timesClicked,
    fromClicker.getAvgIncrease
)
