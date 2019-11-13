import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";

const StylDivA = styled.div`
  height:50px;
  background-color: #f3f160;
  border-bottom: 1px solid black;
  margin-bottom:20px;
  display:flex;
  justify-content: space-around;
  align-items: center;
`;

const StylDivB = styled.div`
  width:300px;
  display:flex;
  justify-content: center;
  align-items: center;
`;

const StylH1 = styled.h1`
  margin-left:10px;
  margin-right:10px;
  margin-top:0;
  margin-bottom:0;
  text
`;

const StylLink = styled(Link)`
  margin-left:10px;
  margin-right:10px;
`;




export default function Header() {
  
  return (
    <StylDivA>
      <StylH1>The Friends Website</StylH1>

      <StylDivB>
        <StylLink to="/login">Login</StylLink>
        <StylLink to="/friendsList">Friends List</StylLink>
        <StylLink to="/addFriend">Add Friend</StylLink>
      </StylDivB>

    </StylDivA>    
  );
} 