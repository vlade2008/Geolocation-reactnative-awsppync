import update from 'react-addons-update';
const initialAuthState = {
  activeAuth:{}
};

export default function auth(state = initialAuthState, action) {
  switch (action.type) {

    case 'Login':
      return update(state,{
          activeAuth:{
            $set:action.data
          }
      });

    case 'Logout':
      return update(state,{
          activeAuth:{
            $set:{}
          }
      });

    default:
      return state;
  }
}
