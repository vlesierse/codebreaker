import * as React from 'react';
import { Table } from 'semantic-ui-react'

import Attempt from './Attempt';

const AttemptList = ({ attempts }) => {
    //return (<div>{attempts.map((a, i) => <Attempt key={i} code={a.code} match={a.match} exists={a.exists} correct={a.corrent} />)}</div>);
    if (attempts.length == 0)
        return (<div></div>);
    return (<Table>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell colSpan={attempts[0].code.length} width={10}>Code</Table.HeaderCell>
                <Table.HeaderCell width='six'>Result</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {attempts.map((a, i) => <Attempt key={i} code={a.code} match={a.match} exists={a.exists} correct={a.corrent} />)}
        </Table.Body>
    </Table>);
};

export default AttemptList;