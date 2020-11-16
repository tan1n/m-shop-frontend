import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "bootswatch/dist/lux/bootstrap.min.css";
import Shop from './Components/Shop';

function App() {
  window.extAsyncInit = function () {
    // the Messenger Extensions JS SDK is done loading 
    window.MessengerExtensions.getContext('1396246627246563', (thread_context) => {
      document.write(JSON.stringify(thread_context))
    }, (err) => {
      document.write(JSON.stringify(err))
    })

    window.MessengerExtensions.getSupportedFeatures(function success(result) {
      let features = result.supported_features;
      document.write(JSON.stringify(features))
    }, (err) => {
      document.write(JSON.stringify(err))
    })
  }

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
