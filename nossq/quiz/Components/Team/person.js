import React from 'react';


export default class Person extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let mailTo = "mailto:" + this.props.email;

        return (
          <div>
              <div className="material-contact animate-in-card">

                  <img className="animate-in-image" src={this.props.im} />

                  <h1 className="animate-in-01">{this.props.name}</h1>

                  <h2 className="animate-in-02">{this.props.designation}</h2>

                  <hr className="animate-in-03" />


                  <p className="animate-in-04" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>{this.props.contact}</p>


                  <span className="actions animate-in-05" >

                {/*<a href={this.props.twitter} target="_blank">Twitter</a>*/}
                <a href={this.props.facebook} target="_blank">Facebook</a>
                <a href={mailTo} target="_blank">Email</a>

            </span>

              </div>
          </div>
        );
    }
}