import React, { Component } from 'react';
import _AppBar from '../Appbar/appbar';

import fbIcon from '../../Resources/icons/facebook.png';
import twitterIcon from '../../Resources/icons/twitter.png';
import ytIcon from '../../Resources/icons/youtube.svg';
import gpIcon from '../../Resources/icons/googleplus.svg';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { grey900, grey100} from 'material-ui/styles/colors';

import Events from '../Events/events';
import ImageGallery from '../Gallery/gallery';
import Sponsors from '../Sponsors/sponsors';
import HomePage from '../Homepage/homepage';
import Dialog from 'material-ui/Dialog';
import Registration from '../temp/Registration/registration';
import IRegistration from '../temp/i/Registration/registration';
import Townscript from '../temp/Townscript/Townscipt';
import {IconMenu, MenuItem, RaisedButton, Snackbar} from "material-ui";
import bg from '../../Resources/img/background.png';
import Reg from "../Reg/reg";
import Team from "../Team/team";
import CA from '../CA/ca';
import Auth from '../Reg/Auth';
import firebase from 'firebase';
//import Login from '../Reg/login';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import TextField from 'material-ui/TextField';

import firebaseFirestore from "../../services/firebaseFirestore";

import './home.css';

import Fb from "../../Resources/icons/social/Facebook.png";
import Tw from "../../Resources/icons/social/Twitter.png";
import Ig from "../../Resources/icons/social/Instagram.png";
import YT from "../../Resources/icons/social/YouTube.png";


if (typeof (String.prototype.trim) === "undefined") {
  String.prototype.trim = function () {
    return String(this).replace(/^\s+|\s+$/g, '');
  };
}

let validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

let validateMobile = (mobile) => {
  var re = /^[6-9]\d{9}$/;
  return re.test(String(mobile));
}

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

class UserForm extends React.Component {
  state = {
    email: "",
    password: "",
    mobile: "",
    otp: "",
    redirectToReferrer: false,
    sendOtp: true,
    title: 'Create an Udghosh account',

    name:"",
    retypedPassword: "",
    collegeName: "",
    locationState: "",

    emailErr: "",
    passwordErr: "",
    
    mobileErr:"",
    otpErr:"",
    nameErr:"",
    collegeNameErr:"",
    locationStateErr:""

  };

  handleChange = (e, v, varName) => {
    let errorStr = varName + "Err";
    this.setState({
      [varName]: v,
      [errorStr]: ""
    });
  };

  componentWillMount() {
    if(window.localStorage.getItem('isAuthenticated')==='true') {
      window.location = window.location.origin + "/protected";
    }
  }




  authenticate = () => {
    const { email, password, mobile, name, retypedPassword, collegeName, locationState } = this.state;
    //console.log('NewUser:authenticate');
    let data = {
      contingentLeaderEmail: email,
      password: password,
      contingentLeaderContactNo: mobile,
      contingentLeaderName: name,
      collegeName: collegeName,
      locationState: locationState,
      isEmailVerified: false
    };

    let isFormValid = true;

    if(locationState === undefined ||  locationState.trim() === "") {
      alert("Please select a state.");
      isFormValid = false;
    }

    if(! validateEmail(email)) {
      this.setState({ emailErr: "This email is invalid" });
      isFormValid = false;
    }

    if(! validateMobile(mobile)) {
      this.setState({ mobileErr: "Invalid mobile number" })
      isFormValid = false;
    }

    if(password !== retypedPassword) {
      this.setState({ passwordErr: "Passwords do not match" });
      isFormValid = false;
    }

    if (password.length < 8) {
      this.setState({ passwordErr: "Password length must be at least 8" });
      isFormValid = false;
    }

    if(name.trim() === "" ) {
      this.setState({ nameErr: "This field is required" });
      isFormValid = false;
    }

    if(collegeName.trim() === "") {
      this.setState({ collegeNameErr: "This field is required" });
      isFormValid = false;
    }

    if(! isFormValid) {
        return;
    }

    firebase.auth().onAuthStateChanged(function (user) {
      if(user !== null && !user.emailVerified) {
        //console.log("email verification sending...");
        user.sendEmailVerification();
        if (window.confirm("An verification link has been sent to your email address. Click on that link to verify your email first and then login")) {
      
          // firebase.auth().signOut().then(() => {
          //   window.localStorage.setItem('isAuthenticated', false);
          //   //history.push('/');

          //   window.location.reload();
          // }).catch((error) => {
          //   alert("Unexpected error occured");
          //   //console.log(error);
          // })
        }
      } else if(user!== null) {
        //console.log("email already verified");
      } else {
        //console.log("user:null");
      }
    });

    //console.log(email, password);
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {

      //console.log("logged in: created");

      firebaseFirestore.collection('collegeRegistrations').where('contingentLeaderEmail', '==', email)
      .get().then(snapshot => {

        //console.log('length', snapshot.docs.length);
        if(snapshot.docs.length === 0) {
          firebaseFirestore.collection('collegeRegistrations').add(data).then(doc => {
            //console.log(data);

            window.localStorage.setItem('new', false);
            window.localStorage.setItem('college_doc_data', JSON.stringify(data));
            window.localStorage.setItem('college_doc_id', doc.id);

            // just do not authenticate
            // fakeAuth.authenticate(() => {
            //   this.setState(() => ({
            //     redirectToReferrer: true
            //   }))
            // });

            window.location = window.location.origin + "/protected";


            //console.log(fakeAuth);
          });
        } else {
          this.setState({
            title: 'User already exists. Continue to login.'
          });
        }

      }).catch(function(error) {
        //console.log(error);
      });



    })
    .catch(function (error) {
      
      var errorCode = error.code;
      var errorMessage = error.message;
      
      alert(errorMessage);
      //console.log(errorCode);
    });
    
  }

  render() {
    return (
      <div style={{ height: '100vh', overflow: 'hidden', background: "url('https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/background.png?alt=media&token=13f7c589-3fb9-44ec-8768-7426eaa54b67') no-repeat center / cover" }} >
        <_AppBar color="#fff" handleOpen={this.props.handleOpen} handleClose={this.props.handleClose} />
        
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >

          <div style={{ maxWidth: 550, minWidth: 400, padding: 16, backgroundColor: 'rgba(60, 100, 120, 0.8)', marginRight: 40, borderRadius: 15, border: '1px solid #3C6478' }}>
            <h2 style={{ color: '#fff', textAlign: 'center' }} >General Rules &amp; Information </h2>
          

            <p>

              <ul style={{ listStyle: 'none', padding: 16 }} >

          <li className="rules" >
                  Hospitality fee per participant: <strong>₹ 1600 + ₹ 200</strong>( (refundable security deposit). This includes food, accommodation and entry in various events.).
          </li>

                <li className="rules" >
                  Only one account is permitted per college.
          </li>
                <li className="rules" >
                  Matches shall be played according to the rules of respective International Federation as adopted from time to time by the All India Federation of the respective sport unless otherwise modified.
          </li>

                <li className="rules" >
                  Decision made by Judges/Referee will be final and binding.
          </li>

                <li className="rules" >
                  Rules and schedule are subject to change in the spirit of game and due to external factors.
          </li>

                <li className="rules" >
                  Rules for individual sports are <a target="_blank" href="https://docs.google.com/document/d/1yUZDGDEPn4TQ5pcWKx9BNgz0oeRJobPdqDbuqkZX9Fg/edit" ><u>here</u></a>.
          </li>

          <li className="rules" >
                  Be sure to check out the <a target="_blank" href="https://docs.google.com/document/d/1knTlP_XjZpiu3R2BgnYeQdhZGdhyVS1bjDPB7wGBW4w/edit?usp=sharing" ><u >prize money</u></a> for winning team <a target="_blank" href="https://docs.google.com/document/d/1knTlP_XjZpiu3R2BgnYeQdhZGdhyVS1bjDPB7wGBW4w/edit?usp=sharing" ><u>here</u></a>.
          </li>

                <li className="rules" >
                  If a participant is participating in more than one sport then we are not responsible for the time clash (in case).
          </li>

              </ul>


            </p>
          </div>
        
          <div style={{ maxWidth: 550, minWidth: 400, padding: 16, backgroundColor: 'rgba(255, 255,255, 0.8)', borderRadius: 15, border: '1px solid #ddd' }}>
            <h2 style={{ color: '#000', textAlign: 'center' }} >{this.state.title}</h2>
            <br/>

            <div

              style={{

                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <TextField
              errorText={this.state.nameErr}
                hintText="Full Name"
                onChange={(e, v) => this.handleChange(e, v, "name")}
              />
            </div>


            

            <div

              style={{

                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <TextField
                errorText={this.state.passwordErr}
                type="password"
                hintText="Password"
                onChange={(e, v) => this.handleChange(e, v, "password")}
              />
            </div>


            

            <div

              style={{

                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <TextField
              type="password"
                hintText="Retype Password"
                onChange={(e, v) => this.handleChange(e, v, "retypedPassword")}
              />
            </div>


            

            <div

              style={{

                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <TextField
                errorText={this.state.collegeNameErr}
                hintText="College Name"
                onChange={(e, v) => this.handleChange(e, v, "collegeName")}
              />
            </div>




            <div

              style={{

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20
              }}
            >
              {/* <TextField
                errorText={this.state.locationStateErr}
                hintText="State"
                onChange={(e, v) => this.handleChange(e, v, "locationState")}
              /> */}
              <select onChange={(e) => { this.setState({ locationState: e.target.value }) }} name="state" className="form-control selectpicker" required="">
                <option value="">Please select your state</option>
                <option>Andaman and Nicobar Islands</option>
                <option>Andhra Pradesh</option>
                <option>Arunachal Pradesh</option>
                <option>Assam</option>
                <option>Bihar</option>
                <option>Chandigarh</option>
                <option>Chattisgarh</option>
                <option>Dadra and Nagar Haveli</option>
                <option>Daman and Diu</option>
                <option>Delhi</option>
                <option>Goa</option>
                <option>Gujarat</option>
                <option>Haryana</option>
                <option>Himachal Pradesh</option>
                <option>Jammu and Kashmir</option>
                <option>Jharkhand</option>
                <option>Karnataka</option>
                <option>Kerala</option>
                <option>Lakshadweep</option>
                <option>Madhya Pradesh</option>
                <option>Maharashtra</option>
                <option>Manipur</option>
                <option>Meghalaya</option>
                <option>Mizoram</option>
                <option>Nagaland</option>
                <option>Orissa</option>
                <option>Pondicherry</option>
                <option>Punjab</option>
                <option>Rajasthan</option>
                <option>Sikkim</option>
                <option>Tamil Nadu</option>
                <option>Tripura</option>
                <option>Uttarakhand</option>
                <option>Uttaranchal</option>
                <option>Uttar Pradesh</option>
                <option>West Bengal</option>
              </select>
            </div>


            
           
            <div

              style={{

                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <TextField
                errorText={this.state.mobileErr}
                hintText="Mobile"
                onChange={(e, v) => this.handleChange(e, v, "mobile")}
              />
            </div>
            
            
            
            <div

              style={{

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                
              }}
            >
              <TextField
                hintText="Email"
                errorText={this.state.emailErr}
                onChange={(e, v) => this.handleChange(e, v, "email")}
              />
            </div>
            
            
            
            
            <div

              style={{

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20
              }}
            >
              <RaisedButton
                onClick={this.authenticate.bind(this)}
                primary={true}
                label={`CREATE ACCOUNT`}
                style={{
                  maxWidth: 300,
                  margin: 12,
                  height: 46,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              />
            </div>

            <div

              style={{

                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Link to="/protected">
                <a style={{ color: '#4885ed' }} >Already have an account? Login.</a>
              </Link>
            </div>
           
          </div>
        </div>
      </div>
    );
  }
}

class Login extends React.Component {
  state = {
    redirectToReferrer: false,
    email: "",
    password: "",
    title: 'Login to your Udghosh account'
  }

  componentWillMount() {
    
  }

  login = () => {

    //console.log('clicked')
    const { email, password } = this.state;

    firebase.auth().onAuthStateChanged(function (user) {
      if (user!==null && !user.emailVerified) {
        
        
        if (window.confirm("An verification link has been sent to your email address. Click on that link to verify your email first and then login")) {
          firebase.auth().signOut().then(() => {
            //console.log(window.localStorage.getItem('isAuthenticated'));
            window.localStorage.setItem('isAuthenticated', false);
            //history.push('/');

            window.location.reload();
          }).catch((error) => {
            alert("Unexpected error occured");
            //console.log(error);
          })
        
        } else if(user!== null) {
          //console.log("email already verified");

          // valid user
          window.localStorage.setItem('isAuthenticated', true);



          // firebase.auth().signOut().then(() => {
          //   //console.log(window.localStorage.getItem('isAuthenticated'));
          //   window.localStorage.setItem('isAuthenticated', false);
          //   //history.push('/');

          //   window.location.reload();
          // }).catch((error) => {
          //   alert("Unexpected error occured");
          //   //console.log(error);
          // })
        }


      } else {
        //console.log('user:null');
        
      }
    });

    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {

      firebaseFirestore.collection('collegeRegistrations')
        .where('contingentLeaderEmail', '==', email)
        .where('password', '==', password)
        .get().then(snapshot => {
          if (snapshot.docs.length === 0) {
            this.setState({
              title: 'Either username or password is incorrect. Please try again.'
            })
          }
          for (let doc of snapshot.docs) {

            //console.log('here');
            window.localStorage.setItem('college_doc_data', JSON.stringify(doc.data()));
            window.localStorage.setItem('college_doc_id', doc.id);

            //console.log(window.localStorage.getItem("isAuthenticated"));
            fakeAuth.authenticate(() => {

              this.setState(() => ({
                redirectToReferrer: true
              }))
            })
          }
        });



    }).catch((error) => {
      alert(error.message);
      //console.log(error.code);
    });

    

  }


  handleChange = (e, v, varName) => {
    //console.log(v);
    
    this.setState({
      [varName]: v,
      title: 'Login to your Udghosh account'
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (window.localStorage.getItem('isAuthenticated') === 'true') {
      return <Redirect to="/protected" />
    }

    return (
      <div style={{ height: '100vh', overflow: 'hidden', background: "url('https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/background.png?alt=media&token=13f7c589-3fb9-44ec-8768-7426eaa54b67') no-repeat center / cover" }} >
        <_AppBar color="#fff" handleOpen={this.props.handleOpen} handleClose={this.props.handleClose} />
        <p>You must log in to view the page</p>

        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div style={{ maxWidth: 550, minWidth: 400, padding: 40, backgroundColor: 'rgba(255, 255,255, 0.8)', borderRadius: 15, border: '1px solid #ddd' }}>
            <h2 style={{ color: '#000', textAlign: 'center' }} >{this.state.title}</h2>
            <br/>
            <div
              style={{
  
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <TextField
                hintText="Email"

                onChange={(e, v) => this.handleChange(e, v, "email")}
              />
              
              
            </div>
            
            <br />
            <div
            
              style={{

                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <TextField
                type="password"
                hintText="Password"
                onChange={(e, v) => this.handleChange(e, v, "password")}
              />
              
              
            </div>
            <br />
            
            <div
            
              style={{

                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <RaisedButton
                onClick={this.login}
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
            <br />
            <br />
            <div

              style={{

                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Link to="/public">
                <a style={{ color:'#4885ed' }} >Don't have an account? Create one</a>
              </Link>
            </div>
          </div>
        </div>

        {/* <TextField
          hintText="Email"
          onChange={(e, v) => this.handleChange(e, v, "email")}
        />
        <TextField
          hintText="Password"
          onChange={(e, v) => this.handleChange(e, v, "password")}
        />
        <button onClick={this.login}>Log in</button> */}
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

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
        open : false,
        snackOpen: false,
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }


  handleClose = () => {
        this.setState({
            open: false
        });
  };

  handleOpen = () => {
        this.setState({
            open: true
        });
  };


  handleSnackOpen = () => {

        this.setState({
            snackOpen: true
        });
  };

  render() {

      const firstChild = props => {
          const childrenArray = React.Children.toArray(props.children);
          return childrenArray[0] || null;
      };

    const styles = {
      title: {
        cursor: 'pointer',
      },
      paddingTop: {
        paddingTop: '0px',
      },
      buttonColor : {
        color: '#fff',
      },
      smallIcon: {
        width: 36,
        height: 36,
      },
      mediumIcon: {
        width: 48,
        height: 48,
      },
      largeIcon: {
        width: 60,
        height: 60,
      },
      small: {
        width: 72,
        height: 72,
        padding: 16,
      },
      medium: {
        width: 96,
        height: 96,
        padding: 24,
      },
      large: {
        width: 120,
        height: 120,
        padding: 30,
      },
    };

    const currentPath = window.location.pathname;
    const actions = [];

    return <div style={{ postion: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/*<marquee*/}
          {/*width="100%"*/}
          {/*height="20%"*/}
          {/*direction="left"*/}
          {/*>*/}
          {/*For registered teams, NOT through school/Institution: The BIB number on your ticket and email will serve as login credential for the quiz portal. Keep them safe. For teams registered through schools: Your school code and team number will be used to login to the quiz portal.*/}

          {/*</marquee>*/}
        </div>

        {/* <IconButton target="_blank" href="https://www.facebook.com/udghosh.iitk/" style={{ position: "absolute", top: 200, left: 20 }}>
          <img width="24" src={Fb} />
        </IconButton>
        <IconButton target="_blank" href="https://twitter.com/udghoshiitk" style={{ position: "absolute", top: 260, left: 20 }}>
          <img width="24" src={twitterIcon} />
        </IconButton>
        <IconButton target="_blank" href="https://www.youtube.com/user/udghosh11" style={{ position: "absolute", top: 320, left: 20 }}>
          <img width="24" src={ytIcon} />
        </IconButton>
        <IconButton target="_blank" href="https://plus.google.com/101958681892074759002?hl=en" style={{ position: "absolute", top: 380, left: 20 }}>
          <img width="24" src={gpIcon} />
        </IconButton> */}

        {/*<Route exact path="/" render={() => (
              <Redirect to="/home"/>
          )}/>*/}

        <Route exact path="/" component={()=><Redirect to="/protected" />} />
        {/* <Route path="/17/gallery" component={ImageGallery} /> */}
        {/* <Route path="/ca" component={CA} /> */}
        {/* <Route path="/18/events" component={Events} /> */}
        {/* <Route path="/17/sponsors" component={()=><Sponsors handleOpen={this.handleOpen} handleClose={this.handleClose} />} /> */}
        {/* <Route path="/team" component={() => <Team handleOpen={this.handleOpen} handleClose={this.handleClose} />} /> */}
        {/*<Route path="/18/sports-quiz/register" component={Registration}  />*/}
        {/*<Route path="/18/sports-quiz/i/register" component={IRegistration}  />*/}
        {/*<Route path="/registered-team/pay" component={Townscript} />*/}
        <Route path="/auth" component={Auth} />
        <Route path="/reg" component={Reg} />
      <div >
        <AuthButton />
        {/* <ul>
          <li><Link to="/public">Public Page</Link></li>
          <li><Link to="/protected">Protected Page</Link></li>
        </ul> */}
        <Route path="/public" component={UserForm} />
        <Route path="/login" component={Login} />
        <PrivateRoute path='/protected' component={Reg} />
      </div>

        {/* <Switch>
            <Route exact path="/" children={({ match, ...rest }) => <TransitionGroup
                component={firstChild}
            >
                {match && (
                    <HomePage
                        handleOpen={this.handleOpen}
                        handleClose={this.handleClose}
                    />
                )}
            </TransitionGroup>} />
            <Route path="/ca" children={({ match, ...rest }) => <TransitionGroup
                component={firstChild}
            >
                {match && <CA />}
            </TransitionGroup>} />
            </Switch> */}

        <Snackbar open={this.state.snackOpen} message="Will be live soon. " autoHideDuration={2500} />

        <div>
          <Dialog title="Frequently Asked Questions" actions={actions} modal={false} open={this.state.open} autoScrollBodyContent={true} onRequestClose={this.handleClose.bind(this)}>
            <p>
              {/*<div>
                          <h4><strong>Q. What is the procedure to be followed after reaching IITK?</strong></h4>
                          <p style={{ paddingLeft: 17 }}>You need to report to the Hospitality Desk, Students Activity Centre (SAC) along with your college identity card. <br/>You will have to produce the reciept of your online payment and a recent passport size photograph. <br/>Booklet will act as your identity card in campus. <br/>In case of a big contingent, contingent leader needs to present the ID cards of all the people in his contingent at the hospitality desk along with a list of all the people. Accommodation would be strictly on shared basis. </p>


                          <h4><strong>Q. Can two participants be from different colleges in a team event?</strong></h4>
                          <p style={{ paddingLeft: 17 }}>No, Udghosh does not allow cross participation from colleges in a team event.</p>


                          <h4><strong>Q. Can I get accommodation on 3<sup>th</sup> october or before although the festival starts from 5<sup>th</sup> october?</strong></h4>
                          <p style={{ paddingLeft: 17 }}>No, accommodation will be provided from 11th evening. All the participants coming before can stay in hotels outside IIT Kanpur.</p>
                      </div>*/}

              <div>
                <h4>
                  <strong>
                    Q. I have registered through my school. What's next?
                  </strong>
                </h4>
                <p style={{ paddingLeft: 17 }}>
                  Your school must collect the fees from you and make
                  payment. There is a unique team number for each team and
                  BIB number (Every school that is registered has a unique
                  BIB number) which will serve as login credential for the
                  quiz.
                </p>

                <h4>
                  <strong>
                    Q. I have registered through Udghosh's website and
                    haven't paid the fees. Where do I make payment?
                  </strong>
                </h4>
                <p style={{ paddingLeft: 17 }}>

                  Go to Home(<a href="www.udghosh.org">
                    www.udghosh.org
                  </a>), Click the blue-black PAY button to make payment.
                </p>

                <h4>
                  <strong>
                    Q. I have registered through Udghosh's website and paid
                    the fees. What do I do next?
                  </strong>
                </h4>
                <p style={{ paddingLeft: 17 }}>
                  
                  Great. For now just sit back and prepare for the quiz.
                  Also, keep the ticket safe. The BIB number on the ticket
                  will be used as a login credential for the quiz.
                </p>
              </div>
            </p>
          </Dialog>
        </div>
      </div>;
  }
}

export default Home;



// WEBPACK FOOTER //
// ./src/Components/Home/home.js