import React, { Component } from 'react';
import update from 'react-addons-update';
import quizQuestions from './api/quizQuestions';
import sQuizQuestions from './api/sQuizQuestions';
import Quiz from './components/Quiz';
import Result from './components/Result';
import {Tabs, Tab} from 'material-ui/Tabs';
import fireDB from '../../../services/fireDB';
import './App.css';
import {RaisedButton, TextField, Toggle} from "material-ui";


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {
        true: 0,
        false: 0,
        false1: 0,
        false2: 0,
      },
      result: '',
      renderLogin : true,
      inst: false,
      isDisabled: true,
      toggleText: "Registered through www.udghosh.org",
      isToggled: false,
      _isJunior: "Junior",
      isJunior: false,
      __bib_error__: "",
      __sc_error__: "",
      __tn_error__: "",
      timeLeft: 30,
      perQTimer: true,
      slot: 0,
      sessionId: 0,
      sessions : [Date.parse('05/05/2018 11:00:00'), Date.parse('05/11/2018 11:00:00')],
      start: [Date.parse('01/01/2011 11:00:00'), Date.parse('01/01/2011 14:00:00'), Date.parse('01/01/2011 20:00:00')],
      end: [Date.parse('01/01/2011 12:00:00'), Date.parse('01/01/2011 15:00:00'),Date.parse('01/01/2011 21:00:00')],
      tick: <p>Clock {new Date().toLocaleTimeString()}</p>,
      monthNames: [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ],
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentWillMount() {

    alert("Start in a new window or a new private window.");

    this.setQ(quizQuestions);
    let currDate = Date.parse(new Date().toDateString() + " 11:00:00");
    let sessions = this.state.sessions;

    for(let i=0; currDate > sessions[i]; i++){ this.setState({ sessionId: i+1 }); }




    let dt = Date.parse("01/01/2011 " + new Date().toLocaleTimeString());
    if(dt > this.state.end[0] && dt < this.state.end[0]){

      this.setState ({ slot: 0 });

    } else if( dt > this.state.start[1] && dt < this.state.end[1]) {
      this.setState ({ slot: 1 });

    } else if(dt > this.state.start[2] && dt < this.state.end[2]) {
      this.setState ({ slot: 2 });
    }

    if(dt > this.state.end[1] && dt < this.state.start[2]){
      this.setState ({ slot: 2 });
    } else if(dt > this.state.end[2]){
      this.setState ({ slot: 0 });
    } else if(dt < this.state.start[0]) {
      this.setState ({ slot: 0 });
    } else if(dt > this.state.end[0] && dt < this.state.start[1]){
      this.setState ({ slot: 1 });
    }


    console.log(this.state.slot);
  }


  setQ(quizQuestions) {
    const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

  componentDidMount() {

      setInterval(() => {
        this.setState({ tick: <p>Clock {new Date().toLocaleTimeString()}</p> });
        let timeLeft = this.state.timeLeft -1;
        this.setState({ timeLeft: timeLeft });
      }, 1000);

  }

  timer () {
    this.setState({ timeLeft: 30 }, () => {
      this.handleAnswerSelected( { "currentTarget": { "value" : "o" } } );
    });
  }

  componentWillUnmount() {
        // use intervalId from the state to clear the interval
        //clearInterval(this.state.intervalId);


  }

  shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);

    if (this.state.questionId < quizQuestions.length) {
        setTimeout(() => this.setNextQuestion(), 300);
    } else {

        // Page visiblity API
        window.removeEventListener('visibilitychange', this.handleWindowChange, false);
        clearInterval(this.state.intervalId);
        setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  setUserAnswer(answer) {
    const updatedAnswersCount = update(this.state.answersCount, {
      [answer]: {$apply: (currentValue) => currentValue + 1}
    });

    this.setState({
        answersCount: updatedAnswersCount,
        answer: answer
    });
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    if(counter < quizQuestions.length){
      this.setState({
        counter: counter,
        questionId: questionId,
        question: quizQuestions[counter].question,
        answerOptions: quizQuestions[counter].answers,
        answer: ''
      }, () => {

        clearInterval(this.state.intervalId);
        let intervalId = setInterval(this.timer.bind(this), 30000);
        this.setState({intervalId: intervalId});
      });
    }
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);


    let score = answersCountValues[0]*2 - answersCountValues[1] - answersCountValues[2] - answersCountValues[3];

    return score.toString();
    //return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);

  }

  setResults(result) {
    /*if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }*/
    this.setState({ result: result });
  }

  handleTimer() {

  }

  renderQuiz() {

    /*let intervalId = setInterval(this.timer.bind(this), 30000);
    this.setState({intervalId: intervalId});

    if(this.state.perQTimer) {
      setInterval(() => {
        let timeLeft = this.state.timeLeft -1;
        this.setState({ timeLeft: timeLeft });
      }, 1000);

      this.setState({ perQTimer: false });
    }*/

    if(Date.parse("01/01/2011" + " " + new Date().toLocaleTimeString()) >= this.state.end[this.state.slot]){

      setTimeout(() => this.setResults(this.getResults()), 300);
    } else {

    }

    return (
        <div>

          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            {/*<p>{this.state.timeLeft}s</p>*/}
          </div>

          <Quiz
              answer={this.state.answer}
              answerOptions={this.state.answerOptions}
              questionId={this.state.questionId}
              question={this.state.question}
              questionTotal={quizQuestions.length}
              onAnswerSelected={this.handleAnswerSelected}
          />
        </div>
    );
  }

  uploadScore() {

    let result = this.state.result;
    const teamRef = this.state.teamRef;
    teamRef.update({
      score: result,
      status: "1"
    }, () => {
      console.log("status_complete");
      //alert("Your entry has been submitted successfully. Window will now refresh.");

      window.location.reload(true);
    });
  }

  renderResult() {

    this.uploadScore();

    return (
      <Result quizResult={this.state.result} />
    );
  }

  handleTermsCheck() {
    this.setState({ isDisabled: false });
  }

  handleGuys(type) {

    let dbRef = null;

    let dt = Date.parse("01/01/2011" + " " + new Date().toLocaleTimeString());
    let slot = this.state.slot;

    let sessionId = this.state.sessionId;
    let dateDt = this.state.sessions[sessionId];

    let currDt = Date.parse(new Date().toDateString() + " 11:00:00");

    //console.log(currDt, dateDt, sessionId);
    //console.log(dt >= this.state.start[slot], dt <= this.state.end[slot], currDt >= dateDt);

    let sc = this.state.__sc__;

    if(((dt >= this.state.start[slot] && dt <= this.state.end[slot]) && currDt >= dateDt) || sc === "SSV19"){
      if(type === "school"){
        //let sc = this.state.__sc__;
        let bId = this.state.__sc__;
        let teamNo = this.state.__sc__;

        this.setState({ __tn_error__: "" });
        this.setState({ __sc_error__: "" });

        if(bId !== undefined && bId !== ""){

          switch (sc){
            case "SSV15":
              if(this.state.isJunior){
                dbRef = fireDB.ref('schools').child("SRI SANKARA VIDYALAYAA").child("senior");
                this.setQ(sQuizQuestions);
              } else {
                dbRef = fireDB.ref('schools').child("SRI SANKARA VIDYALAYAA").child("junior");
                this.setQ(quizQuestions);
              }
              this.handleLoginNext(dbRef , "teamNo",teamNo);
              break;

            case "DPSD17":

              if(this.state.isJunior){
                dbRef = fireDB.ref('schools').child("DELHI PUBLIC SCHOOL, DULIAJAN").child("senior");
                this.setQ(sQuizQuestions);
              } else {
                dbRef = fireDB.ref('schools').child("DELHI PUBLIC SCHOOL, DULIAJAN").child("junior");
                this.setQ(quizQuestions);
              }
              this.handleLoginNext(dbRef, "teamNo",teamNo);
              break;

            case "CPS18":
              if(this.state.isJunior){
                dbRef = fireDB.ref('schools').child("Center point").child("senior");
                this.setQ(sQuizQuestions);
              } else {
                dbRef = fireDB.ref('schools').child("Center point").child("junior");
                this.setQ(quizQuestions);
              }
              this.handleLoginNext(dbRef, "teamNo",teamNo);
              break;

            case "PSSPS14":
              if(this.state.isJunior){
                dbRef = fireDB.ref('schools').child("Prabhat Senior Secondary Public School").child("senior");
                this.setQ(sQuizQuestions);
              } else {
                dbRef = fireDB.ref('schools').child("Prabhat Senior Secondary Public School").child("junior");
                this.setQ(quizQuestions);
              }
              this.handleLoginNext(dbRef, "teamNo",teamNo);
              break;

            case "APS16":
              if(this.state.isJunior){
                dbRef = fireDB.ref('schools').child("alwar").child("senior");
                this.setQ(sQuizQuestions);
              } else {
                dbRef = fireDB.ref('schools').child("alwar").child("junior");
                this.setQ(quizQuestions);
              }
              this.handleLoginNext(dbRef, "teamNo",teamNo);
              break;

            case "SSV19":
              if(this.state.isJunior){
                dbRef = fireDB.ref('schools').child("Sunbeam School Varuna").child("senior");
                this.setQ(sQuizQuestions);
              } else {
                dbRef = fireDB.ref('schools').child("Sunbeam School Varuna").child("junior");
                this.setQ(quizQuestions);
              }
              this.handleLoginNext(dbRef, "teamNo",teamNo);
              break;

            case "APS13":
              if(this.state.isJunior){
                dbRef = fireDB.ref('schools').child("Army Public School, Pune").child("senior");
                this.setQ(sQuizQuestions);
              } else {
                dbRef = fireDB.ref('schools').child("Army Public School, Pune").child("junior");
                this.setQ(quizQuestions);
              }
              this.handleLoginNext(dbRef, "teamNo",teamNo);
              break;

            case "PPS20":
              if(this.state.isJunior){
                dbRef = fireDB.ref('schools').child("Pawar").child("senior");
                this.setQ(sQuizQuestions);
              } else {
                dbRef = fireDB.ref('schools').child("Pawar").child("junior");
                this.setQ(quizQuestions);
              }
              this.handleLoginNext(dbRef, "teamNo",teamNo);
              break;

            default:
                console.log("DEFAULT CASE");
                if(this.state.isJunior){
                    dbRef = fireDB.ref('schools');
                    this.setQ(quizQuestions);
                } else {
                    dbRef = fireDB.ref('schools');
                    this.setQ(sQuizQuestions);
                }
                this.handleLoginNext(dbRef, "booking_id",bId);
                console.log(bId);
                break;


          }
        } else {



          if(teamNo === undefined){
            this.setState({ __tn_error__: "Required" });
          }

        }

      } else {

        let bib = this.state.__bib__;

        console.log(bib);

        this.setState({ __bib_error__: "" });
        if(bib !== undefined && bib !== ""){
          let iRef = fireDB.ref('individuals');

          this.handleLoginNext(iRef, "bib", bib);
        } else {
          this.setState({ __bib_error__: "Required" });
        }


      }


    } else {




      // console.log(dt, currDt); compare using these vars
      let sessionDtString = currDt===dateDt ? " today." : " on " + new Date(dateDt).toDateString() + ".";
      // console.log(sessionDtString);

      let start = slot===0? "11 AM" : (slot===1? "2 PM" : (slot===2? "8 PM" : ""));
      alert("Slot will open at " + start + sessionDtString);
    }

  }

  handleLoginNext(dbRef, key, value){

    dbRef.orderByChild(key).equalTo(value.toString()).once("value").then( (snapshot) => {

      if(!(snapshot.val() === null)){

        snapshot.forEach((data) => {

          if(data.key){

            console.log(data.val());
            let dataVal = data.val();

            if(dataVal.status === "1" || dataVal.didLoggedIn === 1){

              alert("Your entry has already been submitted.");

            } else {

              if(dataVal.type === "J"){
                this.setQ(quizQuestions);
              } else {
                this.setQ(quizQuestions);
              }

              this.setState({
                renderLogin: false,
                teamRef: data.ref
              });

              data.ref.update({ didLoggedIn: 1 });

              let s = null;
              if(key === "bib"){
                s = "BIB number: " + dataVal.bib + "\nParticipant 1: " + dataVal.participant_1 + "\nParticipant 2: " + dataVal.participant_2
                    + "\nContact: " + dataVal.contact_no + "\nEmail: " + dataVal.email;
              } else {
                s = "School Name: " + dataVal.school_name + "\nParticipant 1: " + dataVal.student_1 + "\nParticipant 2: " + dataVal.student_2;
              }
              alert(s);

            }



          } else {

          }
        });
      } else {
        alert("Individual/Team not found");
      }
    });
  }

  renderSchoolGuys() {

    const style = {
      margin: 12,
    };

    const styles = {
      toggle: {
        marginBottom: 16,
        width: 100,
        marginTop: 16
      }
    };

    return(
        <div>

            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <TextField
                  hintText="As given by the school"
                  floatingLabelText="Enter Booking Id"
                  errorText={this.state.__sc_error__}
                  onChange={(e,v) => {
                    this.setState({
                      __sc__: v,
                      __sc_error__: ""
                    })
                  }}
              />
            </div>
            {/*<div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <TextField
                  type="number"
                  hintText="Enter Team number"
                  floatingLabelText="Team number"
                  errorText={this.state.__tn_error__}
                  onChange={(e,v) => {
                    this.setState({
                      __tn__: v,
                      __tn_error__: ""
                    })
                  }}
              />
            </div>*/}

            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <Toggle
                  label={this.state._isJunior +  " Team"}
                  style={styles.toggle}
                  labelPosition="right"

                  onToggle={(event, state) => {

                    this.setState({
                      isJunior: state
                    });

                    if(state){
                      this.setState({
                        _isJunior: "Senior",
                      });
                    } else {
                      this.setState({
                        _isJunior: "Junior",
                      });
                    }

                  }}
              />
            </div>

            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <RaisedButton label="Next" primary={true} style={style}
                            onClick={() => {this.handleGuys("school")}}
              />
            </div>



        </div>

    );
  }

  renderWebGuys() {

    const style = {
      margin: 12,
    };

    return(
        <div>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <TextField
                hintText="Enter BIB number on your ticket"
                floatingLabelText="BIB number"
                errorText={this.state.__bib_error__}
                onChange={(e,v) => {
                  this.setState({
                    __bib__: v,
                    __bib_error__: ""
                  });
                }}
            />

          </div>

          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>

          </div>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <RaisedButton label="Next" primary={true} style={style}
                          onClick={() => {this.handleGuys("website")}}
            />
          </div>
        </div>

    );
  }

  renderOptions() {

    /*const styles = {
      toggle: {
        marginBottom: 16,
      }
    };*/

    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
    };

    return(

        <div>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            {/*<Toggle
                label=""
                style={styles.toggle}
                onToggle={(event, state) => {

                  this.setState({
                    isToggled: state
                  });

                  if(state){
                    this.setState({
                      toggleText: "Registered through school",
                    });
                  } else {
                    this.setState({
                      toggleText: "Registered through www.udghosh.org",
                    });
                  }

                }}
            />*/}

            <Tabs style={{width: 550}} >
              <Tab label="Individuals" >
                <div>
                  {this.renderWebGuys()}
                </div>
              </Tab>
              <Tab label="Schools" >
                <div>
                  {this.renderSchoolGuys()}
                </div>
              </Tab>

            </Tabs>

          </div>
        </div>
    );
  }

  renderPortalLogin() {

    let form = null;
    if(this.state.isToggled){
      form = this.renderSchoolGuys();
    } else {
      form = this.renderWebGuys();
    }

  return (

      <div>
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <h2>Login</h2>
        </div>
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          {this.renderOptions()}
        </div>
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        </div>
      </div>

  );

  }

  handleWindowChange() {
    if(document.hidden){
      alert('You are not allowed to change windows during the quiz.');

    } else {

    }
  }

  renderInstructions () {

    const style = {
      margin: 12,
    };

    return (
        <div style={{marginBottom:300}}>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <h2>Important instructions before you begin</h2>
          </div>



            <div style={{display: "flex", alignItems: "left", justifyContent: "left", marginLeft: "5vh", marginRight: "5vh"}}>
                <p dir="ltr" style={{ textAlign: "left" }}>1. Duration of quiz will be 30 minutes. Once you start, you have to complete it in 30 minutes otherwise it will be autosubmitted in 30 minutes.</p>
            </div>


            <div style={{display: "flex", alignItems: "left", justifyContent: "left", marginLeft: "5vh", marginRight: "5vh"}}>
                <p dir="ltr" style={{ textAlign: "left" }}>2. Quiz will contain 60 questions based on general sports knowledge. <strong>Marking scheme: +2 for correct answer and -1 for incorrect answer.</strong></p>
            </div>

            <div style={{display: "flex", alignItems: "left", justifyContent: "left", marginLeft: "5vh", marginRight: "5vh"}}>
                <p dir="ltr" style={{ textAlign: "left" }}>3. Each question will have a shut down window of 30 seconds i.e. once you see &nbsp;a question, it will appear for 30 seconds on your screen. You have to answer the question in the prescribed time and after 30 seconds <strong>"unattempted"</strong> response to the question will be auto-submitted.</p>
            </div>

            <div style={{display: "flex", alignItems: "left", justifyContent: "left", marginLeft: "5vh", marginRight: "5vh"}}>
                <p dir="ltr" style={{ textAlign: "left" }}>4. Once a question is submitted you cannot go back to the question i.e. you have got only 30 seconds per question.</p>
            </div>

            <div style={{display: "flex", alignItems: "left", justifyContent: "left", marginLeft: "5vh", marginRight: "5vh"}}>
                <p dir="ltr" style={{ textAlign: "left" }}>5. You are not allowed to open a new tab during the quiz. This action will be considered as unethical.</p>
            </div>

            <div style={{display: "flex", alignItems: "left", justifyContent: "left", marginLeft: "5vh", marginRight: "5vh"}}>
                <p dir="ltr" style={{ textAlign: "left" }}>6. In case of any discrepancies final decision rests in the hands of organising team.</p>
            </div>

            <div style={{display: "flex", alignItems: "left", justifyContent: "left", marginLeft: "5vh", marginRight: "5vh"}}>
                <p dir="ltr" style={{ textAlign: "left" }}>7. Check your email for result announcements.</p>
            </div>

          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <input
                type="radio"
                name="radioGroup"
                className="radioCustomButton_2"

                onClick={this.handleTermsCheck.bind(this)}
                checked={! this.state.isDisabled}
                onChange={() =>{
                  this.setState({ isDisabled: false });
                }}
            />
            <label className="radioCustomLabel_2" >
              I have read and understood the above instructions.
            </label>
          </div>

          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>

            <RaisedButton primary={true} disabled={this.state.isDisabled} label="START" style={style} onClick={() => {
              this.setState({ inst: true });

              // Page visiblity API
              window.addEventListener('visibilitychange', this.handleWindowChange, false);

            }} />

          </div>

        </div>

    );
  }

  render() {

    const dt = Date.parse("01/01/2011 " + new Date().toLocaleTimeString());

    let sessionId = this.state.sessionId;
    let dateDt = this.state.sessions[sessionId];

    let currDt = Date.parse(new Date().toDateString() + " 11:00:00");

    const slot  = this.state.slot;
    //let sessionDateStr = this.state.sessions[this.state.sessionId];
    //let sessionDate = this.state.dayNames[new Date(sessionDateStr).getDay()] + " " + new Date().getDate(sessionDateStr) + " " + this.state.monthNames[new Date(sessionDateStr).getMonth() + 1] + " " + new Date(sessionDateStr).getFullYear();

    let start = this.state.start[slot];
    let end = this.state.end[slot];

    //console.log(slot);

    //console.log(dt >= this.state.start[slot], dt <= this.state.end[slot], currDt >= dateDt);
    let duration = slot===0? "11 AM - 12 NOON" : (slot===1? "2 PM - 3 PM" : (slot===2? "8 PM - 9PM" : ""));
    let sessionInfo = "";
    if((dt >= this.state.start[slot] && dt <= this.state.end[slot]) && currDt >= dateDt ){
      sessionInfo = "NOSSQ : Ongoing session "  + duration;
    } else {
      sessionInfo = "NOSSQ : Upcoming session " + duration;
    }


    return (
      <div className="App">
        <div className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <h5>Today : {this.state.dayNames[new Date().getDay()] + " " + new Date().getDate() + " " + this.state.monthNames[new Date().getMonth()] + " " + new Date().getFullYear() }</h5>
          <h2>{sessionInfo}</h2>
          {this.state.tick}

        </div>
        {this.state.renderLogin ? this.renderPortalLogin() : this.state.inst ? (this.state.result ? this.renderResult() : this.renderQuiz()) : this.renderInstructions()}
      </div>
    );
  }

}

export default App;



// WEBPACK FOOTER //
// ./src/Components/temp/Quiz/App.js