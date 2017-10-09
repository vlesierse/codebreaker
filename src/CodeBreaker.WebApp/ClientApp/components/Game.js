import * as React from 'react';
import { connect } from 'react-redux';
import { Container, Button, Grid, Header } from 'semantic-ui-react'
import { actionCreators } from '../store';

import CodePanel from './CodePanel';
import ScorePanel from './ScorePanel';
import AttemptList from './AttemptList';
import HighScoreList from './HighScoreList';
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
    handleRegisterScore = name => {
        this.props.registerScore(name);
    }
    render() {
        let startView = (<Container>
            <Header as="h2">Welcome to Code Breaker</Header>
            <Button onClick={this.handleStartGame}>Start Game</Button>
        </Container>);
        let gameView = (<Container>
            <CodePanel onCodeEnter={this.handleCodeEnter} digits={this.props.options.digits} minValue={this.props.options.minValue} maxValue={this.props.options.maxValue} />
            <AttemptList attempts={this.props.attempts} />
        </Container>);
        let finishedGame = (<Container>
            {this.props.isScoreRegistered ? <Header as="h2">Welcome to Code Breaker</Header> : <ScorePanel score={this.props.score} registerScore={this.handleRegisterScore} />}
            <Button onClick={this.handleStartGame}>Start Game</Button>
        </Container>);
        return (<Grid>
            <Grid.Row />
            <Grid.Row>
                <Grid.Column width="5" />
                <Grid.Column width="6">
                    {this.props.id ? (this.props.score ? finishedGame : gameView) : startView}
                </Grid.Column>
                <Grid.Column width="5" />
            </Grid.Row>
        </Grid>);
    }
}

export default connect((state) => state.game, actionCreators.game)(Game);
