import * as React from 'react';

const Attempt = ({code, match, exists, correct}) => {
    return (<div>{code} - {match}:{exists}:{correct}</div>);
};

export default Attempt;