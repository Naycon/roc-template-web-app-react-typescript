import { clicker, IClickAction } from './clicker';
import expect from 'expect';

describe('clicker', () => {
    function getClickAction(increment : number) : IClickAction {
        return {type: 'CLICKED', increment};
    }
    it('should increment correctly when no state is provided', () => {
        const result = clicker(undefined, getClickAction(1));
        expect(result).toBe(1);
    })
});