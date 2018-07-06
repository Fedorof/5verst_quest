import { Component } from 'react';


export class Controller extends Component {
    /** @abstract
     * @returns QuestInterface*/
    getQuest() {
    };

    constructor() {
        super();
        this.quest = this.getQuest();
    }

    render() {
        this.updateLocName();
        return this.getLocation();
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
