import * as React from 'react';
import { connect } from 'react-redux';
import { Container, Button } from 'semantic-ui-react'
import { actionCreators } from '../store';

import CodePanel from './CodePanel';
import ScorePanel from './ScorePanel';
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
        let startView = (<Container>
            <Button onClick={this.handleStartGame}>Start Game</Button>
        </Container>);
        let gameView = (<Container>
            <CodePanel onCodeEnter={this.handleCodeEnter} digits={this.props.options.digits} minValue={this.props.options.minValue} maxValue={this.props.options.maxValue} />
            <AttemptList attempts={this.props.attempts} />
        </Container>);
        let finishedGame = (<Container>
            <ScorePanel score={this.props.score}/>
            <Button onClick={this.handleStartGame}>Start Game</Button>
        </Container>);
        return this.props.id ? (this.props.score ? finishedGame : gameView) : startView;
    }
}

export default connect((state) => state.game, actionCreators.game)(Game);
