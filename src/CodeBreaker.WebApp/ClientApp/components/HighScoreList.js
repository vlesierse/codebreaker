import * as React from 'react';
import { Table } from 'semantic-ui-react'

const HighScoreList = ({ scores }) => {
    return (<Table>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell width='one'></Table.HeaderCell>
                <Table.HeaderCell width='seven'>Name</Table.HeaderCell>
                <Table.HeaderCell width='four'>Attempts</Table.HeaderCell>
                <Table.HeaderCell width='four'>Duration</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {scores.map((s, i) => (<Table.Row key={i}>
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell>{s.name}</Table.Cell>
                <Table.Cell>{s.attempts}</Table.Cell>
                <Table.Cell>{s.duration}</Table.Cell>
            </Table.Row>))}
        </Table.Body>
    </Table>);
};

export default HighScoreList;