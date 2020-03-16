import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import CustomerCreate from './pages/Customer/Create';
import CustomerEdit from './pages/Customer/Edit';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/customer" exact component={CustomerCreate} />
        <Route path="/customer/:id" component={CustomerEdit} />
      </Switch>
    </BrowserRouter>
  );
}
