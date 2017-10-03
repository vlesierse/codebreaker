import * as React from 'react';

export default class CodeDigit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {digit: props.digit};
    }
    handleChange = (event) => {
        var digit = parseInt(event.target.value);
        this.setState({digit: digit});
        this.props.onChange(digit, this, event);
    }
    render() {
        return (<input value={this.state.digit || ''} onChange={this.handleChange} />);
    }
};