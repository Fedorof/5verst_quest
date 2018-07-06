import React, { Component } from 'react';
import {Route, MemoryRouter, Switch} from 'react-router-dom';
import {Quest} from './pages/main';
import {Controller} from "./framework/controller";
import './App.css';

const questPath = '/';


class Main extends Controller {
    getQuest() {
        return new Quest(questPath);
    }
}

class App extends Component {
    render() {
        return (
            <MemoryRouter>
                <Route exact path={ questPath } component={Main} />
            </MemoryRouter>
        );
    }
}

export default App;
