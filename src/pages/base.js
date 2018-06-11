import React from 'react';
import ReactMarkdown from 'react-markdown';
import Store from "es6-store/src/Store";


export class MDQuest {
    questName = 'quest';
    startLoc = 'start';

    constructor() {
        this.store = new Store(this.questName);
    }

    reset() {
        this.store.clear();
    }

    goTo(name) {
        this.store.set('__location', name);
        this.store.set(
            name, this.store.get(name, 0)+1);
    }

    getLocation() {
        let locName = this.store.get('__location', this.startLoc);
        let loc = this[locName]();
        return <ReactMarkdown source={loc}/>
    }

    carousel(name, choices) {
        let num = (this.store.get(name, 0)+1) % choices.length;
        this.store.set(name, num);
        return choices[num];
    }

    rnd(choices) {
        return choices[Math.floor(Math.random()*choices.length)];
    }
}
