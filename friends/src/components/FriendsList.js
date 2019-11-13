import React from "react";
import {connect} from 'react-redux';
import styled from "styled-components";

import {getData} from '../actions';

import ActionBtn from './ActionBtn';
import FriendCard from './FriendCard';

const StylH2 = styled.h2`
  margin-top:10px;
  text-align:center;
  
`;

const StylDiv = styled.div`
  display:flex;
  justify-content: center;
`;

const StylH3 = styled.h3`
  margin-top:30px;
  text-align:center;
`;

const StylDivB = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

function pageStatus(pageState,errMsg="") {
  switch(pageState) {
    case 0:
      return "";
    case 1:
      return "Getting Friend Data from server. Please wait...";
    case 2:
        return errMsg;
    default:
      return "Unknown Error";      
  }
}


function FriendsList(props) {
  const {getData,friendListState,friendListErrMsg,friendsData} = props;

  function clickHandler(e) {
    // console.log("The button is clicked");
    e.preventDefault();
    getData();
  };



  return ( <> 
    <StylH2>Friends List Page</StylH2>
    <StylDiv>
      <ActionBtn textDisplay={"Get Friend Data from Server"} clickHandler={clickHandler}/>
    </StylDiv>
    
    <StylH3>{pageStatus(friendListState,friendListErrMsg)}</StylH3>

    <StylDivB>
      {friendsData.map((item,index) => 
        <FriendCard
          item={item}
          key={index}
        />
      )}
    </StylDivB>
    
    
  </> );

}


function mapStateToProps(state) {
  return {
    friendListState: state.friendListState,
    friendListErrMsg: state.friendListErrMsg,
    friendsData: state.friendsData,
  };
}


export default connect(mapStateToProps,{getData})(FriendsList);