import React, { Component } from 'react';
import {Route, HashRouter, Switch, Redirect} from 'react-router-dom';
import './App.css';
import {Locations} from './pages/intro';

const questPath = '/';


class Quest extends Component {
    locations = new Locations();

    render() {
        if (this.props.match.params.location !== undefined) {
            return this.reset()
        }
        this.updateLocName();
        let loc = this.getLoc();

        return (
            <div>
                { loc }
            </div>
        );
    }

    reset() {
        return <Redirect
            to={{
                pathname: "/",
                state: {locName: this.props.match.params.location}
            }}
        />;
    }

    getLoc() {
        return this.locations.getLocation();
    };

    updateLocName() {
        if (this.props.location.state !== undefined) {
            this.locations.goTo(this.props.location.state.locName);
        }
    }
}


class App extends Component {
    render() {
        return (
            <div className="App">
                <HashRouter hashType={'noslash'}>
                    <Switch>
                        <Route exact path={ questPath } component={Quest} />
                        <Route path='/:location' component={Quest} />
                    </Switch>
                </HashRouter>
            </div>
        );
    }
}

export default App;
