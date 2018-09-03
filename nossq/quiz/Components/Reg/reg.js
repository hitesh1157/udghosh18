import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import firebaseFirestore from '../../services/firebaseFirestore';
import './reg.css';
import CircularProgress from 'material-ui/CircularProgress';
import _AppBar from '../Appbar/appbar';
import PForm from "./PForm/PForm";
import './fonts/font-awesome.min.css';


const items = [];
const objects = [];
objects.push({
    name: "Atheletics (Men)",
    maxCount: 32,
    minCount: 5
});

objects.push({
    name: "Atheletics (Women)",
    maxCount: 25,
    minCount: 5
});
objects.push({
    name: "Badminton (Men)",
    maxCount: 5,
    minCount: 2
});
objects.push({
    name: "Badminton (Women)",
    maxCount: 5,
    minCount: 3
});
objects.push({
    name: "Basketball (Men)",
    maxCount: 12,
    minCount: 10
});
objects.push({
    name: "Basketball (Women)",
    maxCount: 12,
    minCount: 10
});
objects.push({
    name: "Carrom",
    maxCount: 2,
    minCount: 2
});
objects.push({
    name: "Chess",
    maxCount: 5,
    minCount: 3
});
objects.push({
    name: "Cricket",
    maxCount: 16,
    minCount: 11
});
objects.push({
    name: "Football (Men)",
    maxCount: 16,
    minCount: 11
});
objects.push({
    name: "Football (Women)",
    maxCount: 16,
    minCount: 16
});
objects.push({
    name: "Futsal (Men)",
    maxCount: 14,
    minCount: 5
});

objects.push({
    name: "Futsal (Women)",
    maxCount: 14,
    minCount: 5
});
objects.push({
    name: "Handball (Men)",
    maxCount: 12,
    minCount: 7
});
objects.push({
    name: "Handball (Women)",
    maxCount: 12,
    minCount: 7
});
objects.push({
    name: "Hockey",
    maxCount: 16,
    minCount: 11
});
objects.push({
    name: "Hockey (Women)",
    maxCount: 16,
    minCount: 11
});
objects.push({
    name: "Kabaddi",
    maxCount: 10,
    minCount: 6
});
objects.push({
    name: "Kho Kho (Men)",
    maxCount: 12,
    minCount: 12
});

objects.push({
    name: "Kho Kho (Women)",
    maxCount: 12,
    minCount: 12
});
objects.push({
    name: "Lawn Tennis (Men)",
    maxCount: 4,
    minCount: 3
});

objects.push({
    name: "Lawn Tennis (Women)",
    maxCount: 4,
    minCount: 2
});
objects.push({
    name: "Mr. Udghosh",
    maxCount: 1,
    minCount: 1
});
objects.push({
    name: "Poker",
    maxCount: 100,
    minCount: 1
});
objects.push({
    name: "Power Lifting (Men)",
    maxCount: 10,
    minCount: 3,
    message: '2 in each category, 10 per college'
});
objects.push({
    name: "Sports Quiz",
    maxCount: 6,
    minCount: 6
});
objects.push({
    name: "Squash (Men)",
    maxCount: 4,
    minCount: 4
});

objects.push({
    name: "Squash (Women)",
    maxCount: 4,
    minCount: 4
});
objects.push({
    name: "Table Tennis (Men)",
    maxCount: 4,
    minCount: 3
});

objects.push({
    name: "Table Tennis (Women)",
    maxCount: 4,
    minCount: 2
});
objects.push({
    name: "Volleyball (Men)",
    maxCount: 12,
    minCount: 12
});

objects.push({
    name: "Volleyball (Women)",
    maxCount: 12,
    minCount: 12
});
objects.push({
    name: "Weight Lifting (Men)",
    maxCount: 10,
    minCount: 2
});



for (let i = 0; i < objects.length; i++ ) {
    items.push(<MenuItem value={i} key={i} primaryText={objects[i].name} />);
}

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

let validateIFSC = (ifsc) => {
    var re = /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/;
    return re.test(ifsc);
}

let validateAcNo = (no) => {
    var re = /^\d{9,18}$/;
    return re.test(no);
}

const CircularProgressSimple = () => (
    <div id="circle-progress" >
    
        
    
    </div>
);

export default class Reg extends React.Component {

    constructor(props) {
        super(props);

        if(window.localStorage.getItem('new')==='true') {
            this.state = {
                loading: false,
                saveAccFacInfo: <span><RaisedButton style={{ marginLeft: '2vh', marginTop: '3vh' }} primary={true} onClick={this.handleAFMSubmit.bind(this)} label="SAVE ALL" /></span>,
                saveGenInfo: <span><RaisedButton style={{ marginTop: '2vh', marginLeft: '2.5vh' }} primary={true} onClick={this.handleGenInfoChange.bind(this)} label="SAVE" /></span>,
                sportPos: 1,
                renderGenInfo: true,
                renderAFMInfo: false,
                collegeName: "",
                deanName: "",
                deanContactNo: "",
                deanEmail: "",
                afmName: [''],
                afmContactNo: [''],
                afmEmail: [''],
                clName: "",
                clContactNo: "",
                clEmail: "",
                acHolder: "",
                acIFSC: "",
                acBName: "",
                acNo: "",
                documentId: "",
                slideIndex: 0,
            };
        } else {
            let data = JSON.parse(window.localStorage.getItem('college_doc_data'));
            let accompanyingFacultyMembers = data.accompanyingFacultyMembers;
            let afmName = [],afmContactNo = [], afmEmail = [];
            if(accompanyingFacultyMembers !== undefined) {
                Object.keys(accompanyingFacultyMembers).map(key => {
                    let member = accompanyingFacultyMembers[key];
                    afmName.push(member.name);
                    afmContactNo.push(member.contactNo);
                    afmEmail.push(member.email);

                });
            }
            this.state = {
                loading: false,
                saveAccFacInfo: <span><RaisedButton style={{ marginLeft: '2vh', marginTop: '3vh' }} primary={true} onClick={this.handleAFMSubmit.bind(this)} label="SAVE ALL" />&emsp;<i className="fa fa-check" style={{ color: '#3cba54' }} ></i></span>,
                saveGenInfo: <span><RaisedButton style={{ marginTop: '2vh', marginLeft: '2.5vh' }} primary={true} onClick={this.handleGenInfoChange.bind(this)} label="SAVE" />&emsp;<i className="fa fa-check" style={{ color: '#3cba54'}} ></i></span>,
                sportPos: 1,
                renderGenInfo: true,
                renderAFMInfo: false,
                collegeName: data.collegeName===undefined ? "" : data.collegeName,
                deanName: data.deanName === undefined ? "" : data.deanName,
                deanContactNo: data.deanContactNo === undefined ? "" : data.deanContactNo,
                deanEmail: data.deanEmail === undefined ? "" : data.deanEmail ,
                afmName: afmName,
                afmContactNo: afmContactNo,
                afmEmail: afmEmail,
                clName: data.contingentLeaderName === undefined ? "" : data.contingentLeaderName,
                clContactNo: data.contingentLeaderContactNo === undefined ? "": data.contingentLeaderContactNo,
                clEmail: data.contingentLeaderEmail === undefined ? "" : data.contingentLeaderEmail,
                acHolder: data.refundACHolder === undefined ? "" : data.refundACHolder,
                acIFSC: data.refundBankIFSC === undefined ? "" : data.refundBankIFSC,
                acBName: data.refundBankBranchAddress === undefined ? "" : data.refundBankBranchAddress,
                acNo:data.refundBankAcNo === undefined ? "": data.refundBankAcNo,
                documentId: window.localStorage.getItem('college_doc_id'),
                slideIndex: 0,
            }
        }

        

        this.handleChange = this.handleChange.bind(this);
    }

    setLoading = (val) => {
        this.setState({ loading: val });
    }

    handleTabsChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

    handleChange = (e, v, varName) => {

        let errName = varName + "Err";

        this.setState({
            [varName] : v,
            [errName]: "",
            saveAccFacInfo: <span><RaisedButton style={{ marginLeft: '2vh', marginTop: '3vh' }} primary={true} onClick={this.handleAFMSubmit.bind(this)} label="SAVE ALL" /></span>,
            saveGenInfo: <span><RaisedButton style={{ marginTop: '2vh', marginLeft: '2.5vh' }} primary={true} onClick={this.handleGenInfoChange.bind(this)} label="SAVE" /></span>
        });

        //console.log(this.state);
    };

    handleAFMChange = (e, v, varName, i) => {

        let vals = [...this.state[varName]];
        vals[i] = v;
        let errName = varName + "Err" + i;

        this.setState({
            [varName] : vals,
            [errName]: "",
            saveAccFacInfo: <span><RaisedButton style={{ marginLeft: '2vh', marginTop: '3vh' }} primary={true} onClick={this.handleAFMSubmit.bind(this)} label="SAVE ALL" /></span>
        });
    };

    removeClick = (i) => {

        if(this.state['afmName'] !== 1) {
            let varNames = ['afmName', 'afmContactNo', 'afmEmail'];

            for(let j=0; j<3; j++){
                let values = [...this.state[varNames[j]]];
                values.splice(i,1);
                this.setState({ [varNames[j]]: values });
            }

            //console.log(this.state);
        } else {

        }
    };


    renderMultAFM() {
        return this.state.afmName.map((el, i) =>
        
            <div key={i}>
           
                <TextField
                    style={{marginLeft: 16}}
                    hintText="Name"
                    errorText={this.state["afmNameErr" + i]}
                    value={el||''}
                    floatingLabelText="Name"
                    onChange={(e, v) => this.handleAFMChange(e, v, "afmName", i)}
                />

                <TextField
                    style={{marginLeft: 16}}
                    hintText="Contact"
                    errorText={this.state["afmContactNoErr" + i]}
                    value={this.state.afmContactNo[i]||''}
                    floatingLabelText="Contact"
                    onChange={(e, v) => this.handleAFMChange(e, v, "afmContactNo", i)}
                />

                <TextField
                    style={{marginLeft: 16}}
                    hintText="Email"
                    errorText={this.state["afmEmailErr" + i]}
                    value={this.state.afmEmail[i]||''}
                    floatingLabelText="Email"
                    onChange={(e, v) => this.handleAFMChange(e, v, "afmEmail", i)}
                />
                <RaisedButton onClick={this.removeClick.bind(this, i)} secondary={true} label={"REMOVE"} style={{ margin: 12, height: 46 }} />
                {/* <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/> */}
            </div>
        )
    }

    addAFMClick(){
        this.setState(prevState => ({ afmName: [...prevState.afmName, '']}))
        this.setState(prevState => ({ afmContactNo: [...prevState.afmContactNo, '']}))
        this.setState(prevState => ({ afmEmail: [...prevState.afmEmail, '']}))
    }

    handleAFMSubmit = () => {
        this.setState({ loading: true });
        let { afmName, afmContactNo, afmEmail, clName, clContactNo, clEmail, documentId, acHolder, acIFSC, acBName , acNo} = this.state;

        // checks
        let afms = [];
        let isDataValid = true;

        console.log(afmName, afmContactNo, afmEmail);

        // Small contingent may have no faculty members
        // if(afmName.length===0 || afmName[0].trim() === "") {
        //     alert('At least one faculty member is required.');
        //     this.setState({ loading: false });
        //     return;
        // }
        if(afmName.length > 0 && afmName[0] !== '' || afmName.length === 0) {
            for (let i = 0; i < afmName.length; i++) {

                let isValid = true;

                if(!validateEmail(afmEmail[i])) {
                    this.setState({
                        ["afmEmailErr" + i]: "Invalid Email"
                    });
                    isValid = false;
                }

                if (afmEmail[i].trim() === "") {
                    this.setState({
                        ["afmEmailErr" + i]: "This field is required"
                    });
                    isValid = false;
                }

                if (!validateMobile(afmContactNo[i])) {
                    this.setState({
                        ["afmContactNoErr" + i]: "Invalid Contact"
                    });
                    isValid = false;
                }

                if (afmContactNo[i].trim() === "") {
                    this.setState({
                        ["afmContactNoErr" + i]: "This field is required"
                    });
                    isValid = false;
                }

                if(afmName[i].trim() === "") {
                    this.setState({
                        ["afmName" + i]: "This field is required"
                    });
                    isValid = false;
                }

                if(!isValid) {
                    isDataValid = isValid;
                    this.setState({ loading: false });
                    continue;
                }


                afms.push({
                    name: afmName[i],
                    contactNo: afmContactNo[i],
                    email: afmEmail[i]
                });
            }

            if(clName.trim() === "") {
                this.setState({ clNameErr: "This field is required" });
                isDataValid= false;
            }

            if(! validateMobile(clContactNo)) {
                this.setState({ clContactNoErr: "Invalid contact" });
                isDataValid = false;
            }

            if(clContactNo.trim() === "") {
                this.setState({ clContactNo: "This field is required" });
                isDataValid = false;
            }

            if (!validateEmail(clEmail)) {
                this.setState({ clEmailErr: "Invalid email" });
                isDataValid = false;
            }

            if (clEmail.trim() === "") {
                this.setState({ clEmailErr: "This field is required" });
                isDataValid = false;
            }

            if(!validateIFSC(acIFSC)) {
                this.setState({ acIFSCErr: "Invalid IFS code" });
                isDataValid = false;
            }

            if(acHolder.trim() === "") {
                this.setState({ acHolderErr: "This field is required" });
                isDataValid = false;
            } 

            if(acBName.trim() === "") {
                this.setState({ acBNameErr: "This field is required" });
                isDataValid = false;
            }

            if (!validateAcNo(acNo)) {
                this.setState({ acNoErr: "Account number is not valid" });
                isDataValid = false;
            }

            if(!isDataValid) {
                console.log("aborting update");
                this.setState({ loading: false });
                return;
            }

            console.log("starting update");

            firebaseFirestore.collection('collegeRegistrations').doc(documentId)
                .update({
                    accompanyingFacultyMembers: afms,
                    contingentLeaderName: clName,
                    contingentLeaderContactNo: clContactNo,
                    contingentLeaderEmail : clEmail,
                    refundACHolder: acHolder,
                    refundBankIFSC: acIFSC,
                    refundBankBranchAddress: acBName,
                    refundBankAcNo: acNo,
                    passTwo: true
                }).then((docRef) => {
                    console.log("updated");
                    this.setState({ renderAFMInfo: false, loading: false, saveAccFacInfo: <span><RaisedButton style={{ marginLeft: '2vh', marginTop: '3vh' }} primary={true} onClick={this.handleAFMSubmit.bind(this)} label="SAVE ALL" />&emsp;<i className="fa fa-check" style={{ color:'#3cba54'}} ></i></span> });
                }).catch((error) => {
                    console.log(error);
                    alert(error.message);
                    this.setState({ loading: false });
                });
        }

    };

    renderAccompFac = () => {
        return <div>
            <h2 style={{ color: '#000' }} id="subtitle2">Faculty &amp; Contingent Leader Information</h2>
            <h4 style={{ color: '#000', marginTop: 0 }} id="subtitle2">Please add information to the best of your knowledge. Click <strong>SAVE ALL</strong> button to save. Note that you can update the information as many times until the final submission date is announced after which no changes will be accepted.</h4>
            <br/>
            <h3 style={{ color: '#000' }} id="subtitle2">Accompanying Faculty Member(s)</h3>
            <h4 style={{ color: '#000', marginTop: 0 }} id="subtitle2">Please add details of accompanying faculty member(s) from your college. Click <strong>+1</strong> to add fields for one faculty member. Click <strong>Remove</strong> to remove.</h4>

            <div style={{ marginTop: 0 }}>{this.renderMultAFM()}</div>

            {/* <input type="button" value="add more" onClick={this.addAFMClick.bind(this)} /> */}
            {/* <input type="submit" value="Submit" /> */}
            <RaisedButton onClick={this.addAFMClick.bind(this)} primary={true} label={"+1"} style={{ margin: 12, height: 46 }} />

            <h3 style={{ color: '#000' }} id="subtitle2">Contingent Leader</h3>
            <h4 style={{ color: '#000', marginTop: 0 }} id="subtitle2">Contingent leader information</h4>
            <div style={{ marginTop: 16 }}>
              <div>
                <TextField errorText={this.state.clNameErr} style={{ marginLeft: 16 }} hintText="Name" value={this.state.clName} floatingLabelText="Name" onChange={(e, v) => this.handleChange(e, v, "clName")} />

                <TextField errorText={this.state.clContactNoErr} style={{ marginLeft: 16 }} hintText="Contact" value={this.state.clContactNo} floatingLabelText="Contact" onChange={(e, v) => this.handleChange(e, v, "clContactNo")} />

                <TextField errorText={this.state.clEmailErr} style={{ marginLeft: 16 }} hintText="Email" value={this.state.clEmail} floatingLabelText="Email" disabled={true} onChange={(e, v) => this.handleChange(e, v, "clEmail")} />
              </div>
            </div>

            <h3 style={{ color: '#000' }} id="subtitle2">
              Account Details in case of any refund
            </h3>

            <div>
              <TextField style={{ marginLeft: 16 }} hintText="Account Holder Name" value={this.state.acHolder} floatingLabelText="Account Holder Name" errorText={this.state.acHolderErr} onChange={(e, v) => this.handleChange(e, v, "acHolder")} />

              <TextField style={{ marginLeft: 16 }} hintText="IFS Code" value={this.state.acIFSC} floatingLabelText="IFS Code" errorText={this.state.acIFSCErr} onChange={(e, v) => this.handleChange(e, v, "acIFSC")} />

              <TextField style={{ marginLeft: 16 }} hintText="Branch Name" value={this.state.acBName} floatingLabelText="Branch Name" errorText={this.state.acBNameErr} onChange={(e, v) => this.handleChange(e, v, "acBName")} />

                <TextField style={{ marginLeft: 16 }} hintText="Account #" value={this.state.acNo} floatingLabelText="Account #" errorText={this.state.acNoErr} onChange={(e, v) => this.handleChange(e, v, "acNo")} />
            </div>

            {window.localStorage.getItem('new') !== 'true'
                && this.state.saveAccFacInfo}
          </div>;
    };

    renderGenInfo = () => {
        return(
            <div >
                <h2 style={{ color: '#000' }} id="subtitle">General Information</h2>

                <h4 style={{ color: '#000' }} id="subtitle">This sections consists of general information about your college. You are requested to fill the form in best of your knowledge.<br/>Click on <strong>SAVE</strong> button to save the information. Note that you can update the information as many times until the final submission date is announced after which no changes will be accepted.</h4>

                <div style={{marginTop: 20, maxWidth : 300}}>
                    <TextField
                    errorText={this.state.collegeNameErr}
                        style={{marginLeft: 16}}
                        value={this.state.collegeName}
                        hintText="College Name"
                        floatingLabelText="College Name"
                        onChange={(e, v) => this.handleChange(e, v, "collegeName")}
                    />

                    <TextField
                        errorText={this.state.deanNameErr}
                        style={{marginLeft: 16}}
                        value={this.state.deanName}
                        hintText="College's Dean Name"
                        floatingLabelText="College's Dean Name"
                        onChange={(e, v) => this.handleChange(e, v, "deanName")}
                    />

                    <TextField
                        errorText={this.state.deanContactNoErr}
                        style={{marginLeft: 16}}
                        value={this.state.deanContactNo}
                        hintText="Dean's Contact Number"
                        floatingLabelText="Dean's Contact Number"
                        onChange={(e, v) => this.handleChange(e, v, "deanContactNo")}
                    />

                    <TextField
                        errorText={this.state.deanEmailErr}
                        style={{marginLeft: 16}}
                        value={this.state.deanEmail}
                        hintText="Dean's Email"
                        floatingLabelText="Dean's Email"
                        onChange={(e, v) => this.handleChange(e, v, "deanEmail")}
                    />

                    {window.localStorage.getItem('new')!=='true'
                        && this.state.saveGenInfo}
                </div>
            </div>
        );
    };

    isEmailValid = (emailText) => {
        var reg = /\b[A-Z0 -9._ % +-]+@[A - Z0 - 9. -]+\.[A - Z]{ 2,} \b/;
        return reg.test(emailText);
    };

    handleGenInfoChange = async () => {
        this.setState({ loading: true });
        let { collegeName, deanName, deanContactNo, deanEmail } = this.state;
        let isDataValid = true;


        // checks
        if(collegeName.trim() === "") {
            this.setState({ collegeNameErr: "This field is required" });
            isDataValid = false;
        }

        if(deanName.trim() === "") {
            this.setState({ deanNameErr: "This field is required" });
            isDataValid = false;
        }

        if(! validateMobile(deanContactNo.trim())) {
            this.setState({ deanContactNoErr: "Invalid contact number" });
            isDataValid = false;
        }

        if(deanContactNo.trim() === "") {
            this.setState({ deanContactNoErr: "This field is required" });
            isDataValid = false;
        }

        if(! validateEmail(deanEmail)) {
            this.setState({ deanEmailErr: "Invalid email" });
            isDataValid = false;
        }

        if(deanEmail.trim() === ""){
            this.setState({ deanEmailErr: "This field is required" });
            isDataValid = false;
        }

        if(! isDataValid) {
            this.setState({ loading: false });
            return;
        }

        if(isDataValid) {
            let docId = window.localStorage.getItem('college_doc_id');
            if (docId === null) {
                this.setState({ loading: false });
                return;
            }
            firebaseFirestore.doc('collegeRegistrations/' + docId).update({
                collegeName: collegeName,
                deanName: deanName,
                deanContactNo: deanContactNo,
                deanEmail: deanEmail,
                passOne: true
            }).then(updatedDocRef => {
            
                //console.log('handleGenInfoChange:updated');
                this.setState({ renderGenInfo: false, renderAFMInfo: true, documentId: docId, loading: false, saveGenInfo: <span><RaisedButton style={{ marginTop: '2vh', marginLeft: '2.5vh' }} primary={true} onClick={this.handleGenInfoChange.bind(this)} label="SAVE" />&emsp;<i className="fa fa-check" style={{ color:'#3cba54'}} ></i></span> });
            })
            // firebaseFirestore.collection('collegeRegistrations').add({
            //     collegeName: collegeName,
            //     deanName: deanName,
            //     deanContactNo: deanContactNo,
            //     deanEmail: deanEmail
            // }).then((docRef) => {
            //     //console.log('document created with id: ', docRef.id);
            //     this.setState({ renderGenInfo: false, renderAFMInfo: true, documentId: docRef.id });
            // });

        }
        
    };

    handleDropdownChange = (event, index, value) => {
        this.setState({ loading: true });
        this.setState({ sportPos: value });
    }

    renderParticipationForm = () => {

        return (
            <div>
                <h2 style={{ color: '#000' }} id="subtitle">Participation</h2>
                <p style={{ color: '#000' }} className="para">
                    Please fill the sports your contingent will participate in and name the players in the appropriate places. In case of common players please state their names in each sport, they will participate in, separately. Also for every team pertaining to a sport, it is suggested to name extras, in case of unforeseen circumstances.
                </p>
                <p style={{ color: '#000' }} className="para">
                    To create a team for a particular sport: Select a sport and click <strong>CREATE</strong>. Once it is created, add the players' information and click <strong>UPDATE</strong> to save.
                </p>

                <p style={{ color: '#000' }} className="para">
                    Get the rulebook <a style={{ color:'#4885ed'}} target="_blank" href="https://docs.google.com/document/d/1yUZDGDEPn4TQ5pcWKx9BNgz0oeRJobPdqDbuqkZX9Fg/edit" >here</a>
                </p>


                <div style={{display: "flex", alignItems: "left", justifyContent: "left", marginTop: 40}}>
                    <p style={{ color: '#000' }} className="para">Select a sport</p>
                    {/* <DropDownMenu maxHeight={300} value={this.state.sportPos} onChange={this.handleDropdownChange}>
                        {items}
                    </DropDownMenu> */}
                </div>

                <div style={{ display: "flex", alignItems: "left", justifyContent: "left", marginTop: 0 }}>
                
                    <DropDownMenu maxHeight={300} value={this.state.sportPos} onChange={this.handleDropdownChange}>
                        {items}
                    </DropDownMenu>
                </div>

                <div style={{marginTop: 16}}>
                    <PForm documentId={this.state.documentId} name={objects[this.state.sportPos].name} maxCount={objects[this.state.sportPos].maxCount} minCount={objects[this.state.sportPos].minCount} loadingRef={this.setLoading}  />
                </div>
            </div>
        );

    };

    render() {

        const styles = {
        headline: {
            fontSize: 24,
            paddingTop: 16,
            marginBottom: 12,
            fontWeight: 400,
        },
        slide: {
            padding: 10,
        },
        };

        return (
            <div className="this is class " style={{ height:'100%',  background: "url('https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/background.png?alt=media&token=13f7c589-3fb9-44ec-8768-7426eaa54b67') no-repeat center / cover !important" }} >
                <_AppBar color="rgba(255,255,255,1)" handleOpen={this.props.handleOpen} handleClose={this.props.handleClose} />

                {this.state.loading && <CircularProgressSimple />}
                
                <div style={{ paddingLeft: "14vh",  paddingRight: "12vh", marginTop: "4vh", float: "left", background: "url('https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/background.png?alt=media&token=13f7c589-3fb9-44ec-8768-7426eaa54b67') no-repeat  center / cover" }}>
                    {
                        window.localStorage.getItem('new') === 'true'
                            ? <div>
                                <h1 id="title">College Registration Portal | Udghosh'18</h1>

                                <div style={{ marginBottom: 0 }}>
                                    {this.state.renderGenInfo
                                        ? this.renderGenInfo()
                                        : this.state.renderAFMInfo
                                            ? this.renderAccompFac()
                                            : this.renderParticipationForm() && window.localStorage.setItem('new', false)}
                                </div>

                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 40 }}>
                                    {this.state.renderGenInfo ? <RaisedButton primary={true} onClick={this.handleGenInfoChange.bind(this)} label="NEXT" /> : this.state.renderAFMInfo ? <RaisedButton primary={true} label="NEXT" onClick={this.handleAFMSubmit.bind(this)} /> : <p />}
                                </div>
                            </div>
                            : <div style={{ marginTop: '5vh', paddingBottom:'30vh', padding: '2vh', backgroundColor: 'rgba(255,255,255,0.9)' }} >

                                <Tabs
                                style={{overflowY:'hidden'}}
                                    onChange={this.handleTabsChange}
                                    value={this.state.slideIndex}
                                >
                                    <Tab label="General Information" value={0} />
                                    <Tab label="Faculty Information" value={1} />
                                    <Tab style={{overflowY: 'hidden'}} label="Teams Information" value={2} />
                                </Tabs>
                                <SwipeableViews
                                    index={this.state.slideIndex}
                                    onChangeIndex={this.handleChange}
                                    style={{ height: '80vh', overflowY: 'auto' }}
                                    
                                >
                                    <div>
                                        <h2 style={styles.headline}></h2>
                                        {this.renderGenInfo()}<br />
                                    </div>
                                    <div style={styles.slide}>
                                        {this.renderAccompFac()}
                                    </div>
                                    <div style={styles.slide}>
                                        {this.renderParticipationForm()}
                                    </div>
                                </SwipeableViews>

                            </div>}
                </div>

            </div>
        );
    }
}
