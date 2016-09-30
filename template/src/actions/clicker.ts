import { Action } from 'redux';

import { CLICKED} from './facts';

export interface IClickAction extends Action {
  increment: number;
}

export interface IClickActionTrigger {
  (increment : number) : IClickAction;
}

export const click : IClickActionTrigger = (increment = 1) => {
  return { type: CLICKED, increment };
}
