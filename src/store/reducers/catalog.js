const initialState = [];

export const catalog = (state = initialState, action) => {
  switch (action.type) {
    // case LOAD_CATALOG:
    //   state = action.data;
    //   return state; // or just return; (immer way)
    default:
      return state;  //important return draft on default for initialState!!
  }
};