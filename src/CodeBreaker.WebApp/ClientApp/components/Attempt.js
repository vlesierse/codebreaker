import * as React from 'react';
import { Table, Icon, Input } from 'semantic-ui-react';

const Attempt = ({code, match, exists, correct}) => {
    return (<Table.Row>
        {code.map((c, i) => <Table.Cell key={i}>{c}</Table.Cell>)}
        <Table.Cell>
            {Array.apply(null, { length: match }).map((v,i) => <Icon key={i} name="check circle" />)}
            {Array.apply(null, { length: exists }).map((v,i) => <Icon key={i} name="dot circle outline" />)}
            {Array.apply(null, {length: code.length - (match + exists)}).map((v,i) => <Icon key={i} name="circle thin" />)}
        </Table.Cell>
    </Table.Row>);
};

export default Attempt;