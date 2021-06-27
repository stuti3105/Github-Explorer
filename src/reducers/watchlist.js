export const ADD = "add";
export const DELETE = "delete";

const initialState = { watchList: []};

export function reducers(state = initialState, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        watchList: [...state.watchList, action.item]
      };
    case DELETE: {
      delete state.watchList[action.item];
      return { ...state };
    }

    default:
      return state;
  }
}

export function addToWatchList({ item}) {
  return { type: ADD, item };
}

export function deleteFromWatchList({ item }) {
  return { type: DELETE, item };
}
