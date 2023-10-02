import React, { Component } from "react";
import { Router, Route, browserHistory } from "react-router";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import { firebaseApp } from "./config/fbConfig";

firebaseApp.auth().onAuthStateChanged(user => {
  if (user) {
    console.log("User has already Signed in", user);
    browserHistory.push("/dashboard");
  } else {
    console.log("User has Signed out");
    browserHistory.push("/signup");
  }
});

class App extends Component {
  render() {
    return (
      <div
        className="container-fluid"
        style={{
          backgroundColor: "#232233",
          height: "100vh"
        }}
      >
        <Header />
        <Router path="/" history={browserHistory}>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
        </Router>
      </div>
    );
  }
}

export default App;
