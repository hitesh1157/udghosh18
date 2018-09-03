import React from 'react';
import AppIndex from "../temp/Quiz/index";
import Home from "../Home/home";
import CircularProgress from "material-ui/CircularProgress";
import favicon from '../../Resources/img/favicon.png';
import UdghoshInverted from "../../Resources/img/ud-new.d72497bf_inverted.png";
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

import './super.css'

export default class Super extends React.Component {

  state = {
    loading: false
  }

  componentDidMount() {
      // setTimeout(() => {
      //   this.setState({
      //     loading: false
      //   })
      // }, 1700);
  }


  loading = () => {
    return <div style={{ position: "absolute", width: "100%", height: "100%", background: "#f4f4f4", top: 0, left: 0, zIndex: 1000 }}>
        <div className="intro" style={{ display: "flex", alignItems: "center", justifyContent: "center", position:'absolute', left: '36%',  top: '40%' }}>
          <img src={favicon} height={100} />

          <img src={UdghoshInverted} height={100} style={{ marginLeft: 30 }} />
        </div>
      </div>;
  }

    render(){

      let loca = window.location.pathname;

      let component = null;

      if(loca === "/nossq"){
        component = <AppIndex/>;
      } else {
        component = <Home/>;
      }

        return(
            <div>
              {this.state.loading && this.loading()}
              {component}
            </div>
        );
    }
}


// WEBPACK FOOTER //
// ./src/Components/Super/super.js