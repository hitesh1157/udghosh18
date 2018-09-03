import React from 'react';
import VerticalLinearStepper from './linearStepper';
import NossqSmall from '../../../Resources/img/nossq_small.png';
import './registration.css';


class Registration extends React.Component {

    render(){

        return(

            <div>
                <div style={{ marginLeft: "12vh", marginTop: "4vh", float: "left"}}>
                    <iframe
                        frameBorder={0}
                        style={{height: "85vh", width: 700}}
                        src="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/NOSSQ-II.pdf?alt=media&token=9fcf8fce-7b54-471a-915e-f2d6e90bd467"


                    />
                </div>

                {/*<img src={NossqSmall} style={{ marginLeft: "15vh", marginTop: "4vh"}} />*/}

                <div style={{ marginRight: "6vh", marginTop: "4vh", float: "right"}}>
                    <h1>SCHOOL REGISTRATION</h1>
                    <VerticalLinearStepper />
                </div>
            </div>
        );
    }
}

export default Registration;


// WEBPACK FOOTER //
// ./src/Components/temp/Registration/registration.js