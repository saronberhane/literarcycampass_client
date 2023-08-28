import React from "react";
import Header from "../common/header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../home/Home";
import About from "../about/About";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import Author from "../author/Author";
import Genre from "../genre/Genre";
import Login from "../login/login";
import SignUp from "../signup/signup";
import Profile from '../profile'
import Reader from "../reader";
const Pages = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/book/:id" component={Services} />
          <Route exact path="/author/:id" component={Author} />
          <Route exact path="/reader/:id" component={Reader} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/genre/:id" component={Genre} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />

        </Switch>
        {/* <Footer /> */}
      </Router>
    </>
  );
};

export default Pages;
