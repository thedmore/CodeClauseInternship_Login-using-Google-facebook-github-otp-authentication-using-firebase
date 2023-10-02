import React, { Component } from "react";
import { Link } from "react-router";
import { firebaseApp } from "../config/fbConfig";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", error: "" };
  }

  onhandleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  signUp = e => {
    e.preventDefault();
    const { email, password } = this.state;
    //   console.log(this.state);
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log("signup successful", value);
      })
      .catch(err => {
        console.log("error message:", err);
        this.setState({ error: err.message });
      });
  };

  render() {
    return (
      <div className="container">
        <form className="col-md-4 jumbotron ml-auto" onSubmit={this.signUp}>
          <h4>Sign Up</h4> <hr />
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={this.state.email}
              onChange={this.onhandleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={this.state.password}
              onChange={this.onhandleChange}
            />
          </div>
          <button className="btn btn-primary">Sign Up</button>
          <br />
          <div className="panel">
            <div>
              Already a user ?<Link to={"/signin"}> SignIn</Link>
            </div>
            <div className=" text-danger">{this.state.error}</div>
          </div>
        </form>
      </div>
    );
  }
}
