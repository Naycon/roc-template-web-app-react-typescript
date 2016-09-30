import * as React from 'react';

import * as styles from './style.scss';

export interface iClickerProps {
    clicker: number;
    avgIncrease: number;
    click: (value : number) => void;
}

export class Clicker extends React.Component<iClickerProps, void> {
    refs: {
        [key: string]: (Element);
        incInput: (HTMLInputElement);
    };

    render() {
        return (
            <div className={styles.main}>
                <div className={styles.clicker}>
                    <span>{ this.props.clicker } +</span>
                    <input ref="incInput"
                        type="text"
                        defaultValue="1"
                    />

                    <button onClick={ () => {
                        const inputValue = this.refs.incInput.value.trim();
                        this.props.click(parseInt(inputValue, 10));
                    }}>
                        Modify the counter!
                    </button>
                </div>
                <p>(Avg. increase is { this.props.avgIncrease || 0 })</p>
            </div>
        );
    }
}
