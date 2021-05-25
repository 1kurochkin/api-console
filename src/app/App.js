import React from 'react';
import {LoginPage} from "../pages/LoginPage/LoginPage";
import {ConsolePage} from "../pages/ConsolePage/ConsolePage";
import {Route, Switch} from 'react-router-dom';
import "./App.styles.css"


function App() {
    return (
        <div className="App">
                <Switch>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/main" component={ConsolePage}/>
                </Switch>
        </div>
    );
}

export default App;
