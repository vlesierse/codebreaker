import * as React from 'react';
import { Button, Form } from 'semantic-ui-react'

import CodeDigit from './CodeDigit';

export default class CodePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { code: Array.apply(null, new Array(props.digits)), isValid: false };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.digits != this.props.digits) {
            this.setState({ code: new Array(nextProps.digits) });
        }
    }
    handleDigitChanged = (digit, element, event) => {
        var code = this.state.code;
        code[element.props.id] = digit;
        var isValid = code.every(d => Number.isInteger(d) && d >= this.props.minValue && d <= this.props.maxValue);
        this.setState({code: this.state.code, isValid: isValid});
    }
    handleEnterCode = (event) => {
        this.props.onCodeEnter(this.state.code);
    }
    render() {
        return (
        <Form>
            <Form.Group widths='equal'>
                {this.state.code.map((d, i) => (<CodeDigit id={i} key={i} digit={d} onChange={this.handleDigitChanged} />))}
                <Button circular icon='play' color='green' onClick={this.handleEnterCode} disabled={!this.state.isValid} />
            </Form.Group>
        </Form>);
    }
};