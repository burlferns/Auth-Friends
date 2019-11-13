import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from './components/Header';
import LogInForm from './components/LogInForm';
import PrivateRoute from './components/PrivateRoute';
import FriendsList from './components/FriendsList';
import AddFriendForm from './components/AddFriendForm';

function App() {
  return (
    <Router>
      <div className="App">
      <Header/>
      <Route path="/login" component={LogInForm} />
      <PrivateRoute path="/friendsList" component={FriendsList} />
      <PrivateRoute path="/addFriend" component={AddFriendForm} />

    </div>
    </Router>
  );
}

export default App;
