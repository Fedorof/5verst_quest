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
            title: new Title(this.basePath, 'title', this.store),
            intro: new Intro(this.basePath, 'intro', this.store),
            yard: new Yard(this.basePath, 'yard', this.store),
            road: new Road(this.basePath, 'road', this.store),
            forest: new Forest(this.basePath, 'forest', this.store),
            ending: new Ending(this.basePath, 'ending', this.store)
        };
    }

    getToolbar() {
        return `${
            this.startQuestName !== this.store.get('__cur_quest', this.startQuestName)
                ? "[На головну](#__main)"
                : ""
            } &nbsp;
        [Скинути](#__reset)`;
    }
}
