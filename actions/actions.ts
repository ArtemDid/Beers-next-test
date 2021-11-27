import { TypeAction, TypesBeers } from "../styles/globals"

export const CreateActionSetBeer = function (beers:Array<TypesBeers>):TypeAction {
  return {
    type: "ACTION_SET_BUY_BEER",
    payload: beers
  }
}