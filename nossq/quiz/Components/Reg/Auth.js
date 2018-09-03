// import React, {Component} from 'react'
// import {
//     BrowserRouter as Router,
//     Route,
//     Link,
//     Redirect,
//     withRouter
// } from 'react-router-dom'
// import _AppBar from "../Appbar/appbar";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import firebaseFirestore from "../../services/firebaseFirestore";
import Reg from '../Reg/reg';
import RegisterCL from './public'
// import RaisedButton from "material-ui/RaisedButton";
// import Public from './public';


// // const fakeAuth = {
// //     isAuthenticated: false,
// //     authenticate(cb) {
// //         this.isAuthenticated = true
// //         setTimeout(cb, 100)
// //     },
// //     signout(cb) {
// //         this.isAuthenticated = false
// //         setTimeout(cb, 100)
// //     }
// // }

// //const Public = () => <h3>Public</h3>
// class Protected extends Component {
//     render() {
//         return <h1>Protected page</h1>;
//     }
// }

// class Login extends Component {
//     state = {
//         email: "",
//         password: "",
//         redirectToReferrer: false
//     };

//     authenticate = () => {
//         console.log('clicked')
//         const { email, password } = this.state;

//         firebaseFirestore.collection('collegeRegistrations')
//             .where('contingentLeaderEmail', '==', email)
//             .where('password', '==', password)
//             .get().then(snapshot => {
//                 for (let doc of snapshot.docs) {
//                     window.localStorage.setItem('isLoggedIn', true);
//                     window.localStorage.setItem('currentUserDocData', doc.data());
//                     console.log('state: LOGIN', window.localStorage);

//                     this.setState({ redirectToReferrer: true });
//                 }
//             });
//     };

//     handleChange = (e, v, varName) => {
//         console.log(v);
//         this.setState({
//             [varName]: v
//         });
//     };

//     render() {

//         const { from } = this.props.location.state || { from: { pathname: '/' } }
//         const redirectToReferrer = this.state.redirectToReferrer;

//         if (redirectToReferrer === true) {
//             console.log(from.pathname);
//             return <Redirect to={from} />
//         }

//         return (
//             <div
//                 style={{
//                     height: "100vh",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center"
//                 }}
//             >
//                 <div style={{ maxWidth: 250 }}>
//                     <TextField
//                         hintText="Email"
//                         onChange={(e, v) => this.handleChange(e, v, "email")}
//                     />
//                     <br />
//                     <br />
//                     <TextField
//                         type="password"
//                         hintText="Password"
//                         onChange={(e, v) => this.handleChange(e, v, "password")}
//                     />
//                     <br />
//                     <br />
//                     <RaisedButton
//                         onClick={this.authenticate.bind(this)}
//                         primary={true}
//                         label={`LOGIN`}
//                         style={{
//                             margin: 12,
//                             height: 46,
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center"
//                         }}
//                     />
//                 </div>
//             </div>
//         );
//     }
// }

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={(props) => (
//         window.localStorage.getItem('isLoggedIn')===true
//             ? <Component {...props} />
//             : <Redirect to={{
//                 pathname: '/login',
//                 state: { from: props.location }
//             }} />
//     )} />
// )

// const AuthButton = withRouter(({ history }) => (
//     window.localStorage.getItem('isLoggedIn') ? (
//         <p style={{ marginTop: 200 }}>
//             Welcome! <button onClick={() => {
//                 window.localStorage.clear();
//                 history.push("/");
//                 //fakeAuth.signout(() => history.push('/'))
//             }}>Sign out</button>
//         </p>
//     ) : (
//             <p>Login page message</p>
//         )
// ))

// export default function AuthExample() {
//     const style = {
//         margin: 12,
//     };

//     console.log(window.localStorage.getItem('isLoggedIn'));

//     return <Router>
//         <div>
//           <_AppBar color="rgba(255,255,255,1)" />
//           <AuthButton />
//             <div className="auth-switch" style={{ marginTop: 200 }} >
//                 <Link to="/public">
//                     <RaisedButton label="Public" primary={true} style={style} />
//                 </Link>
//                 <Link to="/protected">
//                     <RaisedButton label="Login" secondary={true} style={style} />
//                 </Link>
//             </div>
//           <Route path="/public" component={Public} />
//           <Route path="/login" component={Login} />
//           <PrivateRoute path="/protected" component={Protected} />
//         </div>
//       </Router>;
// }

import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom'

const fakeAuth = {
    isAuthenticated: (window.localStorage.getItem('isAuthenticated') === 'true') || false,
    authenticate(cb) {
        window.localStorage.setItem('isAuthenticated', true);
        this.isAuthenticated = true
        setTimeout(cb, 100)
    },
    signout(cb) {
        window.localStorage.setItem('isAuthenticated', false);
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

class UserForm extends React.Component {
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
        console.log('NewUser:authenticate');
        let data = {
            contingentLeaderEmail: email,
            password: password,
            mobile: mobile
        };
        firebaseFirestore.collection('collegeRegistrations').add(data).then(doc => {
                    console.log(data);
                    
                    window.localStorage.setItem('new', true);
                    window.localStorage.setItem('college_doc_data', JSON.stringify(data));
                    window.localStorage.setItem('college_doc_id', doc.id);
                    
                    fakeAuth.authenticate(() => {
                        this.setState(() => ({
                            redirectToReferrer: true
                        }))
                    })

                    console.log(fakeAuth);
        });
    }

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

class Login extends React.Component {
    state = {
        redirectToReferrer: false,
        email: "",
        password: ""
    }

    componentWillMount() {
        console.log(window.localStorage.getItem('isAuthenticated'));
        console.log(fakeAuth);
    }

    login = () => {

        console.log('clicked')
        const { email, password } = this.state;

        firebaseFirestore.collection('collegeRegistrations')
            .where('contingentLeaderEmail', '==', email)
            .where('password', '==', password)
            .get().then(snapshot => {
                for (let doc of snapshot.docs) {

                    console.log(doc);
                    window.localStorage.setItem('college_doc_data', JSON.stringify(doc.data()));
                    window.localStorage.setItem('college_doc_id', doc.id);
                    
                    fakeAuth.authenticate(() => {
                        this.setState(() => ({
                            redirectToReferrer: true
                        }))
                    })
                }
            });

        
    }


    handleChange = (e, v, varName) => {
        console.log(v);
        this.setState({
            [varName]: v
        });
    };

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state

        if (redirectToReferrer === true) {
            return <Redirect to={from} />
        }

        return (
            <div>
                <p>You must log in to view the page</p>
                <TextField
                    hintText="Email"
                    onChange={(e, v) => this.handleChange(e, v, "email")}
                />
                <TextField
                    hintText="Password"
                    onChange={(e, v) => this.handleChange(e, v, "password")}
                />
                <button onClick={this.login}>Log in</button>
            </div>
        )
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        fakeAuth.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
    )} />
)

const AuthButton = withRouter(({ history }) => (
    fakeAuth.isAuthenticated ? (
        <p>
            Welcome! <button onClick={() => {
                fakeAuth.signout(() => history.push('/'))
            }}>Sign out</button>
        </p>
    ) : (
            <p>You are not logged in.</p>
        )
))

export default function AuthExample() {
    return (
        <Router>
            <div style = {{ background: '#fff', height: '100vh', overflow:'auto' }} >
                <AuthButton />
                {/* <ul>
                    <li><Link to="/public">Public Page</Link></li>
                    <li><Link to="/protected">Protected Page</Link></li>
                </ul> */}
                <Route path="/public" component={UserForm} />
                <Route path="/login" component={Login} />
                <PrivateRoute path='/protected' component={Reg} />
            </div>
        </Router>
    )
}