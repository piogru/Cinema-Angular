import {Showing} from './ShowingClass';

const showings: Showing[] = [];

let seans1 = new Showing('2022-01-01',1,1,2,[2,3]);
showings.push(seans1);
let seans2 = new Showing('2022-01-01',2,1,4,[1,2,3,4]);
showings.push(seans2);

export const Showings = showings;