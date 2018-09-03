import React from 'react';
import _AppBar from '../Appbar/appbar';
import Person from './person';
import './team.css';

export default class Team extends React.Component {

    render() {
        return (<div className="sponsor" style={{overflowY: 'auto' }} >
            <_AppBar color="#fff" handleOpen={this.props.handleOpen} handleClose={this.props.handleClose} />

            <div className="l-wrap-t" >
              <div className="three-col-grid">
                <div className="grid-item-t">
                  <Person name="Harshul Lodha" im="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/team%2Fharshul.jpg?alt=media&token=fee50218-b063-43f1-8803-0d58cf026524" designation="Festival Coordinator" contact="+91-9044127380" email="harshul@udghosh.org" facebook="https://www.facebook.com/harshul.lodha" />
                </div>
                <div className="grid-item-t">
                  <Person name="Prashant Kumar" im="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/team%2Fps.jpg?alt=media&token=25800bd3-c1f8-4381-9643-e13d21d09be2" designation="Festival Coordinator" contact="+91-8400071992" email="prashant@udghosh.org" facebook="https://www.facebook.com/01prashantpk10" />
                </div>
                <div className="grid-item-t">
                  <Person name="Priyadarshini Ag." im="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/team%2Fpag.jpg?alt=media&token=fbcd6121-137d-46fb-a1cc-f601e6145e29" designation="Head, Marketing" contact="+91-7388713716" email="priya@udghosh.org" facebook="https://www.facebook.com/priyadarshini.agrawal.54" />
                </div>
              </div>

              <div className="three-col-grid-2">
                <div className="grid-item-t">
                  <Person name="Shubham Dhaneria" im="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/team%2Fsd.jpg?alt=media&token=132c8999-d19e-4636-959c-5d2fd38e5a72" designation="Head, Events" contact="+91-9151636064" email="shubham@udghosh.org" facebook="https://www.facebook.com/shubham.dhaneria.5" />
                </div>
                <div className="grid-item-t">
                  <Person name="Hitesh Kumar" im="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/team%2FScreen%20Shot%202018-05-11%20at%209.29.33%20AM.png?alt=media&token=a3417327-9066-40ad-8d00-4a60b5ee31af" designation="Head, Web" contact="+91-7081130173" email="hitesh@udghosh.org" facebook="https://www.facebook.com/hiteshkm7" />
                </div>
                <div className="grid-item-t">
                  <Person name="Rishi Raj" im="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/team%2Frishi.jpg?alt=media&token=0c5875ca-5bfe-4473-a0be-0c25f43cea33" designation="Head, Show Management" contact="+91-7054564304" email="rishi@udghosh.org" facebook="https://www.facebook.com/RishirajSavarn" />
                </div>
              </div>

              <div className="three-col-grid-3">
                <div className="grid-item-t">
                  <Person name="Akashjyoti Das" im="https://firebasestorage.googleapis.com/v0/b/udghosh18.appspot.com/o/team%2Fad.jpg?alt=media&token=3e20d770-4e50-465e-9b01-e2ed5a4467d0" designation="Head, Media & Publicity" contact="+91-8309041489" email="akash@udghosh.org" facebook="https://www.facebook.com/karls.raen" />
                </div>
                <div className="grid-item-t">
                  <Person name="Abhay Kumar Mishra" designation="Head, Public Relations" contact="+91-9451679020" email="abhay@udghosh.org" facebook="https://www.facebook.com/profile.php?id=100012923611597" />
                </div>
                <div className="grid-item-t">
                  <Person name="Saubhagya Soni" designation="Head, Marketing" contact="+91-7275546287" email="ssoni@iitk.ac.in" facebook="https://www.facebook.com/saubhagya.soni?fref=gs&dti=143889076247130&hc_location=group_dialog" />
                </div>
              </div>

              <div className="three-col-max">
                <div className="grid-item-t">
                        <Person name="Komal Raj" im="" designation="Head, Public Relations" contact="+91-7388712251" email="komal@udghosh.org" facebook="https://www.facebook.com/1505komal?fref=gs&dti=143889076247130&hc_location=group_dialog" />
                </div>
                    <div className="grid-item-t">
                        
                    </div>
                    <div className="grid-item-t">
                        
                    </div>
                
              </div>
            </div>
    </div>);
    }
}