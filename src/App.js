import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "bootswatch/dist/lux/bootstrap.min.css";
import Shop from './Components/Shop';

function App() {
  window.extAsyncInit = function () {
    // the Messenger Extensions JS SDK is done loading 
    window.MessengerExtensions
      .getContext('1396246627246563',
        (thread_context) => {
          console.log(thread_context)
        },
        (err) => {
          console.log(err)
        }
      )
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/shop/:id">
          <Shop />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
