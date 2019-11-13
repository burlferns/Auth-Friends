import axiosWithAuth from '../modules/axiosAuth';
import axios from 'axios';

export const LGIN_START = "LGIN_START";
export const LGIN_SUCC = "LGIN_SUCC";
export const LGIN_FAIL = "LGIN_FAIL";
export const LGIN_SET = "LGIN_SET";
export const FRND_START = "FRND_START";
export const FRND_DISP = "FRND_DISP";
export const FRND_FAIL = "FRND_FAIL";
export const FRND_ADD_START = "FRND_ADD_START";
export const FRND_ADD_SUCC = "FRND_ADD_SUCC";
export const FRND_ADD_FAIL = "FRND_ADD_FAIL";
export const FRND_ADD_SET = "FRND_ADD_SET";


function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}

const delay_time = 1500;  //This is length of artificial delay time so that we can see different states


//Logs in the user
export function loginSrv(data) {
  // console.log("In loginSrv, data:",data);  
  return function(dispatch) {
    
    dispatch({type:LGIN_START});

    axios
      .post("http://localhost:5000/api/login", data)
      .then(response => {
        // console.log("This is data from server, in THEN of loginSrv:",response.data.payload);
        pausecomp(delay_time); //This is artificail delay time so that we can see different states
        sessionStorage.setItem("token", response.data.payload);
        dispatch({type:LGIN_SUCC});
      })
      .catch(err => {   
        // console.log("This is data from server, in CATCH of loginSrv err:",err);
        // console.log("This is data from server, in CATCH of loginSrv err.response:",err.response);
        pausecomp(delay_time); //This is artificail delay time so that we can see different states
        if(err.response && err.response.status===403) {
          const errMsg = "You have entered an invalid username and/or password";
          dispatch({type:LGIN_FAIL,payload:errMsg});
        } else {
          const errMsg = ""+err;
          dispatch({type:LGIN_FAIL,payload:errMsg});
        }
      });

  };
}

//This sets the Login Form state properly on page refresh
export function setProperLoginState() {
  return {
    type: LGIN_SET,
  };
}


//Gets the Freinds data
export function getData() {
    
  return function(dispatch) {
    
    dispatch({type:FRND_START});
    
    axiosWithAuth()
      .get("http://localhost:5000/api/friends")
      .then(res => {
        console.log("This is data from server in a THEN FETCH:",res.data);
        pausecomp(delay_time); //This is artificail delay time so that we can see different states
        dispatch({type:FRND_DISP,payload:res.data});
      })
      .catch(err => {
        // console.log("This is data from server, in CATCH of loginSrv err:",err);
        // console.log("This is data from server, in CATCH of loginSrv err.response:",err.response);
        pausecomp(delay_time); //This is artificail delay time so that we can see different states
        if(err.response && err.response.status===404) {
          const errMsg = "Error: Data not found";
          dispatch({type:FRND_FAIL,payload:errMsg});
        } else {
          const errMsg = ""+err;
          dispatch({type:FRND_FAIL,payload:errMsg});
        }
      });

  };
}

//Adds a friend
export function addFriend(data) {
  // console.log("In addFriend, data:",data);  
  return function(dispatch) {
    
    dispatch({type:FRND_ADD_START});

    axiosWithAuth()
      .post("http://localhost:5000/api/friends", {...data, id:Date.now()})
      .then(response => {
        // console.log("This is data from server, in THEN of addFriend:",response);
        pausecomp(delay_time); //This is artificail delay time so that we can see different states
        dispatch({type:FRND_ADD_SUCC});
      })
      .catch(err => {   
        // console.log("This is data from server, in CATCH of addFriend err:",err);
        // console.log("This is data from server, in CATCH of addFriend err.response:",err.response);
        pausecomp(delay_time); //This is artificail delay time so that we can see different states
        if(err.response && err.response.status===404) {
          const errMsg = "Error: Server not accepting data";
          dispatch({type:FRND_ADD_FAIL,payload:errMsg});
        } else {
          const errMsg = ""+err;
          dispatch({type:FRND_ADD_FAIL,payload:errMsg});
        }
      });

  };
}

//This sets the AddForm state properly on dismount
export function setProperAddFriendState() {
  return {
    type: FRND_ADD_SET,
  };
}