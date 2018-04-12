

const INITIAL_STATE = {
    activeRecord:{
      test:'test',
      test1:'test2'
    }
};


const items = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case "ADD_ITEM": {
    //   return [
    //     ...state,
    //     {
    //       id: nextItemId++,
    //       name: action.name,
    //       bgColor: action.bgColor
    //     }
    //   ];
    // }
    default:
      return state;
  }
};

export default items;
