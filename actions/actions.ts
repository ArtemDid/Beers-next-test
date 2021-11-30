import { TypeActionBeers, TypeActionSort, TypesBeers } from "../styles/globals"

export const CreateActionSetBeer = function (beers:Array<TypesBeers>):TypeActionBeers {
  return {
    type: "ACTION_SET_BUY_BEER",
    payload: beers
  }
}

export const CreateActionSetSort = function (sort:string):TypeActionSort {
  return {
    type: "ACTION_SET_BUY_SORT",
    payload: sort
  }
}