import React, { Component } from "react";
//import Section from "react-scrollable-anchor";
import { SectionsContainer, Section } from 'react-fullpage';
import FlatButton from "material-ui/FlatButton";

import _AppBar from "../Appbar/appbar";
import Launch from "material-ui/svg-icons/action/launch";
import gp from '../../Resources/img/d87d5444939633.5822d601814d5.jpg';
import resp from '../../Resources/img/resp.png';
import pr from '../../Resources/img/publicrelations-icon-grey.png';
import inc from '../../Resources/img/incentive.png';
import cert from '../../Resources/img/web-certificate.png';
import leadership from '../../Resources/img/icon-leadership-440x440.png'
import network from '../../Resources/img/community.png';
import vcard from '../../Resources/img/066-512.png';
import money from '../../Resources/img/money.png';
import tshirt from '../../Resources/img/tshirt.png';

import UdghoshInverted from '../../Resources/img/ud-new.d72497bf_inverted.png';

import "./ca.css";

export default class CA extends React.Component {
    render() {

      let options = {
        activeClass: 'active', // the class that is appended to the sections links
        anchors: ['about', 'respo', 'incentives', 'tnc', 'register' ], // the anchors for each sections
        arrowNavigation: true, // use arrow keys
        className: 'SectionContainer', // the class name for the section container
        delay: 500, // the scroll animation speed
        navigation: true, // use dots navigatio
        scrollBar: false, // use the browser default scrollbar
        sectionClassName: 'Section', // the section class name
        sectionPaddingTop: '0', // the section top padding
        sectionPaddingBottom: '0', // the section bottom padding
        verticalAlign: false // align the content of each section vertical
      };

        return <div>
            <_AppBar color="rgba(255,255,255,1)" handleOpen={this.props.handleOpen} handleClose={this.props.handleClose} />
            <SectionsContainer className="container" {...options}>
              

              <Section>
              <div className="box" style={{ marginLeft: "0vh", marginRight: "15vh", paddingTop: "15vh", marginRight: "15vh" }}>
                <div className="div1">
                  <img src={gp} />
                </div>
                <div className="div2">
                  <div style={{ fontSize: 48, maxHeight: "150px", overflowY: "none", textAlign: "center", fontStyle: "bold", fontWeight: 800, color: "#4885ed", fontFamily: 'Keep Calm' }}>
                    <span style={{ fontSize: 13, color: '#4885ed', fontFamily:'Keep Calm' }}>BE A </span> <br />
                    CAMPUS AMBASSADOR
                    </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 30 }}>
                    <span className="luna" style={{ fontSize: 22, color: '#FF4500'}}>
                      Stand out from the crowd
                      </span>
                  </div>
                  <h3
                    style={{
                      marginTop: 32,
                      lineHeight: 1.5,
                      fontWeight: 300,
                      color: "#272727",
                      
                    }}
                  >
                    Campus Ambassador Program recognizes enthusiastic
                    students, hardworking and motivated students by
                    giving them opportunity to develop knowledge and
                    leadership skills by representing UDGHOSH' on
                    their College campus.
                    </h3>
                </div>
                <div className="clear" />
              </div>
              </Section>

              <Section>
              <div className="box" style={{ marginLeft: "0vh", paddingTop: "15vh", marginRight: "10vh", height: '100vh' }}>
                  <div className="div1">
                    <img style={{ paddingLeft: "10vh", marginRight: "15vh" }} src={resp} width={300} />
                  </div>
                  <div className="div2">
                  <div style={{ fontSize: 48, maxHeight: "150px", overflowY: "none", textAlign: "left", fontStyle: "bold", fontWeight: 800, color: "#4885ed", fontFamily: 'Keep Calm'}}>
                      Responsibilities
                    </div>

                    <h3 style={{ marginTop: 48, lineHeight: 1.5, color: "#fff" }}>
                      <div className="box-small">
                        <div className="div1-small">
                          <img src={pr} width={100} style={{ marginRight: "5vh" }} />
                        </div>
                        <div className="div2-small">
                          <p style = {{ color: '#FF4500' }} >PUBLICIZE</p>
                          <h3 style={{ marginTop: 0, lineHeight: 1.5, fontWeight: 300, color: '#272727' }}>
                            The CA would be expected to publicize UDGHOSH'18 on all platforms, and means available.
                          </h3>
                        </div>
                        <div className="clear-small" />
                      </div>
                      <div className="box-small">
                        <div className="div1-small">
                          <img src={pr} width={100} style={{ marginRight: "5vh" }} />
                        </div>
                        <div className="div2-small">
                        <p style={{ color: '#FF4500' }}>COORDINATE</p>
                          <h3 style={{ marginTop: 0, lineHeight: 1.5, fontWeight: 300, color: '#272727' }}>
                            The applicant would be working in hand with us to coordinate and lead their contingents.
                          </h3>
                        </div>
                        <div className="clear-small" />
                      </div>
                      <div className="box-small">
                        <div className="div1-small">
                          <img src={pr} width={100} style={{ marginRight: "5vh" }} />
                        </div>
                        <div className="div2-small">
                        <p style={{ color: '#FF4500' }}>BRAINSTORM</p>
                          <h3 style={{ marginTop: 0, lineHeight: 1.5, fontWeight: 300, color:'#272727' }}>
                            With the team to come up with fresh ideas together to make this edition of UDGHOSH splendorous.
                          </h3>
                        </div>
                        <div className="clear-small" />
                      </div>
                      {/* <p style={{ marginTop: 12 }}></p>
                    <h3 style={{ marginTop: 0, lineHeight: 1.5, fontWeight: 300 }}>
                      
                    </h3>

                    <p style={{ marginTop: 12 }}></p>
                    <h3 style={{ marginTop: 0, lineHeight: 1.5, fontWeight: 300 }}>
                      
                    </h3> */}
                    </h3>
                  </div>
                  <div className="clear" />
                </div>
              </Section>

              <Section >
                <div className="box" style={{ marginLeft: "0vh", paddingTop: "15vh", marginRight: "10vh", height: '100vh' }}>
                  <div className="div1">
                    <img style={{ paddingLeft: "10vh", marginRight: "15vh" }} src={inc} width={300} />
                  </div>
                  <div className="div2">
                  <div style={{ fontSize: 48, maxHeight: "150px", overflowY: "none", textAlign: "left", fontStyle: "bold", fontWeight: 800, color: "#4885ed", fontFamily: 'Keep Calm'}}>
                      Incentives
                    </div>

                    <h3 style={{ marginTop: 48, lineHeight: 1.5, color: "#fff" }}>
                      <div className="box-small" style={{ height: 50 }}>
                        <div className="div1-small">
                          <img src={cert} style={{ marginRight: "5vh" }} />
                        </div>
                        <div className="div2-small">
                          <h3 style={{ marginTop: 0, lineHeight: 1.5, fontWeight: 300, color: '#272727' }}>
                            Get certificate of Campus Ambassador at Udghosh'18
                          </h3>
                        </div>
                        <div className="clear-small" />
                      </div>
                      <div className="box-small" style={{ height: 50 }}>
                        <div className="div1-small">
                          <img src={leadership} style={{ marginRight: "5vh" }} />
                        </div>
                        <div className="div2-small">
                        <h3 style={{ marginTop: 0, lineHeight: 1.5, fontWeight: 300, color: '#272727', paddingTop: 10 }}>
                            Obtain leadership roles on your campus.
                          </h3>
                        </div>
                        <div className="clear-small" />
                      </div>
                    <div className="box-small" style={{ height: 50 }}>
                        <div className="div1-small">
                          <img src={network} style={{ marginRight: "5vh" }} />
                        </div>
                        <div className="div2-small">
                        <h3 style={{ marginTop: 0, lineHeight: 1.5, fontWeight: 300, color: '#272727', paddingTop: 12 }}>
                            Opportunity to grow your network.
                          </h3>
                        </div>
                        <div className="clear-small" />
                      </div>

                    <div className="box-small" style={{ height: 50 }}>
                        <div className="div1-small">
                          <img src={money} style={{ marginRight: "5vh" }} />
                        </div>
                        <div className="div2-small">
                        <h3 style={{ marginTop: 0, lineHeight: 1.5, fontWeight: 300, color: '#272727', paddingTop: 12 }}>
                            Earn while you learn
                          </h3>
                        </div>
                        <div className="clear-small" />
                      </div>

                    <div className="box-small" style={{ height: 50 }}>
                        <div className="div1-small">
                          <img src={vcard} style={{ marginRight: "5vh" }} />
                        </div>
                        <div className="div2-small">
                        <h3 style={{ marginTop: 0, lineHeight: 1.5, fontWeight: 300, color: '#272727', paddingTop: 20 }}>
                            Get personalized Udghosh's ICard and VCards.
                          </h3>
                        </div>
                        <div className="clear-small" />
                      </div>

                    <div className="box-small" style={{ height: 50 }}>
                        <div className="div1-small">
                          <img src={tshirt} style={{ marginRight: "5vh", paddingTop: 20 }} />
                        </div>
                        <div className="div2-small">
                        <h3 style={{ marginTop: 0, lineHeight: 1.5, fontWeight: 300, color: '#272727', paddingTop: 25 }}>
                            Get selected Udghosh's merchandise for free.
                          </h3>
                        </div>
                        <div className="clear-small" />
                      </div>
                    </h3>
                  </div>
                  <div className="clear" />
                </div>
              </Section>
              
            <Section>
              <div style={{ marginLeft: "25vh", marginRight: "15vh", paddingTop: "15vh", marginRight: "15vh" }}>
                <span
                  style={{
                    fontSize: 48,
                    fontWeight: 800,
                    color: "#4885ed", fontFamily: 'Keep Calm'
                  }}
                >
                  Terms &amp; Conditions
                  </span>

                <h3 style={{ marginTop: 22, lineHeight: 1.5, fontWeight: 300, color: "#272727" }}>
                  A campus ambassador must abide by the following Terms &amp; Conditions:
                    <ul style={{ marginLeft: "10vh", color: '#272727' }}>
                    <li>
                      The Campus Ambassador program is only for
                      College students.
                      </li>
                    <li>
                      Certificate of Commemoration will only be given
                      to Campus Ambassadors, if he/she fulfills the
                      necessary criteria, deemed fit by the authority.
                      </li>
                    <li>
                      Udghosh Core Team, IIT Kanpur will be providing
                      all the publicity material to the respective
                      college, but will not be responsible for any
                      extra cost incurred by the Campus Ambassador.
                      </li>
                    <li>
                      A Campus Ambassador is entitled to 100% travel
                      reimbursement(sleeper class), only if he/she
                      manages to conduct City Elimination or bring in
                      a team of size 15 or more.
                      </li>
                    <li>
                      Tri-weekly winners will be announced every 3
                      weeks, whereas the grand prize of top 10 Campus
                      Ambassadors will be given during the festival
                      itself.
                      </li>
                    <li>
                      Points may be reduced, depending on your
                      acceptance or rejection of idea, POC’s and
                      shares.
                      </li>
                    <li>
                      Changes subjected to core team UDGHOSH, however
                      it will be notified through the portal, do check
                      the portal from time to time.
                      </li>
                    <li>
                      A Maximum of 2 Campus Ambassadors from each
                      college.
                      </li>
                  </ul>
                </h3>
              </div>
            </Section>
            <Section>
              <div style={{ marginLeft: "25vh", marginRight: "15vh", paddingTop: "15vh", marginRight: "15vh" }}>
                <div style={{ fontSize: 48, fontWeight: 700 }}>
                  <span style={{ color: "#4885ed", fontFamily: 'Keep Calm' }}>Register</span> <FlatButton target="_blank" href="https://udghosh18.typeform.com/to/Pnck9z" className="nav_button" style={{ height: 50, color: "#272727", width: 200 }} labelStyle={{ fontSize: 18 }} label={<span>
                    Open Form
                  </span>} />
                </div>
                <h3 style={{ marginTop: 22, lineHeight: 1.5, fontWeight: 300 }}>
                  <br />
                  {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 0 }}>
                      <iframe style={{ overflow: "hidden", marginTop: "5vh" }} src="https://docs.google.com/forms/d/e/1FAIpQLSdsdbJEBBcIl2cQohokiNw3lN9uAf8qxGziCZEors-xDUulvg/viewform?embedded=true" width="1024" height="520" frameborder="0" marginheight="0" marginwidth="0">
                        Loading...
                      </iframe>
                    </div> */}
                </h3>
              </div>
            </Section>
            </SectionsContainer>
          </div>;
    }
}

// WEBPACK FOOTER //
// ./src/Components/Events/events.js
