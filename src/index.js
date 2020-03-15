import React from 'react';
import ReactDOM from 'react-dom';

import Home from './Pages/Home';
import Autores from './Pages/Autores';
import Sobre from './Pages/Sobre';
import Livros from './Pages/Livros';
import NotFound from './Pages/NotFound';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' exact={true} component={Home} />
      <Route path='/autores' exact={true} component={Autores} />
      <Route path='/sobre' component={Sobre} />
      <Route path='/livros' component={Livros} />
      {/* <Route component={NotFound} /> */}
    </Switch>
  </BrowserRouter>, 
  document.getElementById('root')
);
