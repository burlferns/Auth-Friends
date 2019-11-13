import {
  LGIN_START, LGIN_SUCC, LGIN_FAIL, LGIN_SET,
  FRND_START, FRND_DISP, FRND_FAIL,
  FRND_ADD_START, FRND_ADD_SUCC, FRND_ADD_FAIL, FRND_ADD_SET,
} from '../actions';




// //This is the final initialState to use for final app
const initialState = {
  friendsData: [],
  loginState: 0,  //0=not authenticated, 1=start suthentication, 2=successful, 3=failure
  loginErrMsg:"",
  friendListState:0,
  friendListErrMsg:"",
  addState:0,
  addErrMsg:"",
};


function reducer(state=initialState,action) {
  switch(action.type) {

    case LGIN_START: {
      const newState = {
        ...state,
        loginState: 1,
        loginErrMsg:"",
      } 
      return newState;
    }

    case LGIN_SUCC: {
      const newState = {
        ...state,
        loginState: 2,
        loginErrMsg: "",

      } 
      return newState;
    }

    case LGIN_FAIL: {
      const newState = {
        ...state,
        loginState: 3,
        loginErrMsg: action.payload,

      } 
      return newState;
    }

    //This sets the Login Form state properly on page refresh
    case LGIN_SET: {
      if(sessionStorage.getItem('token')) {
        const newState = {
          ...state,
          loginState: 2,
          loginErrMsg: "",
        } 
        return newState;
      } else {
        return state;
      }
    }
    
    case FRND_START: {
      const newState = {
        ...state,
        friendListState:1,
        friendListErrMsg:"",
      } 
      return newState;
    }

    case FRND_DISP: {
      const newState = {
        ...state,
        friendsData:action.payload,
        friendListState:0,
        friendListErrMsg:"",
      } 
      return newState;
    }

    case FRND_FAIL: {
      const newState = {
        ...state,
        friendsData:[],
        friendListState:2,
        friendListErrMsg:action.payload,
      } 
      return newState;
    }

    case FRND_ADD_START: {
      const newState = {
        ...state,
        addState:1,
        addErrMsg:"",
      } 
      return newState;
    }

    case FRND_ADD_SUCC: {
      const newState = {
        ...state,
        addState:2,
        addErrMsg:"",
      } 
      return newState;
    }

    case FRND_ADD_FAIL: {
      const newState = {
        ...state,
        addState:3,
        addErrMsg:action.payload,
      } 
      return newState;
    }

    //This sets the Login Form state properly on page refresh
    case FRND_ADD_SET: {
      const newState = {
        ...state,
        addState:0,
        addErrMsg:"",
      } 
      return newState;
    }
   

    default:
      return state;
  }
}

export default reducer;