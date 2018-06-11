import React, { Component } from 'react';
import {Route, HashRouter, Switch, Redirect, Link} from 'react-router-dom';
import './App.css';
import {Quest} from './pages/intro';

const questPath = '/';


class Main extends Component {
    quest = new Quest();

    render() {
        if (this.props.match.params.location !== undefined) {
            return this.resetPath()
        }
        this.updateLocName();
        return (
            <div>
                {this.getToolbar()}
                {this.getLoc()}
            </div>
        );
    }

    getToolbar() {
        return <Link to={`${questPath}/__reset`}>Reset</Link>;
    }

    resetPath() {
        return <Redirect
            to={{
                pathname: questPath,
                state: {locName: this.props.match.params.location}
            }}
        />;
    }

    getLoc() {
        return this.quest.getLocation();
    };

    updateLocName() {
        if (this.props.location.state !== undefined) {
            let locName = this.props.location.state.locName;
            if (locName === '__reset') {
                this.quest.reset();
            } else {
                this.quest.goTo(locName);
            }
        }
    }
}


class App extends Component {
    render() {
        return (
            <div className="App">
                <HashRouter hashType={'noslash'}>
                    <Switch>
                        <Route exact path={ questPath } component={Main} />
                        <Route path='/:location' component={Main} />
                    </Switch>
                </HashRouter>
            </div>
        );
    }
}

export default App;
