import React from 'react';


class Townscipt extends React.Component {

    constructor(props){
        super(props);
    }

    render(){

        return(

            <div>
              <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <p>(Only for registered teams, NOT through school/institution)</p>
              </div>
              <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: 30}}>
                <iframe src="https://www.townscript.com/widget/udghosh-national-open-school-sports-quiz-134402" frameBorder={0} height="600" width="80%"></iframe>
              </div>
            </div>
        );
    }


}

export default Townscipt;


// WEBPACK FOOTER //
// ./src/Components/temp/Townscript/Townscipt.js