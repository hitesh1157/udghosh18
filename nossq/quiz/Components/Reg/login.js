import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import firebaseFirestore from "../../services/firebaseFirestore";
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    withMobileDialog
} from 'material-ui/Dialog';
import { Route, Link, Switch, Redirect } from 'react-router-dom';

import './login.css';

class Login extends Component {
  state = {
    email: "",
    password: "",
    
  };

  authenticate = () => {
    console.log('clicked')
    const { email, password } = this.state;

    firebaseFirestore.collection('collegeRegistrations')
            .where('contingentLeaderEmail', '==', email)
            .where('password', '==', password)
            .get().then(snapshot => {
              for (let doc of snapshot.docs) {
                window.localStorage.setItem('isLoggedIn', true);
                window.localStorage.setItem('currentUserDocData', doc.data());
                console.log('state: LOGIN', window.localStorage);

                this.setState({ redirectToReferrer: true });
              }
            });
  };

  handleChange = (e, v, varName) => {
    console.log(v);
    this.setState({
      [varName]: v
    });
  };

  render() {

      const { from } = this.props.location.state || { from: { pathname: '/' } }
      const redirectToReferrer = this.state.redirectToReferrer;

      if (redirectToReferrer === true) {
          console.log(from.pathname);
          return <Redirect to={from} />
      }

    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div style={{ maxWidth: 250 }}>
          <TextField
            hintText="Email"
            onChange={(e, v) => this.handleChange(e, v, "email")}
          />
          <br />
          <br />
          <TextField
            type="password"
            hintText="Password"
            onChange={(e, v) => this.handleChange(e, v, "password")}
          />
          <br />
          <br />
          <RaisedButton
            onClick={this.authenticate.bind(this)}
            primary={true}
            label={`LOGIN`}
            style={{
              margin: 12,
              height: 46,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          />
        </div>
      </div>
    );
  }
}

export default Login;