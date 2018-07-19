import {QuestWord} from "../framework/quest";
import {Title} from "./title";
import {Intro} from "./intro";
import {Yard} from "./yard";
import {Road} from "./road";
import {Forest} from "./forest";
import {Ending} from "./ending";
import {Ford} from "./ford";


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
            ford: new Ford(this.basePath, 'ford', this.store),
            ending: new Ending(this.basePath, 'ending', this.store)
        };
    }

    getToolbar() {
        return super.getToolbar("На головну", "Скинути")
    }

    goTo(name, skipCount) {
        if (name === 'intro:вступ') {
            let zoom = this.store.get('__zoom', 1);
            this.reset();
            this.store.set('__zoom', zoom);
        }
        super.goTo(name, skipCount)
    }
}
