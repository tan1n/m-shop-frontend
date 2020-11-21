import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "bootswatch/dist/lux/bootstrap.min.css";
import Shop from './Components/Shop';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/page/:pageId">
          <Shop />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
