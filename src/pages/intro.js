import {MDLocations} from "./base";

export class Locations extends MDLocations {
    curLoc = 'start';

    start = () => `
Start

[Next](#loc1)
`;

    loc1 = () => `
Loc1

[Back](#start)
`;

}
