import React from 'react';
import ReactMarkdown from 'react-markdown';

export class MDLocations {
    goTo(name) {
        this.curLoc = name;
    };

    getLocation() {
        let loc = this[this.curLoc];
        return <ReactMarkdown source={loc()}/>
    }
}
