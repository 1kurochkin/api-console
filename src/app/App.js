import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginPage from "../pages/LoginPage/LoginPage";
import "./App.styles.css"


function App() {
  return (
      <div className="App">
        <Switch>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </div>
  );
}

export default App;
