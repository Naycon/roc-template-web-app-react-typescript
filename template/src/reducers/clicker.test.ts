import clickState from './clicker';
import { IClickAction, CLICKED } from '../actions';
import expect from 'expect';

describe('clicker', () => {
    function getClickAction(increment : number) : IClickAction {
        return {type: CLICKED, increment};
    }
    it('should increment correctly when no state is provided', () => {
        const result = clickState(undefined, getClickAction(1));
        expect(result.clicker).toBe(1);
    })
});