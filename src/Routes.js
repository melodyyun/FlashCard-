import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {Home, StudyCardsPage, EditCardsPage} from './views';

const Routes = () => (
    <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/study-cards" component={StudyCardsPage} />
    <Route exact path="/edit-cards" component={EditCardsPage} />
    <Route render={() => <div>404 Not Found</div>} />
    </Switch>
);

export default Routes;
