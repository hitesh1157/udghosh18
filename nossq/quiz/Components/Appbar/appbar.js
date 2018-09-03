import React from 'react';
import {grey900} from "material-ui/styles/colors";
import {AppBar, FlatButton, RaisedButton} from "material-ui";
import ActionAndroid from 'material-ui/svg-icons/action/question-answer';
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom';
import NavigationMenu from "material-ui/svg-icons/navigation/menu";
import IconButton from "material-ui/IconButton";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import favicon from '../../Resources/img/favicon.png';

import firebase from 'firebase';
import './appbar.css';

export default class _AppBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = { open: false };

    this.handleClose = this.handleClose.bind(this);
  
  }

  componentDidMount() {
    var qs, js, q, s, d = document, gi = d.getElementById, ce = d.createElement, gt = d.getElementsByTagName, id = "typef_orm_share", b = "https://embed.typeform.com/"; if (!gi.call(d, id)) { js = ce.call(d, "script"); js.id = id; js.src = b + "embed.js"; q = gt.call(d, "script")[0]; q.parentNode.insertBefore(js, q) }
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = (arg) =>  {
    console.log(arg);
    if(arg === "ca" || arg === "team" || arg === "") {
      window.location = window.location.protocol + "//" + window.location.host + "/" + arg;
    } else if (arg === "aftermovie") {
      window.location.href = "https://www.youtube.com/watch?v=4vi2ZTXYSAo";
    }
    this.setState({ open: false });
  };

  signOut  = () => {
    firebase.auth().signOut().then(() => {
      console.log(window.localStorage.getItem('isAuthenticated'));
      window.localStorage.setItem('isAuthenticated', false);
      //history.push('/');

      window.location.reload();
    }).catch((error) => {
      alert("Unexpected error occured");
      console.log(error);
    })
   
    
  };

    render() {
        return <div style={{ position: "relative", top: 0, zIndex: 100 }}>
            <AppBar zDepth={0} style={{ backgroundColor: this.props.color, position: "fixed", top: 0 }} iconElementRight={<div style={{ marginTop: 5 }}>
            {/* <FlatButton className="nav_button" style={{ height: 40, color: "#272727" }} labelStyle={{ fontWeight: 700, textRendering: "auto" }} label="BROCHURE" /> */}
                  {/* <FlatButton className="nav_button" style={{ height: 40, color: "#272727" }} labelStyle={{ fontWeight: 700 }} label="CONTACT US" /> */}

            {window.localStorage.getItem('isAuthenticated')!=='true' ?
              <Link to="/protected">
                <FlatButton className="nav_button" style={{ height: 40, color: "#272727" }} labelStyle={{ fontWeight: 700 }} label="SIGNUP/LOGIN" />
              </Link> :
              
                <FlatButton onClick={this.signOut} className="nav_button" style={{ height: 40, color: "#272727" }} labelStyle={{ fontWeight: 700 }} label="SIGNOUT" />
              
          }
                  
                </div>} title={<span>
                  {" "}
                  <img src={favicon} width={24} />{" "}
                </span>} titleStyle={{ paddingTop: 7 }} iconElementLeft={<div style={{ marginTop: -7 }}>
                  <span style={{ marginTop: 10 }}>
                    <IconButton iconStyle={{ paddingTop: 7 }} style={{ height: 40, color: "#272727" , visibility: 'hidden'}} onClick={this.handleToggle}>
                      <NavigationMenu />
                    </IconButton>
                  </span>
                  <FlatButton onClick={(e) => { window.location.href= "https://www.udghosh.org" } } className="" style={{ height: 40, color: "#272727" }} labelStyle={{ fontWeight: 700 }} label="HOME" />

                  {/* <FlatButton onClick={(e) => { window.location.href = "http://localhost:3000" + "/18/events" }} className="nav_button" style={{ height: 40, color: "#272727" }} labelStyle={{ fontWeight: 700 }} label="EVENTS" /> */}

                  {/* <FlatButton onClick={(e) => { window.location.href = "http://localhost:3000" + "/17/gallery" }} className="nav_button" style={{ height: 40, color: "#272727" }} labelStyle={{ fontWeight: 700 }} label="GALLERY" /> */}

                  
                    {/* <FlatButton onClick={(e) => { window.location.href = "http://localhost:3000" + "/team" }} className="nav_button" style={{ height: 40, color: "#272727" }} labelStyle={{ fontWeight: 700 }} label="TEAM" /> */}
                  
                  <Link to="/17/sponsors">
                    {/* <FlatButton className="nav_button" style={{ height: 40, color: "#272727" }} labelStyle={{ fontWeight: 700 }} label="SPONSORS" /> */}
                  </Link>
                </div>} />

            {/* <Drawer docked={false} width={270} open={this.state.open} onRequestChange={open => this.setState(
                  { open }
                )}>
            <MenuItem onClick={() => { this.handleClose("") }}>Home</MenuItem>
            <MenuItem onClick={() => { this.handleClose("aftermovie") }}>Watch the aftermovie</MenuItem>
            <MenuItem onClick={() => { this.handleClose("associate") }}>
              <a className="typeform-share link" href="https://udghosh18.typeform.com/to/Pv17QW" style={{ color: "#000" }} data-mode="drawer_right" data-submit-close-delay="5" target="_blank"> Associate with us </a>
              </MenuItem>
            <MenuItem onClick={() => { this.handleClose("team") }}>
              The Team
              </MenuItem>
            <MenuItem onClick={() => { this.handleClose("ca") }}>
              Campus Ambasssador
              
              </MenuItem>
            </Drawer> */}

          
          </div>;
    }
}