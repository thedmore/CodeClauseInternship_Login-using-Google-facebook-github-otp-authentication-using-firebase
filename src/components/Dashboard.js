import React, { Component } from "react";
import { firebaseApp } from "../config/fbConfig";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: [],
      alert: false,
      alertData: {}
    };
    this.submitMessage = this.submitMessage.bind(this);
  }

  submitMessage(e) {
    e.preventDefault();
    const params = {
      name: this.inputName.value,
      country: this.inputCountry.value,
      age: this.inputAge.value
    };
    if (params.name && params.country && params.age) {
      firebaseApp
        .database()
        .ref("form")
        .push(params)
        .then(() => {
          this.alertMessage("success", "Message sent successfully");
          console.log(params);
          console.log("sent yipeee...");
        })
        .catch(() => {
          this.alertMessage("danger", "Message not sent ");
          console.log("error while submitting");
        });
      this.resetForm();
    } else {
      this.alertMessage("warning", "Please fill the form");
    }
    //upload image////////////////////////
  }

  resetForm() {
    this.refs.contactForm.reset();
  }

  alertMessage(type, message) {
    this.setState({ alert: true, alertData: { type, message } });
    setTimeout(() => {
      this.setState({ alert: false });
    }, 4000);
  }

  handleSignOut() {
    console.log("in signout func");
    firebaseApp
      .auth()
      .signOut()
      .then(function() {
        console.log("Sign-out successful");
      })
      .catch(function(error) {
        console.log("An error happened");
      });
  }

  componentWillMount() {
    let formRef = firebaseApp
      .database()
      .ref("form")
      .orderByKey()
      .limitToLast(6);
    formRef.on("child_added", snap => {
      const { name, country, age } = snap.val();
      const data = { name, country, age };
      this.setState({ form: [data].concat(this.state.form) });
    });
  }

  render() {
    const { form, alert, alertData } = this.state;
    return (
      <div className="container">
        <div className="col-md-12 jumbotron ">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                {alert && (
                  <div className={`alert alert-${alertData.type}`} role="alert">
                    <div className="container">{alertData.message}</div>
                  </div>
                )}
                <h4>User Entry</h4>
                <hr />
                <form onSubmit={this.submitMessage} ref="contactForm">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Name"
                      ref={name => (this.inputName = name)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <select
                      className="form-control"
                      id="country"
                      ref={country => (this.inputCountry = country)}
                    >
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Japan">Japan</option>
                      <option value="Germany">Germany</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                      type="number"
                      className="form-control"
                      id="age"
                      placeholder="Age"
                      ref={age => (this.inputAge = age)}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
                <br />
                <button className="btn btn-info" onClick={this.handleSignOut}>
                  Sign Out
                </button>
              </div>

              <div className="col-sm-1" />

              <div
                className="col-sm-7"
                style={{
                  border: "1px solid white",
                  height: "60vh",
                  overflowY: "scroll"
                }}
              >
                <div className="container">
                  <div className="row">
                    <h4>User List</h4>
                    <hr />
                    {form.map(user => (
                      <div
                        className="jumbotron"
                        key={user.name}
                        style={{ fontSize: "2px" }}
                      >
                        <h6 className="display-6"> {user.name} </h6>
                        <p className="lead"> {user.country} </p>
                        <hr />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
