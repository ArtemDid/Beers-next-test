import { createStore } from 'redux';
import { TypeAction, TypeState } from '../styles/globals';

const initialStateBeers:TypeState = {
  beers: []
}

const reduser = function (state:TypeState = initialStateBeers, action:TypeAction) {

  switch (action.type) {
    case "ACTION_SET_BUY_BEER":
      {
        return { ...state, beers: action.payload }
      }
    default: return state;
  }
}

const store = createStore(reduser);

store.subscribe(function () {
  console.log(store.getState());
});

export default store;