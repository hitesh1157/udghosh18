import React from 'react';
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';
import XLSX from 'xlsx';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import fireDB from '../../../services/fireDB';
import XLS from '../../../Resources/icons/xls.2724255e.svg';
import PDF from '../../../Resources/icons/pdf.3fa92281.svg';

/**
 * Vertical steppers are designed for narrow screen sizes. They are ideal for mobile.
 *
 * To use the vertical stepper with the contained content as seen in spec examples,
 * you must use the `<StepContent>` component inside the `<Step>`.
 *
 * <small>(The vertical stepper can also be used without `<StepContent>` to display a basic stepper.)</small>
 */
class VerticalLinearStepper extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            finished: false,
            open: false,
            stepIndex: 0,
            _c: "",
            _st: "",
            _s: "",
            _ph: "",
            _eph: "",
            _epph:"",
            _pph: "",
            _e: "",
            _n: 0,
            _cost: 0,
            rABS: typeof FileReader !== 'undefined' && FileReader.prototype && FileReader.prototype.readAsBinaryString,
            useWorker: typeof Worker !== 'undefined',
            showError: false,
            _e_Error: false,
            pay: false
        };

        this.process_wb = this.process_wb.bind(this);

    }

    handleCityChange = (e,v) => {
        this.setState({
            _c: v
        });
    };

    handleStateChange = (e,v) => {
        this.setState({
            _st: v
        });
    };

    handleSchoolNameChange = (event, value) => {
        this.setState({
           _s: value
        });
    };

    handlePersonalPhoneChange = (event, value) => {

        this.setState({
            _pph: value
        });
    };

    handleSchoolPhoneChange = (event, value) => {

        this.setState({
           _ph: value
        });
    };

    handleEmailChange = (event, value) => {

        this.setState({
            _e: value,
        });
    };

    handleTeamNoChange = (event, value) => {
        this.setState({
            _n: parseInt(value),
            _cost: parseInt(value)*300
        });
    };

    handleNext = () => {
        const {stepIndex} = this.state;

        if(stepIndex === 0){

            if(this.state._n !== 0 && this.state._s !== "" && this.state._e !== "" &&
                this.state._ph !== "" && this.state._pph !== "" &&
                this.state._c !== "" && this.state._st !== ""){

                if(this.state._ph.length < 10 ){
                    this.setState({
                        _eph:"Invalid"
                    });
                } else  if (this.state._pph.length < 10){
                    this.setState({
                        _epph:"Invalid"
                    });

                } else {
                    if(this.state._n > 0 ){
                        this.setState({
                            stepIndex: stepIndex + 1,
                            finished: stepIndex >= 2,
                        });
                    } else {
                        alert("For school participants, number of teams must be at least one.")
                    }
                }

            } else {
                alert("All fields are mandatory.");
            }
        } else if(stepIndex === 1) {

            this.setState({ open: true });

            if(this.state.pay){
                window.open("https://www.townscript.com/e/udghosh-national-open-school-sports-quiz-school-registration-204411", "_blank");
            } else {
                alert("Please register first.");
            }

        } else if (stepIndex === 2){

        }

        // // test
        //     this.setState({
        //         stepIndex: stepIndex + 1,
        //         finished: stepIndex >= 2,
        //     });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    fixData = (data) => {
        let o = "", l = 0, w = 10240;
        for(; l<data.byteLength/w; ++l)
            o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
        o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(o.length)));
        return o;
    };


    to_json = (workbook) => {

        let result = {};
        workbook.SheetNames.forEach(function(sheetName) {
            let roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
            if(roa.length > 0) result[sheetName] = roa;
        });
        return result;
    };


    process_wb = (wb, sheetIdx) => {
        let sheet = wb.SheetNames[sheetIdx||0];
        let json = this.to_json(wb)[sheet];
        console.log(json);

        console.log(json.toString());
        console.log(json.length);

        // count non empty rows
        let len = 0;
        for(let i=1; i<json.length; i++){
            if(json[i].length > 0)
                len++;
        }

        if(len === this.state._n){
            console.log("Success");
            let dataRef = fireDB.ref('schools/' + this.state._s);
            dataRef.set({
                email: this.state._e,
                contact_no: this.state._ph,
                personal_contact_no: this.state._pph,
                city: this.state._c,
                state: this.state._st
            });



            for(let i=1; i<json.length; i++){
                let row = json[i];
                if(row.length > 0 ){
                    let childRef;
                    if(row[5] === 'J' || row[5] === 'j'){
                        childRef = dataRef.child('junior');
                    } else {
                        childRef = dataRef.child('senior');
                    }

                    childRef.push({
                        teamNo: row[0],
                        student_1: row[1],
                        contact_1: row[2],
                        student_2: row[3],
                        contact_2: row[4],
                        type: row[5]
                    }, (result) => {

                        console.log("Adding success");

                        this.setState({
                           pay: true
                        });
                        if(i===json.length-2)
                            alert("Please complete payment to complete registration");

                    });
                }
            }

        } else {
            alert("Team numbers mismatch");
        }

    };




    handleFileUpload = (event) => {
        event.preventDefault();
        let rABS = typeof FileReader !== 'undefined' && FileReader.prototype && FileReader.prototype.readAsBinaryString;

        let f = event.target.files[0];

        let reader = new FileReader();

        reader.onload = (e) => {
            console.log(f);
            let data = e.target.result;
            let wb, arr;
            let readType = {type: rABS ? 'binary' : 'base64'};
            if(!rABS) {
                arr = this.fixData(data);
                data = btoa(arr);
            }

            let doIt = () => {
                try {
                    wb = XLSX.read(data, readType);
                    this.process_wb(wb);
                } catch(e) { console.log(e); }
            };

            doIt();
        };

        if(rABS) reader.readAsBinaryString(f);
        else reader.readAsArrayBuffer(f);
    };

    renderStepActions(step) {
        const {stepIndex} = this.state;

        return (
            <div style={{margin: '12px 0'}}>
                {step !==2 && (
                    <RaisedButton
                        label={stepIndex === 2 ? 'Finish' : stepIndex === 1 ? 'Pay' : 'Next'}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        primary={true}
                        onClick={this.handleNext}
                        style={{marginRight: 12}}
                    />
                )}
                {step > 0 && (
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onClick={this.handlePrev}
                    />
                )}
            </div>
        );
    }

    render() {
        const {finished, stepIndex} = this.state;

        return (
            <div style={{width: 380, maxHeight: 400, margin: 'auto'}}>
                <Stepper activeStep={stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel>School's Information</StepLabel>
                        <StepContent>
                            <FlatButton
                                icon={<img src={XLS} width="24" />}
                                style={{height: 40}}
                                target="_blank"
                                href="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/students_data.xlsx?alt=media&token=413a183c-b652-404c-92ee-4a4bb398af95"
                                label="Download Sheet" />

                            <FlatButton
                                icon={<img src={PDF} width="24" />}
                                target="_blank"
                                href="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/NOSSQ-II.pdf?alt=media&token=9fcf8fce-7b54-471a-915e-f2d6e90bd467"
                                style={{height: 40}}
                                label="Download Draft" />
                            <div><p>
                                Impute team information in above sheet and submit below. Please verify number of teams.
                                <p>If you face any issue during the registration, Kindly write to any one below:</p>
                                <p><a href="mailto:akash@udghosh.org">akash@udghosh.org</a></p>
                                <p><a href="mailto:rishi@udghosh.org">rishi@udghosh.org</a></p>
                                <p><a href="mailto:abhay@udghosh.org">abhay@udghosh.org</a></p>
                                <br/>
                                Cheers!
                                <br/>
                                Team UDGHOSH
                            </p></div>

                            <TextField
                                value={this.state._s}
                                hintText="School Name"
                                floatingLabelText="School Name"
                                onChange={this.handleSchoolNameChange.bind(this)}
                            />

                            <TextField
                                value={this.state._c}
                                hintText="City"
                                floatingLabelText="City"
                                onChange={this.handleCityChange.bind(this)}
                            />

                            <TextField
                                value={this.state._st}
                                hintText="State"
                                floatingLabelText="State"
                                onChange={this.handleStateChange.bind(this)}
                            />

                            <TextField
                                value={this.state._ph}
                                hintText="School Phone"
                                type="number"
                                errorText={this.state._eph}
                                floatingLabelText="School Phone"
                                onChange={this.handleSchoolPhoneChange.bind(this)}
                            />

                            <TextField
                                value={this.state._pph}
                                hintText="Personal Phone"
                                type="number"
                                errorText={this.state._epph}
                                floatingLabelText="Personal Phone"
                                onChange={this.handlePersonalPhoneChange.bind(this)}
                            />

                            <TextField
                                value={this.state._e}
                                hintText="Email"
                                floatingLabelText="Email"

                                onChange={this.handleEmailChange.bind(this)}
                            />

                            <TextField
                                value={this.state._n}
                                hintText="Number of teams"
                                floatingLabelText="Number of teams"
                                type="number"
                                onChange={this.handleTeamNoChange.bind(this)}
                            />

                            {this.renderStepActions(0)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Review information and submit</StepLabel>
                        <StepContent>
                            <p>
                                <p style={{color: "#878787", marginTop: 12, marginBottom: 0, fontSize: 13}}>School Name</p>
                                <p style={{margin: 0, padding: 0}} >{this.state._s}</p>


                                <p style={{color: "#878787", marginTop: 12, marginBottom: 0, fontSize: 13}}>City</p>
                                <p style={{margin: 0, padding: 0}} >{this.state._c}</p>

                                <p style={{color: "#878787", marginTop: 12, marginBottom: 0, fontSize: 13}}>State</p>
                                <p style={{margin: 0, padding: 0}} >{this.state._st}</p>

                                <p style={{color: "#878787", marginTop: 12, marginBottom: 0, fontSize: 13}}>School Phone</p>
                                <p style={{margin: 0, padding: 0}} >{this.state._ph}</p>

                                <p style={{color: "#878787", marginTop: 12, marginBottom: 0, fontSize: 13}}>School Email</p>
                                <p style={{margin: 0, padding: 0}} >{this.state._e}</p>

                                <p style={{color: "#878787", marginTop: 12, marginBottom: 0, fontSize: 13}}>Number of teams</p>
                                <p style={{margin: 0, padding: 0}} >{this.state._n}</p>

                                <p style={{color: "#878787", marginTop: 12, marginBottom: 0, fontSize: 13}}>Total amount</p>
                                <p style={{margin: 0, padding: 0}} >&#8377; {this.state._cost}</p>

                                <p><input type="file" accept=".xlsx, .xls, .csv" onChange={this.handleFileUpload.bind(this)} /></p>

                            </p>
                            {this.renderStepActions(1)}

                        </StepContent>
                    </Step>
                    {/*<Step>*/}
                        {/*<StepLabel>Get started</StepLabel>*/}
                        {/*<StepContent>*/}
                            {/*<p>*/}
                                {/*Thank you for participating in NOSSQ.*/}
                            {/*</p>*/}
                            {/*{this.renderStepActions(2)}*/}
                        {/*</StepContent>*/}
                    {/*</Step>*/}
                </Stepper>
            </div>
        );
    }
}

export default VerticalLinearStepper;


// WEBPACK FOOTER //
// ./src/Components/temp/Registration/linearStepper.js