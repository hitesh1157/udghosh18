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
import fireDB from '../../../../services/fireDB';
import {Dialog, DropDownMenu, MenuItem} from "material-ui";
import Townscipt from "../../Townscript/Townscipt";

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
            _s: "",
            _p1: "",
            _p2: "",
            _c: "",
            _st: "",
            _ph: "",
            _e: "",
            value: 0,
            _cost: 0,
            rABS: typeof FileReader !== 'undefined' && FileReader.prototype && FileReader.prototype.readAsBinaryString,
            useWorker: typeof Worker !== 'undefined',
            showError: false,
            _e_Error: false
        };

    }

    handleDropdownChange = (event, index, value) => this.setState({value});

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

    handleP1Change = (event, value) => {
        this.setState({
           _p1: value
        });
        console.log(this.state._p1);
    };

    handleP2Change = (event, value) => {
        this.setState({
            _p2: value
        });
        console.log(this.state._p2);
    };

    handleSchoolNameChange = (event, value) => {
        this.setState({
            _s: value
        });
    };

    handlePhoneChange = (event, value) => {

        this.setState({
           _ph: value
        });
    };

    handleEmailChange = (event, value) => {

        this.setState({
            _e: value,
        });
    };

    handleNext = () => {
        const {stepIndex} = this.state;

        if(stepIndex === 0){

            if(this.state._s !== "" && this.state._e !== "" &&
                this.state._ph !== "" && this.state._c !== "" &&
                this.state._p1 !== "" && this.state._st !== "" &&
                this.state.value !== 0){

              this.state._cost = 300;

                this.setState({
                    stepIndex: stepIndex + 1,
                    finished: stepIndex >= 2,
                });

            } else {
                alert("Participant 2 is not mandatory. All other details are mandatory.");
            }
        } else if(stepIndex === 1) {
            console.log("uploading...");

            this.handleFileUpload();

            this.handlePayment();
        }
    };

    handlePayment = () => {

        alert("Make payment to complete registration.");
        window.open("https://www.townscript.com/e/udghosh-national-open-school-sports-quiz-134402", "_blank");
    };

    handleClose = () => {
        this.setState({open: false});
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

        console.log(json.toString());
        console.log(json.length);

        if(json.length-1 === this.state._n){
            console.log("Success");
            let dataRef = fireDB.ref('schools/' + this.state._s);
            dataRef.set({
                email: this.state._e,
                contact_no: this.state._ph,
                personal_contact_no: this.state._pph
            });

            for(let i=1; i<json.length; i++){
                let row = json[i];
                let childRef;
                if(row[3] === 'J' || row[3] === 'j'){
                    childRef = dataRef.child('junior');
                } else {
                    childRef = dataRef.child('senior');
                }

                childRef.push({
                    teamNo: row[0],
                    student_1: row[1],
                    student_2: row[2],
                    type: row[3]
                }, (result) => {

                    console.log("Adding success");
                    alert("Registration is successful.");
                });
            }

        } else {
            alert("Team numbers mismatch");
        }

    };


    handleFileUpload = () => {

        let dataRef = fireDB.ref('individuals/');
        let type = null;
        if(this.state.value === 1){
            type = "J"
        } else if (this.state.value === 2){
            type = "S";
        }
        dataRef.push({
            email: this.state._e,
            contact_no: this.state._ph,
            participant_1: this.state._p1,
            participant_2: this.state._p2,
            school_name: this.state._s,
            city: this.state._c,
            state: this.state._st,
            type: type

        }, () => {
            console.log("Adding success");
            alert("Registration is successful.");
            //window.location.reload(false);
            this.setState({open: true});
        });
    };

    renderStepActions(step) {
        const {stepIndex} = this.state;

        return (
            <div style={{margin: '12px 0'}}>
                {step !== 2 && (
                    <RaisedButton
                        label={stepIndex === 2 ? 'Finish' : stepIndex === 1 ? 'Submit' : 'Next'}
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

        const styles = {
              customWidth: {
                width: 200,
              },
            };

        let participants = null;
        if(this.state._p2 === ""){
            participants = <div>
                <p><strong>Participant</strong></p>
                <p>{this.state._p1}</p>
            </div>;
        } else {
            participants = <div>
                <p><strong>Participant 1</strong></p>
                {this.state._p1}
                <p><strong>Participant 2</strong></p>
                {this.state._p2}
            </div>;
        }

        return (
            <div>
                <Dialog
                    title="Make Payment"
                    //actions={actions}
                    modal={false}
                    open={this.state.open}
                    contentStyle={{width: "90%", maxWidth: "none"}}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >

                    <Townscipt/>

                </Dialog>
                <div style={{width: 380, maxHeight: 400, margin: 'auto'}}>
                    <Stepper activeStep={stepIndex} orientation="vertical">
                        <Step>
                            <StepLabel>Team Details</StepLabel>
                            <StepContent>
                                <div><p>
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
                                    value={this.state._p1}
                                    hintText="Name"
                                    floatingLabelText="Participant 1"
                                    onChange={this.handleP1Change.bind(this)}
                                />

                                <TextField
                                    value={this.state._p2}
                                    hintText="Name"
                                    floatingLabelText="Participant 2"
                                    onChange={this.handleP2Change.bind(this)}
                                />

                                <TextField
                                    value={this.state._s}
                                    hintText="School/College Name"
                                    floatingLabelText="School/College Name"
                                    onChange={this.handleSchoolNameChange.bind(this)}
                                />

                                <DropDownMenu value={this.state.value}
                                              autoWidth={false}
                                              style={{width: 280, padding: 0, margin: 0}}
                                              onChange={this.handleDropdownChange.bind(this)}>
                                    <MenuItem value={0} primaryText="Select a category" />
                                    <MenuItem value={1} primaryText="Junior (class 6th to 8th)" />
                                    <MenuItem value={2} primaryText="Senior (class 9th and above)" />

                                </DropDownMenu>

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
                                    hintText="Phone"
                                    type="number"
                                    floatingLabelText="Phone number"
                                    onChange={this.handlePhoneChange.bind(this)}
                                />

                                <TextField
                                    value={this.state._e}
                                    hintText="Email"
                                    floatingLabelText="Email"

                                    onChange={this.handleEmailChange.bind(this)}
                                />

                                {this.renderStepActions(0)}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>Review and Submit</StepLabel>
                            <StepContent>
                                <p>

                                    {participants}

                                    <p><strong>Phone</strong></p>
                                    <p>{this.state._ph}</p>

                                    <p><strong>Email</strong></p>
                                    <p>{this.state._e}</p>

                                    <p><strong>City</strong></p>
                                    <p>{this.state._c}</p>

                                    <p><strong>State</strong></p>
                                    <p>{this.state._st}</p>

                                    <p><strong>Total amount</strong></p>
                                    <p>&#8377; {this.state._cost}</p>

                                </p>
                                {this.renderStepActions(1)}

                            </StepContent>
                        </Step>

                    </Stepper>

                </div>
            </div>
        );
    }
}

export default VerticalLinearStepper;


// WEBPACK FOOTER //
// ./src/Components/temp/i/Registration/linearStepper.js