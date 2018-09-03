import React from 'react';
import firebase from "firebase";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import firebaseFirestore from "../../services/firebaseFirestore";

export default class RegisterCL extends React.Component {

    state = {
        email: "",
        password: "",
        mobile: "",
        otp:"",
        redirectToReferrer: false,
        sendOtp: true
    };

    handleChange = (e, v, varName) => {
        this.setState({
            [varName]: v
        });
    };

    authenticate = () => {
        const { email, password, mobile } = this.state;
        console.log('authenticate');

        

        
        
        // this.setState({ redirectToReferrer: true });
        // firebaseFirestore.collection('collegeRegistrations')
        //     .where('contingentLeaderEmail', '==', email)
        //     .where('password', '==', password)
        //     .get(snapshot => {
        //         for (let docs of snapshot.docs) {
        //             window.localStorage.setItem('isLoggedIn', true);
        //         }
        //     });
    };

    render() {
        return (
            <div
                style={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <div style={{ maxWidth: 350 }}>
                        <h3>Create an Udghosh account</h3>
                    <TextField
                        hintText="Mobile"
                        onChange={(e, v) => this.handleChange(e, v, "mobile")}
                    />
                    <br />
                    <br />
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
                        label={`CREATE ACCOUNT`}
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