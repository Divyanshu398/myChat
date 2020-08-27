import React from 'react';

import Chat from './components/chat/chat';
import Register from './components/register/register';
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';
import IndexPage from './components/IndexPage/IndexPage';
import Logout from './components/logout/logout';
import AllChatrooms from "./components/allChatrooms/allChatrooms"
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={IndexPage} />
      <Route path="/logout" exact component={Logout} />
      <Route path="/chatroom/:id/:name"exact component={Chat} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/allChatrooms" exact component={AllChatrooms} />
    </Router>
  );
}

export default App;