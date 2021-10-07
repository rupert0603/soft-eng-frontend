const initialState = {
    id: null,
    profile: {}
  };
  
  export const user = (state = initialState, action) => {
    switch (action.type) {
      // case LOAD_USER: 
      //   state.id = action.id;
      //   state.profile = action.profile;
      //   return state; // or just return; (immer way)
      default:
        return state;  //important return state on default for initialState!!
    }
  };