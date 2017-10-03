import * as React from 'react';
import { Button, Form } from 'semantic-ui-react'

import CodeDigit from './CodeDigit';

export default class ScorePanel extends React.Component {
    render() {
        return (<div>{this.props.score.attempts} | {this.props.score.duration}</div>);
    }
}