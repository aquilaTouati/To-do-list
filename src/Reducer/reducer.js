const initialState = { list: [] };

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      return { list: [...state.list, action.payload] };
    case "SUPPRIMER":
      return {
        list: [...state.list.filter((value) => value.id !== action.payload)],
      };
    case "DONE":
      const index = state.list.findIndex(
        (value, index) => value.id == action.payload
      );
      state.list[index].done = true;
      return {
        list: [...state.list],
      };
    default:
      return state;
  }
};
export default listReducer;
