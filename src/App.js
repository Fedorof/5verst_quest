import React, { Component } from 'react';
import {Route, HashRouter, Switch} from 'react-router-dom';
import {Quest} from './pages/main';
import {Controller} from "./framework/controller";
import './App.css';

const questPath = '/';


class Main extends Controller {
    questPath = questPath;

    getQuest() {
        return new Quest();
    }
}

class App extends Component {
    render() {
        return (
            <HashRouter hashType={'noslash'}>
                <Switch>
                    <Route exact path={ questPath } component={Main} />
                    <Route path='/:location' component={Main} />
                </Switch>
            </HashRouter>
        );
    }
}

export default App;
