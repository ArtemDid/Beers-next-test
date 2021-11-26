import { createStore } from 'redux';

const initialStateBeers = {
  beers: []
}

const reduser = function (state = initialStateBeers, action:any) {

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