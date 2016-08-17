import { Action } from 'redux';

const CLICKED = 'CLICKED';

export interface IClickAction extends Action {
  increment: number;
}

export function clicker(state : number = 0, action : IClickAction) : number {
  if (action.type === CLICKED) {
    return state + action.increment;
  }

  return state;
}

export interface IClickActionTrigger {
  (increment : number) : IClickAction;
}


export const click : IClickActionTrigger = (increment = 1) => {
  return { type: CLICKED, increment };
}
