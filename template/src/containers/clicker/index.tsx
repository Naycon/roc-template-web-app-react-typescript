import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { click, IClickAction, IClickActionTrigger } from '../../actions';
import { iState } from '../../reducers/stateType';
import { Clicker, iClickerProps } from '../../components/clicker';
{{#if_eq useReselect true}}
import { avgIncreaseSelector } from '../../reducers/selectors';
{{/if_eq}}

interface iClickerContainerStateProps {
    clicker: number;
    avgIncrease: number;
}

interface iClickerContainerDispatchProps {
    click: (increase : number) => void;
}

function mapStateToProps(state : iState) : iClickerContainerStateProps {
    const { clicker } = state.clickState;
    {{#if_eq useReselect true}}
    const avgIncrease = avgIncreaseSelector(state);
    {{/if_eq}}
    {{#if_eq useReselect false}}
    const avgIncrease = clicker/state.clickState.timesClicked;
    {{/if_eq}}
    return {
        clicker,
        avgIncrease,
    };
}

function mapDispatchToProps(dispatch : Dispatch<IClickAction>) : iClickerContainerDispatchProps {
    return bindActionCreators({ click }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Clicker);
