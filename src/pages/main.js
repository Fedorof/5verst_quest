import {QuestWord} from "../framework/quest";
import {Title} from "./title";
import {Intro} from "./intro";
import {Yard} from "./yard";
import {Road} from "./road";
import {Forest} from "./forest";
import {Ending} from "./ending";


export class Quest extends QuestWord {
    get startQuestName() {
        return "title"
    };

    getQuests() {
        return {
            title: new Title(this.store, 'title'),
            intro: new Intro(this.store, 'intro'),
            yard: new Yard(this.store, 'yard'),
            road: new Road(this.store, 'road'),
            forest: new Forest(this.store, 'forest'),
            ending: new Ending(this.store, 'ending')
        };
    }
}
