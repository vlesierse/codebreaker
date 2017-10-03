import * as React from 'react';

import Attempt from './Attempt';

const AttemptList = ({attempts}) => {
    return (<div>{attempts.map((a, i) => <Attempt key={i} code={a.code} match={a.match} exists={a.exists} correct={a.corrent} />)}</div>);
};

export default AttemptList;