import React from 'react';
import {grey900} from "material-ui/styles/colors";
import {AppBar, FlatButton, RaisedButton} from "material-ui";
import ActionAndroid from 'material-ui/svg-icons/action/question-answer';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

export default class _AppBar_f extends React.Component {

    render() {
        return (
            <div style={{position: "relative", bottom: 0, zIndex: 100}}>
                <AppBar
                    zDepth={0}
                    titleStyle={{color: grey900}}
                    style={{backgroundColor: this.props.color, position: 'fixed', top: 0}}
                    iconElementRight={
                        <div style={{marginTop: 4}}>

                            {/*<Link to="/registered-team/pay" >
                    <RaisedButton
                        style={{height: 40}}
                        label="Pay"
                        backgroundColor="#37474F"
                        labelColor="#fff"
                    />
                  </Link>*/}

                            <Link to="/ca" ><RaisedButton  label="CAMPUS AMBASSADOR" secondary={true} /></Link>


                            <FlatButton
                                className="nav_button"
                                onClick={this.props.handleOpen}
                                icon={<ActionAndroid className="nav_button" />}
                                style={{height: 40, color:"#fff"}}
                                label="FAQs" />

                        </div>

                    }

                    iconElementLeft={
                        <div style={{marginTop: 4}}>
                            <Link to="/">
                                <FlatButton className="nav_button" style={{height: 40, color: "#fff"}} label="Home" />
                            </Link>

                            {/*<Link to="/home">*/}
                            {/*<FlatButton className="nav_button" style={{height: 40, color: "#fff"}} label="About" />*/}
                            {/*</Link>*/}

                            <Link to="/18/events">
                            <FlatButton className="nav_button" style={{height: 40, color: "#fff"}} label="Events" />
                            </Link>
                            {/*<Link to="/17/gallery">*/}
                            {/*<FlatButton className="nav_button" style={{height: 40, color: "#fff"}} label="Gallery" />*/}
                            {/*</Link>*/}
                            <Link to="/team">
                                <FlatButton className="nav_button" style={{height: 40, color: "#fff"}} label="Team" />
                            </Link>
                            <Link to="/18/sponsors">
                                {/*<FlatButton className="nav_button" style={{height: 40, color: "#fff"}} label="Sponsors" />*/}
                            </Link>
                            {/*<FlatButton className="nav_button" style={{height: 40, color: "#fff"}} label="Informals" />*/}
                            {/*<FlatButton className="nav_button" style={{height: 40, color: "#fff"}} label="Hospitality" />*/}

                           {/* <Link to="/nossq">
                                <FlatButton className="nav_button" style={{height: 40, color: "#fff"}} label="START Quiz" />
                            </Link>*/}
                        </div>
                    }

                />
            </div>
        );
    }
}