import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from "material-ui/FlatButton";
import _AppBar from '../Appbar/appbar';
import _AppBar_f from '../Appbar/footer'
import CA5 from '../../Resources/img/camain.jpg';
import Carousel from "nuka-carousel";
import IITK from '../../Resources/img/image.png';
import Play from '../../Resources/icons/play.png'
import AWU from "../../Resources/img/associatewithus.jpg";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

import './base.css';
import './slider.css';

import one from '../../Resources/img/slider/1.png';
import two from '../../Resources/img/slider/2.png';
import three from "../../Resources/img/slider/3.jpg";
import four from "../../Resources/img/slider/4.jpg";
import five from "../../Resources/img/slider/5.jpg";

import favicon from '../../Resources/img/favicon.png';

import Udghosh from '../../Resources/img/ud-new.d72497bf.png';
import UdghoshInverted from "../../Resources/img/ud-new.d72497bf_inverted.png";
import Nossq from '../../Resources/img/nossq.png';
import './homepage.css';
import {Dialog} from "material-ui";

class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = { showPopup: false };
    }

    componentDidMount() {

      // setTimeout(() => {
      //   this.setState({ showPopup: false });
      // }, 1700);
    }

  
    handleCloseClip = () => {
        this.setState({
            showPopup: false
        });
    };

    render() {

      var oneDay = 24 * 60 * 60 * 1000;
      var firstDate = new Date("Oct 4, 2018");
      var secondDate = new Date();
      var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));

        const customContentStyle = {
            width: '90%',
            maxWidth: 'none',
            height: '100%',
            maxHeight: 'none'
        };

        const style = {
            margin: 12,

        };

        const quizStyle = {
          margin: 48
        };

        return (
          <div>
            <_AppBar color="rgba(255,255,255,1)" handleOpen={this.props.handleOpen} handleClose={this.props.handleClose} />
            {/* <object data="myfile.pdf" type="application/pdf" width="100%" height="100%">
              <p>Alternative text - include a link <a href="myfile.pdf">to the PDF!</a></p>
            </object> */}
          <body className="demo-1">
            <svg className="hidden">
              <symbol id="icon-arrow" viewBox="0 0 24 24">
                <title>arrow</title>
                <polygon points="6.3,12.8 20.9,12.8 20.9,11.2 6.3,11.2 10.2,7.2 9,6 3.1,12 9,18 10.2,16.8 " />
              </symbol>
              <symbol id="icon-drop" viewBox="0 0 24 24">
                <title>drop</title>
                <path d="M12,21c-3.6,0-6.6-3-6.6-6.6C5.4,11,10.8,4,11.4,3.2C11.6,3.1,11.8,3,12,3s0.4,0.1,0.6,0.3c0.6,0.8,6.1,7.8,6.1,11.2C18.6,18.1,15.6,21,12,21zM12,4.8c-1.8,2.4-5.2,7.4-5.2,9.6c0,2.9,2.3,5.2,5.2,5.2s5.2-2.3,5.2-5.2C17.2,12.2,13.8,7.3,12,4.8z" /><path d="M12,18.2c-0.4,0-0.7-0.3-0.7-0.7s0.3-0.7,0.7-0.7c1.3,0,2.4-1.1,2.4-2.4c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.7,0.3,0.7,0.7C15.8,16.5,14.1,18.2,12,18.2z" />
              </symbol>
              <symbol id="icon-github" viewBox="0 0 32.6 31.8">
                <title>github</title>
                <path d="M16.3,0C7.3,0,0,7.3,0,16.3c0,7.2,4.7,13.3,11.1,15.5c0.8,0.1,1.1-0.4,1.1-0.8c0-0.4,0-1.4,0-2.8c-4.5,1-5.5-2.2-5.5-2.2c-0.7-1.9-1.8-2.4-1.8-2.4c-1.5-1,0.1-1,0.1-1c1.6,0.1,2.5,1.7,2.5,1.7c1.5,2.5,3.8,1.8,4.7,1.4c0.1-1.1,0.6-1.8,1-2.2c-3.6-0.4-7.4-1.8-7.4-8.1c0-1.8,0.6-3.2,1.7-4.4C7.4,10.7,6.8,9,7.7,6.8c0,0,1.4-0.4,4.5,1.7c1.3-0.4,2.7-0.5,4.1-0.5c1.4,0,2.8,0.2,4.1,0.5c3.1-2.1,4.5-1.7,4.5-1.7c0.9,2.2,0.3,3.9,0.2,4.3c1,1.1,1.7,2.6,1.7,4.4c0,6.3-3.8,7.6-7.4,8c0.6,0.5,1.1,1.5,1.1,3c0,2.2,0,3.9,0,4.5c0,0.4,0.3,0.9,1.1,0.8c6.5-2.2,11.1-8.3,11.1-15.5C32.6,7.3,25.3,0,16.3,0z" />
              </symbol>
            </svg>
            <main>
              <div className="content content--fixed">
                <header className="codrops-header">
                  {/* <div className="codrops-links">
                      <a className="codrops-icon codrops-icon--prev" href="https://tympanus.net/Development/ScrollingLettersAnimation/" title="Previous Demo"><svg dangerouslySetInnerHTML={{ __html: '< use xlink: href = "#icon-arrow" />' }} className="icon icon--arrow"></svg></a>
                  <a className="codrops-icon codrops-icon--drop" href="https://tympanus.net/codrops/?p=33985" title="Back to the article"><svg className="icon icon--drop" dangerouslySetInnerHTML={{ __html: '< use xlink: href="#icon-drop" />' }} ></svg></a>
              </div> */}
              <h1 className="codrops-header__title">{/* Pieces Slider */}</h1>
				</header>
            
			</div >
        <div className="content">
          
				<div className="pieces-slider">
            
					<div className="pieces-slider__slide">
              <img className="pieces-slider__image" src={one} alt=""/>
                <h2 className="pieces-slider__text"></h2>
                      <h2 className="pieces-slider__text__two">Watch Now</h2>
					</div>
              <div className="pieces-slider__slide">
                <img className="pieces-slider__image" src={two} alt=""/>
                      <h2 className="pieces-slider__text">{diffDays} days to go</h2>
                      <h2 className="pieces-slider__text__two"></h2>
					</div>
                <div className="pieces-slider__slide">
                  <img className="pieces-slider__image" src={three} alt=""/>
                    <h2 className="pieces-slider__text">Associate with us</h2>
                      <h2 className="pieces-slider__text__two"></h2>
					</div>
                  <div className="pieces-slider__slide">
                    <img className="pieces-slider__image" src={four} alt=""/>
                      <h2 className="pieces-slider__text">The Team</h2>
                      <h2 className="pieces-slider__text__two"></h2>
					</div>
                  
                      <div className="pieces-slider__slide" >
                        <img className="pieces-slider__image" src={five} alt="" />
                        <h2 className="pieces-slider__text">Become a Campus Ambassador</h2>
                      <h2 className="pieces-slider__text__two">Stand out from the crowd</h2>
                      </div>
                      
                
					<canvas ref="__canvas" className="pieces-slider__canvas"></canvas>
                      
					<button className="pieces-slider__button pieces-slider__button--prev">prev</button>
                      <button className="pieces-slider__button pieces-slider__button--next">next</button>
                    </div>
                  </div>
		</main>
          </body>

            <div class="md-modal md-effect-18" id="modal-18">
              <div class="md-content">
                <h3>Modal Dialog</h3>
                <div>
                  <p>This is a modal window. You can do the following things with it:</p>
                  <ul>
                    <li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
                    <li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
                    <li><strong>Close:</strong> click on the button below to close the modal.</li>
                  </ul>
                  <button class="md-close">Close me!</button>
                </div>
              </div>
            </div>
            
          </div>
        );
    }
}

export default HomePage;