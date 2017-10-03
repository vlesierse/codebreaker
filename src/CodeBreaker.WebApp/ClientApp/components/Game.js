import * as React from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store';

import CodePanel from './CodePanel';
import AttemptList from './AttemptList';

class Game extends React.Component {
    constructor(props) {
        super(props);
    }
    handleCodeEnter = (code) => {
        this.props.enterCode(code);
    }
    handleStartGame = () => {
        this.props.startGame();
    }
    render() {
        let startView = (<div>
            <button onClick={this.handleStartGame}>Start Game</button>
        </div>);
        let gameView = (<div>
            <CodePanel onCodeEnter={this.handleCodeEnter} digits={this.props.options.digits} minValue={this.props.options.minValue} maxValue={this.props.options.maxValue} />
            <AttemptList attempts={this.props.attempts} />
        </div>);
        return this.props.id ? gameView : startView;
    }
}

export default connect((state) => state.game, actionCreators.game)(Game);
