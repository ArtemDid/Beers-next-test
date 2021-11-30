import { createStore } from 'redux';
import { TypeState } from '../styles/globals';

const initialStateBeers: TypeState = {
  beers: [],
  beersAll: [],
  sort: 'all',
}

const reduser = function (state: TypeState = initialStateBeers, action: any) {

  switch (action.type) {
    case "ACTION_SET_BUY_BEER":
      {
        return { ...state, beers: action.payload, beersAll: Object.assign([], action.payload) }
      }
    case "ACTION_SET_BUY_SORT":
      {
        return { ...state, sort: action.payload }
      }
    default: return state;
  }
}

const store = createStore(reduser);

store.subscribe(function () {
  console.log(store.getState());
});

export default store;