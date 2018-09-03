import React, {Component} from 'react';

import './eventscard.css';

class EventsCard extends Component {

    constructor(props){
        super(props);
    }

    render() {

        let bgStyles = {

            backgroundImage: "url('" + this.props.bg + "')",
            backgroundPosition: 'cover',
            backgroundRepeat:'no-repeat'
        };

        return (


            <div className="row example-2 card">
                <div className="wrapper">
                    <div  className="__bg" style={bgStyles}  />
                    <div className="header">
                        <div className="date">

                        </div>
                        <ul className="menu-content">
                            <li>
                                <a href={this.props.rules_href}>Rules<span>PDF</span></a>
                            </li>
                            {/* <li><a href="#">Schedule<span>PDF</span></a></li> */}
                            <li><a href={this.props.res_href}>Results<span>NA</span></a></li>
                        </ul>
                    </div>
                    <div className="data">
                        <div className="content">
                            <span className="author"></span>
                            <h1 className="title"><a href="#">{this.props.title}</a></h1>
                            <p className="text">
                                {this.props.content1}
                                <br/>
                                {this.props.content2}
                                <br/>
                                {this.props.content3}
                            </p>
                            <a href={this.props.sch} className="button">Get Schedule</a>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

}

export default EventsCard;


// WEBPACK FOOTER //
// ./src/Components/Events/EventsCard/eventscard.js


// WEBPACK FOOTER //
// ./src/Components/Events/EventsCard/eventscard.js