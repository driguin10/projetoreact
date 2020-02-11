import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/main';
import Repository from './pages/repository';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/repository/:repository" component={Repository} />
        <Route path="/" exact component={Main} />
      </Switch>
    </BrowserRouter>
  );
}
