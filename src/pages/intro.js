import {MDQuest} from "./base";

export class Quest extends MDQuest {
    start = () => `
Start ${this.rnd(['1', '2'])}

[Next](#loc1)
`;

    loc1 = () => `
Loc1

[Back](#start)
`;

}
