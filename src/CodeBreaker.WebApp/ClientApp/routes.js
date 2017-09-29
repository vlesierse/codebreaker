import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Game from './components/Game';
import Layout from './components/Layout';

export const routes = <Layout>
    <Route exact path='/' component={ Game } />
</Layout>;
