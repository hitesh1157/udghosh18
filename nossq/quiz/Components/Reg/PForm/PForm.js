import React from "react";
import TextField from 'material-ui/TextField';
import RaisedButton from "material-ui/RaisedButton";
import Snackbar from 'material-ui/Snackbar';

import firebaseFirestore from '../../../services/firebaseFirestore';

import "./pform.css";
import { create } from "handlebars";

let isDataValid = true;



export default class PForm extends React.Component {

    constructor(props){
        super(props);

        let arr = [];
        for(let i = 0; i < this.props.minCount; i++) {
            arr.push('');
        }

        this.state = {
            updated: false,
            message: "Limit reached",
            snackOpen: false,
            memName: arr,
            memContactNo: arr,
            memEmail: arr,
            sportName: this.props.name,
            captainEmail: "",
            viceCaptainEmail: "",
            documentId : this.props.documentId,
            createDisabled: false,
            createText: 'Create',
            loading:this.props.loadingRef
        };


        

        //////console.log('collegeRegistrations/' + this.state.documentId + '/' + this.state.sportName);
        const collectionReference = firebaseFirestore.collection('collegeRegistrations/' + this.state.documentId + '/' + this.state.sportName);
        collectionReference.get().then(snapshot => {
            //////console.log('length', snapshot.docs.length);
            if(snapshot.docs.length !== 0) {
                this.setState({
                    createDisabled: true,
                    
                });


            }
        })
    }

    getDefaultState = async (nextProps) => {
        //////console.log('getDefaultState', nextProps);
        let defaultState = {
            updated: false,
            message: "Limit reached",
            snackOpen: false,
            captainEmail:"",
            viceCaptainEmail: "",
            sportName: nextProps.name,
            documentId: nextProps.documentId,
            createDisabled: false,
            createText: "Create",
            loading: nextProps.loadingRef
        };

        //////console.log('url:', 'collegeRegistrations/' + nextProps.documentId + '/' + nextProps.name);
        const collectionReference = firebaseFirestore.collection('collegeRegistrations/' + nextProps.documentId + '/' + nextProps.name);
        const snapshot = await collectionReference.get();
        //////console.log('checkhere:', snapshot.docs.length);
        if (snapshot.docs.length !== 0) {
            defaultState.createDisabled = true;
            //////console.log('asd: ',defaultState);

            let arr1 = [], arr2 = [], arr3= [];

            for(let doc of snapshot.docs) {
                let pl = doc.data();

                if(pl.captainEmail !== undefined) {
                    defaultState.captainEmail = pl.captainEmail;
                }
                if(pl.viceCaptainEmail !== undefined) {
                    defaultState.viceCaptainEmail = pl.viceCaptainEmail;
                }

                if(pl.name.trim() !== "") {
                    arr1.push(pl.name);
                    arr2.push(pl.contactNo);
                    arr3.push(pl.email);
                    
                }

            }

            defaultState['memName'] = arr1;
            defaultState['memContactNo'] = arr2;
            defaultState['memEmail'] = arr3;


        } else {
            let arr = [];
            for (let i = 0; i < this.props.minCount; i++) {
                arr.push('');
                defaultState['memName'] = arr;
                defaultState['memContactNo'] = arr;
                defaultState['memEmail'] = arr;
            }
        }

        

        //////console.log(this.props.minCount);

        //////console.log(defaultState);
        return defaultState;
    };

    componentWillReceiveProps(nextProps) {

        ////console.log('nextprops:',nextProps.name);
        ////console.log('state:',this.state.sportName);

        if(nextProps.name !== this.state.sportName) {
            ////console.log('nextprops1:', nextProps);
            this.getDefaultState(nextProps).then(stateData => {
                
                this.setState(stateData, () => {
                    this.state.loading(false);
                });
            }).catch((error) => {
                this.state.loading(false);
            })
        }
    }

    handleEmailFieldChange = (e, v, varName) => {

        if(! this.validateEmail(v)) {
            isDataValid = false;
            this.setState({ [varName + "Err"]: "Invalid email" });
        } else {
            this.setState({ [varName + "Err"]: "" });
        }

        this.setState({
            [varName] : v
        });

        //////console.log(this.state);
    };

    handleChange = (e, v, varName, i) => {

        ////console.log(v, varName, i);

        let vals = [...this.state[varName]];
        vals[i] = v;

        if(varName.includes("Name")) {
            if (v === undefined || v.trim() === "") {
                isDataValid = false;
                this.setState({ [varName + "Err" + i]: "Invalid name" });
            } else {
                isDataValid = true;
                this.setState({ [varName + "Err" + i]: "" });
            }
        } else if(varName.includes('Email')) {
            if (v === undefined || v.trim() === "" || !this.validateEmail(v)) {
                isDataValid = false;
                this.setState({ [varName + "Err" + i]: "Invalid email" });
            } else {
                isDataValid = true;
                this.setState({ [varName + "Err" + i]: "" });
            }
        }
         else {
            if (!this.validateMobile(v)) {
                isDataValid = false;
                this.setState({ [varName + "Err" + i]: "Invalid phone" });
            } else {
                isDataValid = true;
                this.setState({ [varName + "Err" + i]: "" });
            }
        }

        this.setState({
            [varName] : vals
        });
    };

    addAFMClick(){

        //console.log(this.state.memName.length);
        //console.log(this.props.maxCount);

        if(this.state.memName.length < this.props.maxCount){
            this.setState(prevState => ({ memName: [...prevState.memName, '']}));
            this.setState(prevState => ({ memContactNo: [...prevState.memContactNo, '']}));
            this.setState(prevState => ({ memEmail: [...prevState.memEmail, ''] }));
        } else {
            // this.setState({
            //     snackOpen: true
            // })

            alert('Maximum limit reached');
        }
    }

    removeClick = (i) => {

        let varNames = ['memName', 'memContactNo', 'memEmail'];

        if(this.state[varNames[0]].length === this.props.minCount) {
            this.setState({
                snackOpen: true
            });
        } else {
            for(let j=0; j<2; j++){
                let values = [...this.state[varNames[j]]];
                values.splice(i,1);
                this.setState({ [varNames[j]]: values });
            }
        }

    };

    renderMultMembers() {
        let style;
        if (this.state.sportName === 'Poker' || this.state.sportName === 'Mr. Udghosh' || this.state.sportName.includes("Lawn") || this.state.sportName.includes("Carrom") || this.state.sportName.includes("Squash") || this.state.sportName.includes("Futsal") || this.state.sportName.includes("Power") || this.state.sportName.includes("Weight")) {
            style = { marginLeft: 16};
        } else {
            style = { marginLeft: 16, display: 'none' };
        }
        let norm = false;
        if (this.state.sportName === 'Poker'  || this.state.sportName === "Mr. Udghosh" || this.state.sportName.includes("Lawn")) {
            norm = true;
        }
        return this.state.memName.map((el, i) =>
            <div key={i} style={{display: "flex", alignItems: "left", justifyContent: "left", marginTop: 40}}>

                <p style={{ color: '#000' }} className="sNo">{i+1}.</p>

                {( () => {
                    switch (i) {
                        case 0:   return (
                            <div>
                                <TextField
                                    style={{marginLeft: 16}}
                                    hintText={ norm ? "Participant Name" : "Captain Name"}
                                    value={el||''}
                                    errorText={this.state["memNameErr" + i]}
                                    floatingLabelText={norm ? "Participant Name" : "Captain Name"}
                                    onChange={(e, v) => this.handleChange(e, v, "memName", i)}
                                />

                                <TextField
                                    style={{marginLeft: 16}}
                                    hintText={norm ? "Contact #" : "Captain's Contact #"}
                                    errorText={this.state["memContactNoErr" + i]}
                                    value={this.state.memContactNo[i]||''}
                                    floatingLabelText={norm ? "Contact" : "Captain's Contact #"}
                                    onChange={(e, v) => this.handleChange(e, v, "memContactNo", i)}
                                />

                                <TextField
                                    style={{marginLeft: 16}}
                                    hintText="Email"
                                    value={this.state.captainEmail || this.state.memEmail[i]}
                                    errorText={this.state["captainEmailErr"]}
                                    floatingLabelText="Email"
                                    onChange={(e, v) => this.handleEmailFieldChange(e, v, "captainEmail")}
                                />
                                {/* <RaisedButton onClick={this.removeClick.bind(this, i)} secondary={true} label={"REMOVE"} style={{ margin: 12, height: 46 }} /> */}
                            </div>
                        );
                        case 1 : return <div>
                            <TextField errorText={this.state["memNameErr" + i]} style={{ marginLeft: 16 }} hintText={norm ? "Participant name" : "Vice Captain's name"} value={el || ""} floatingLabelText={norm ? "Participant name" : "Vice Captain's name"} onChange={(e, v) => this.handleChange(e, v, "memName", i)} />

                            <TextField errorText={this.state["memContactNoErr" + i]} style={{ marginLeft: 16 }} hintText={norm ? "Contact" : "Vice Captain's Contact #"} value={this.state.memContactNo[i] || ""} floatingLabelText={norm ? "Contact" : "Vice Captain's Contact #"} onChange={(e, v) => this.handleChange(e, v, "memContactNo", i)} />

                            <TextField errorText={this.state["viceCaptainEmailErr"]} style={{ marginLeft: 16 }} hintText="Email" value={this.state.viceCaptainEmail || this.state.memEmail[i]} floatingLabelText="Email" onChange={(e, v) => this.handleEmailFieldChange(e, v, "viceCaptainEmail")} />
                                     {/* <RaisedButton onClick={this.removeClick.bind(this, i)} secondary={true} label={"REMOVE"} style={{ margin: 12, height: 46 }} /> */}
                                   </div>;
                        default:      return (
                            <div>
                                <TextField
                                    style={{marginLeft: 16}}
                                    hintText={norm ? "Participant Name" : "Player Name"}
                                    value={el||''}
                                    errorText={this.state["memNameErr" + i]}
                                    floatingLabelText={norm ? "Participant Name" : "Player Name"}
                                    onChange={(e, v) => this.handleChange(e, v, "memName", i)}
                                />

                                <TextField
                            
                                    style={style}
                                    hintText="Contact"
                                    errorText={this.state["memContactNoErr" + i]}
                                    value={this.state.memContactNo[i]||''}
                                    floatingLabelText="Contact"
                                    onChange={(e, v) => this.handleChange(e, v, "memContactNo", i)}
                                />

                                <TextField

                                    style={style}
                                    hintText="Email"
                                    errorText={this.state["memEmailErr" + i]}
                                    value={this.state.memEmail[i] || ''}
                                    floatingLabelText="Email"
                                    onChange={(e, v) => this.handleChange(e, v, "memEmail", i)}
                                />
                                <RaisedButton onClick={this.removeClick.bind(this, i)} secondary={true} label={"REMOVE"} style={{ margin: 12, height: 46 }} />
                                
                            </div>


                        );
                    }
                })()}

            </div>
        )
    }

    renderMemberFields = () => {

        let style = { margin: 12, height: 46 };
        
        return <div>
            <div style={{ marginTop: 16 }}>
              {this.renderMultMembers()}
            </div>
            <RaisedButton   onClick={this.addAFMClick.bind(this)} primary={true} label={"+ ADD ONE"} style={style} />
        
          </div>;

    };

    saveSportDetails = () => {
        
        this.state.loading(true);
        //////console.log(this.state);

        // checks
        
        let { captainEmail, viceCaptainEmail, sportName, documentId, memName, memContactNo, memEmail } = this.state;
        const collectionReference = firebaseFirestore.collection('collegeRegistrations/' + documentId + '/' + sportName);
        collectionReference.get().then(snapshot => {
            if(snapshot.docs.length > 0) {

                alert('Already Submitted for ' + sportName);
                this.state.loading(false);

            } else {

                let docRefs = [];
                let promises = [];
                //console.log(this.props.maxCount);
                for (let i = 0; i < this.props.maxCount; i++) {

                    if (i === 0) {

                        promises.push(collectionReference.add({
                            name: memName[i],
                            contactNo: memContactNo[i],
                            captainEmail: captainEmail || ''
                        }));
                        continue;
                    }
                    if (i === 1) {
                        promises.push(collectionReference.add({
                            name: memName[i],
                            contactNo: memContactNo[i],
                            viceCaptainEmail: viceCaptainEmail || ''
                        }));
                        continue;
                    }

                    if(i < memName.length) {
                        promises.push(collectionReference.add({
                            name: memName[i],
                            contactNo: memContactNo[i],
                            email: memEmail[i]
                        }));
                    } else {
                        promises.push(collectionReference.add({
                            name: '',
                            contactNo: '',
                            email: ''
                        }));
                    }

                }

                Promise.all(promises).then((responses) => {
                    const docIds = responses.map(response => response.id);
                    firebaseFirestore.collection('collegeRegistrations').doc(documentId)
                        .update({ [sportName]: docIds }).then(docRef => {
                            this.setState({ 
                                message: "Players information submitted for " + sportName, 
                                snackOpen: true,
                                createDisabled: true,
                                createText: 'Created!' });
                            
                            this.state.loading(false);
                        
                        }).catch(function(error) {
                            this.state.loading(false);
                            //console.log(error.message);
                        })
                }).catch(function(error) {
                    this.state.loading(false);
                    //console.log(error);
                })
                
            }
        }).catch(function(error) {
            //console.log(error.message);
        });
    };


    handleRequestClose = () => {
        this.setState({
            snackOpen: false,
        });
    };

    validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

    validateMobile = (mobile) => {
    var re = /^[6-9]\d{9}$/;
    return re.test(String(mobile));
}

    updateSportDetails = () => {
        this.state.loading(true);
        //console.log(this);
        let { captainEmail, viceCaptainEmail, sportName, documentId, memName, memContactNo, memEmail } = this.state;
        const collectionReference = firebaseFirestore.collection('collegeRegistrations/' + documentId + '/' + sportName);


        collectionReference.get().then(async snapshot => {
            let counter = 0;
            let batch = firebaseFirestore.batch();
            for(let doc of snapshot.docs) {
                if(counter === 0) {
                    let data = {
                        name: memName[counter] || '',
                        contactNo: memContactNo[counter] || '',
                        captainEmail: captainEmail || ''
                    };
                    batch.set(doc.ref, data);
                } else if (counter === 1) {
                    let data = {
                        name: memName[counter] || '',
                        contactNo: memContactNo[counter] || '',
                        viceCaptainEmail: viceCaptainEmail || ''
                    };
                    batch.set(doc.ref, data);
                } else {
                    let data = {
                        name: memName[counter] || '',
                        contactNo: memContactNo[counter] || '',
                        email: memEmail[counter] || ''
                    };
                    batch.set(doc.ref, data);
                }

                counter++;
            }
            //console.log(this);
            await batch.commit();

            this.state.loading(false);
            this.setState({ updated:true });

        }).catch((error) => {
            this.state.loading(false);
            //console.log(error.message);
        })
    };

    render() {
        let { createDisabled, updated, sportName } = this.state;
        let prefix = "https://www.udghosh.org";
        if(sportName.includes("Football")) {

            prefix += "/rules/football.pdf";

        } else if(sportName.includes("Basketball")) {

            prefix += "/rules/basketball.pdf";

        } else if(sportName.includes("Cricket")){

            prefix += "/rules/cricket.pdf";

        } else if (sportName.includes("Hockey")) {

            prefix += "/rules/hockey.pdf";

        } else if (sportName.includes("Badminton")) {

            prefix += "/rules/badminton.pdf";

        } else if (sportName.includes("Volleyball")) {

            prefix += "/rules/volleyball.pdf";

        } else if (sportName.includes("Kabaddi")) {

            prefix += "/rules/kabaddi.pdf";

        } else if (sportName.includes("Futsal")) {

            prefix += "/rules/futsal.pdf";

        } else if (sportName.includes("Handball")) {

            prefix += "/rules/handball.pdf";

        } else if (sportName.includes("Carrom")) {

            prefix += "/rules/carrom.pdf";

        } else if (sportName.includes("Chess")) {

            prefix += "/rules/chess.pdf";

        } else if (sportName.includes("Kho")) {

            prefix += "/rules/khokho.pdf";

        } else if (sportName.includes("Lawn")) {

            prefix += "/rules/lawntennis.pdf";

        } else if (sportName.includes("Mr.")) {

            prefix += "/rules/mrudghosh.pdf";

        } else if (sportName.includes("Powerlifting")) {

            prefix += "/rules/powerlifting.pdf";

        } else if (sportName.includes("Quiz")) {

            prefix += "/rules/quiz.pdf";

        } else if (sportName.includes("Squash")) {

            prefix += "/rules/sqash.pdf";

        } else if (sportName.includes("Table Tennis")) {

            prefix += "/rules/tabletennis.pdf";

        } else if (sportName.includes("Weightlifting")) {

            prefix += "/rules/weightlifting.pdf";

        } else if (sportName.includes("Atheletics")) {

            prefix += "/rules/athletics.pdf";

        } else if (sportName.includes("Taekwondo")) {

            prefix += "/rules/taekwondo.pdf";

        }
        //////console.log(btnState);
        return (
            <div>
                <div style={{display: "flex", alignItems: "left", justifyContent: "left", marginTop: 60}}>
                    <h2 style={{ color: '#000' }} id="title2">{this.props.name} : {this.state.sportName === 'Mr. Udghosh'||this.state.sportName === 'Poker' ? "Participation Details" : "Team Details"}</h2>
                    <h2 style={{ color: '#000' }} id="title2">{this.props.message || ''}</h2>
                    
                    <RaisedButton target="_blank" href={prefix} primary={true} style={{ height: 40, marginLeft: 33, marginTop: 6 }} label="View rules" />
                    <RaisedButton disabled={createDisabled} onClick={this.saveSportDetails.bind(this)} primary={true} style={{height: 40, marginLeft: 33, marginTop: 6}} label={this.state.createText} />
                    <span><RaisedButton disabled={!createDisabled} onClick={this.updateSportDetails.bind(this)} primary={true} style={{ height: 40, marginLeft: 33, marginTop: 6 }} label="Update" /> {updated && <i className="fa fa-check" style={{ color: '#3cba54' }} >&emsp;</i>}</span>
                </div>

                <div style={{marginTop: 40}}>
                    {this.renderMemberFields()}
                </div>

                <Snackbar
                    open={this.state.snackOpen}
                    message={this.state.message}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }

}
