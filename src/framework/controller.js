import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';


export class Controller extends Component {
    questPath = '/';

    /** @abstract
     * @returns QuestInterface*/
    getQuest() {

    };

    constructor() {
        super();
        this.quest = this.getQuest();
    }

    render() {
        if (this.props.match.params.location !== undefined) {
            return this.resetPath()
        }
        this.updateLocName();
        return this.getLocation();
    }

    resetPath() {
        return <Redirect
            to={{
                pathname: this.questPath,
                state: {locName: this.props.match.params.location}
            }}
        />;
    }

    getLocation() {
        return this.quest.getLocation();
    };

    updateLocName() {
        if (this.props.location.state !== undefined) {
            let locName = this.props.location.state.locName;
            this.quest.goTo(locName);
        }
    }
}
