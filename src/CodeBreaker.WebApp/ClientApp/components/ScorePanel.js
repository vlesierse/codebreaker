import * as React from 'react';
import { Button, Form, Icon, Grid, Header } from 'semantic-ui-react'

export default class ScorePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: null };
    }
    handleChange = (e) => {
        this.setState({ name: e.target.value });
    }
    handleEnterName = (e) => {
        this.props.registerScore(this.state.name);
    }
    render() {
        return (<Form>
            <Form.Group>
                <Header as="h2">Congrats, you guessed it!</Header>
            </Form.Group>
            <Form.Group><Icon name="thumbs up"/>{this.props.score.attempts} attempts</Form.Group>
            <Form.Group><Icon name="time"/>{this.props.score.duration} seconds</Form.Group>
            <Form.Group widths='equal'>
                <Form.Field>
                    <input placeholder="Name" onChange={this.handleChange} />
                </Form.Field>
                <Form.Field>
                    <Button circular icon='play' color='green' onClick={this.handleEnterName} disabled={!(this.state.name && this.state.name !== '')} />
                </Form.Field>
            </Form.Group>
        </Form>);
    }
}