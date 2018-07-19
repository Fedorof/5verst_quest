import { Component } from 'react';


export class Controller extends Component {
    /** @abstract
     * @returns QuestInterface*/
    getQuest() {
    };

    constructor() {
        super();
        this.quest = this.getQuest();
        this.onKeyDown = this.onKeyDown.bind(this);
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
    };

    onKeyDown(event){
        if(event.keyCode === 27 && window.origin === 'http://localhost:3000') {
            this.quest.goTo(this.quest.startQuestName + ':debug');
        }
    }
    componentDidMount(){
        document.addEventListener("keydown", this.onKeyDown, false);
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.onKeyDown, false);
    }
}
