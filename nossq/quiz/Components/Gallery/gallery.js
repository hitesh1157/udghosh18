import React, {Component} from 'react';
import Gallery from 'react-grid-gallery';
import './component.css';
import './image-gallery.css';
import _AppBar from '../Appbar/appbar';

import loader from '../../Resources/img/loader.svg';
import one from '../../Resources/img/events/thumbs/1.jpg'

class ImageGallery extends Component {

    render() {

       return(
           <div style={{ height: '100vh', overflow: 'scroll' }}>
               <_AppBar color="rgba(255,255,255,1)" handleOpen={this.props.handleOpen} handleClose={this.props.handleClose} />


               <div style={{ margin: '10vh' }} className="gamma-container gamma-loading" id="gamma-container">

                   <ul className="gamma-gallery">

                       <li>
                           <div data-alt="img03" data-description="<h3>Sky high</h3>" data-max-width="1800" data-max-height="1350">
                               <div data-src={one} data-min-width="1300"></div>
                               <div data-src={one} data-min-width="1000"></div>
                               <div data-src={one} data-min-width="700"></div>
                               <div data-src={one} data-min-width="300"></div>
                               <div data-src={one} data-min-width="200"></div>
                               <div data-src={one} data-min-width="140"></div>
                               <div data-src={one}></div>
                               <noscript>
                                   <img src={one} alt="img03" />
                               </noscript>
                           </div>
                       </li>
                       <li>
                           <div data-alt="img04" data-description="<h3>Sky high</h3>" data-max-width="1800" data-max-height="1350">
                               <div data-src={one} data-min-width="1300"></div>
                               <div data-src={one} data-min-width="1000"></div>
                               <div data-src={one} data-min-width="700"></div>
                               <div data-src={one} data-min-width="300"></div>
                               <div data-src={one} data-min-width="200"></div>
                               <div data-src={one} data-min-width="140"></div>
                               <div data-src={one}></div>
                               <noscript>
                                   <img src={one} alt="img03" />
                               </noscript>
                           </div>
                       </li>
                       <li>
                           <div data-alt="img04" data-description="<h3>Sky high</h3>" data-max-width="1800" data-max-height="1350">
                               <div data-src={one} data-min-width="1300"></div>
                               <div data-src={one} data-min-width="1000"></div>
                               <div data-src={one} data-min-width="700"></div>
                               <div data-src={one} data-min-width="300"></div>
                               <div data-src={one} data-min-width="200"></div>
                               <div data-src={one} data-min-width="140"></div>
                               <div data-src={one}></div>
                               <noscript>
                                   <img src={one} alt="img03" />
                               </noscript>
                           </div>
                       </li>
                       <li>
                           <div data-alt="img04" data-description="<h3>Sky high</h3>" data-max-width="1800" data-max-height="1350">
                               <div data-src={one} data-min-width="1300"></div>
                               <div data-src={one} data-min-width="1000"></div>
                               <div data-src={one} data-min-width="700"></div>
                               <div data-src={one} data-min-width="300"></div>
                               <div data-src={one} data-min-width="200"></div>
                               <div data-src={one} data-min-width="140"></div>
                               <div data-src={one}></div>
                               <noscript>
                                   <img src={one} alt="img03" />
                               </noscript>
                           </div>
                       </li>
                       <li>
                           <div data-alt="img04" data-description="<h3>Sky high</h3>" data-max-width="1800" data-max-height="1350">
                               <div data-src={one} data-min-width="1300"></div>
                               <div data-src={one} data-min-width="1000"></div>
                               <div data-src={one} data-min-width="700"></div>
                               <div data-src={one} data-min-width="300"></div>
                               <div data-src={one} data-min-width="200"></div>
                               <div data-src={one} data-min-width="140"></div>
                               <div data-src={one}></div>
                               <noscript>
                                   <img src={one} alt="img03" />
                               </noscript>
                           </div>
                       </li>
                       <li>
                           <div data-alt="img04" data-description="<h3>Sky high</h3>" data-max-width="1800" data-max-height="1350">
                               <div data-src={one} data-min-width="1300"></div>
                               <div data-src={one} data-min-width="1000"></div>
                               <div data-src={one} data-min-width="700"></div>
                               <div data-src={one} data-min-width="300"></div>
                               <div data-src={one} data-min-width="200"></div>
                               <div data-src={one} data-min-width="140"></div>
                               <div data-src={one}></div>
                               <noscript>
                                   <img src={one} alt="img03" />
                               </noscript>
                           </div>
                       </li>
                       <li>
                           <div data-alt="img04" data-description="<h3>Sky high</h3>" data-max-width="1800" data-max-height="1350">
                               <div data-src={one} data-min-width="1300"></div>
                               <div data-src={one} data-min-width="1000"></div>
                               <div data-src={one} data-min-width="700"></div>
                               <div data-src={one} data-min-width="300"></div>
                               <div data-src={one} data-min-width="200"></div>
                               <div data-src={one} data-min-width="140"></div>
                               <div data-src={one}></div>
                               <noscript>
                                   <img src={one} alt="img03" />
                               </noscript>
                           </div>
                       </li>
                       <li>
                           <div data-alt="img04" data-description="<h3>Sky high</h3>" data-max-width="1800" data-max-height="1350">
                               <div data-src={one} data-min-width="1300"></div>
                               <div data-src={one} data-min-width="1000"></div>
                               <div data-src={one} data-min-width="700"></div>
                               <div data-src={one} data-min-width="300"></div>
                               <div data-src={one} data-min-width="200"></div>
                               <div data-src={one} data-min-width="140"></div>
                               <div data-src={one}></div>
                               <noscript>
                                   <img src={one} alt="img03" />
                               </noscript>
                           </div>
                       </li>
                       <li>
                           <div data-alt="img04" data-description="<h3>Sky high</h3>" data-max-width="1800" data-max-height="1350">
                               <div data-src={one} data-min-width="1300"></div>
                               <div data-src={one} data-min-width="1000"></div>
                               <div data-src={one} data-min-width="700"></div>
                               <div data-src={one} data-min-width="300"></div>
                               <div data-src={one} data-min-width="200"></div>
                               <div data-src={one} data-min-width="140"></div>
                               <div data-src={one}></div>
                               <noscript>
                                   <img src={one} alt="img03" />
                               </noscript>
                           </div>
                       </li>
                       <li>
                           <div data-alt="img04" data-description="<h3>Sky high</h3>" data-max-width="1800" data-max-height="1350">
                               <div data-src={one} data-min-width="1300"></div>
                               <div data-src={one} data-min-width="1000"></div>
                               <div data-src={one} data-min-width="700"></div>
                               <div data-src={one} data-min-width="300"></div>
                               <div data-src={one} data-min-width="200"></div>
                               <div data-src={one} data-min-width="140"></div>
                               <div data-src={one}></div>
                               <noscript>
                                   <img src={one} alt="img03" />
                               </noscript>
                           </div>
                       </li>
                       <li>
                           <div data-alt="img04" data-description="<h3>Sky high</h3>" data-max-width="1800" data-max-height="1350">
                               <div data-src={one} data-min-width="1300"></div>
                               <div data-src={one} data-min-width="1000"></div>
                               <div data-src={one} data-min-width="700"></div>
                               <div data-src={one} data-min-width="300"></div>
                               <div data-src={one} data-min-width="200"></div>
                               <div data-src={one} data-min-width="140"></div>
                               <div data-src={one}></div>
                               <noscript>
                                   <img src={one} alt="img03" />
                               </noscript>
                           </div>
                       </li>
                       <li>
                           <div data-alt="img04" data-description="<h3>Sky high</h3>" data-max-width="1800" data-max-height="1350">
                               <div data-src={one} data-min-width="1300"></div>
                               <div data-src={one} data-min-width="1000"></div>
                               <div data-src={one} data-min-width="700"></div>
                               <div data-src={one} data-min-width="300"></div>
                               <div data-src={one} data-min-width="200"></div>
                               <div data-src={one} data-min-width="140"></div>
                               <div data-src={one}></div>
                               <noscript>
                                   <img src={one} alt="img03" />
                               </noscript>
                           </div>
                       </li>
                       <li>
                           <div data-alt="img04" data-description="<h3>Sky high</h3>" data-max-width="1800" data-max-height="1350">
                               <div data-src={one} data-min-width="1300"></div>
                               <div data-src={one} data-min-width="1000"></div>
                               <div data-src={one} data-min-width="700"></div>
                               <div data-src={one} data-min-width="300"></div>
                               <div data-src={one} data-min-width="200"></div>
                               <div data-src={one} data-min-width="140"></div>
                               <div data-src={one}></div>
                               <noscript>
                                   <img src={one} alt="img03" />
                               </noscript>
                           </div>
                       </li>
                       <li>
                           <div data-alt="img04" data-description="<h3>Sky high</h3>" data-max-width="1800" data-max-height="1350">
                               <div data-src={one} data-min-width="1300"></div>
                               <div data-src={one} data-min-width="1000"></div>
                               <div data-src={one} data-min-width="700"></div>
                               <div data-src={one} data-min-width="300"></div>
                               <div data-src={one} data-min-width="200"></div>
                               <div data-src={one} data-min-width="140"></div>
                               <div data-src={one}></div>
                               <noscript>
                                   <img src={one} alt="img03" />
                               </noscript>
                           </div>
                       </li>
                       <li>
                           <div data-alt="img04" data-description="<h3>Sky high</h3>" data-max-width="1800" data-max-height="1350">
                               <div data-src={one} data-min-width="1300"></div>
                               <div data-src={one} data-min-width="1000"></div>
                               <div data-src={one} data-min-width="700"></div>
                               <div data-src={one} data-min-width="300"></div>
                               <div data-src={one} data-min-width="200"></div>
                               <div data-src={one} data-min-width="140"></div>
                               <div data-src={one}></div>
                               <noscript>
                                   <img src={one} alt="img03" />
                               </noscript>
                           </div>
                       </li>
                       <li>
                           <div data-alt="img04" data-description="<h3>Sky high</h3>" data-max-width="1800" data-max-height="1350">
                               <div data-src={one} data-min-width="1300"></div>
                               <div data-src={one} data-min-width="1000"></div>
                               <div data-src={one} data-min-width="700"></div>
                               <div data-src={one} data-min-width="300"></div>
                               <div data-src={one} data-min-width="200"></div>
                               <div data-src={one} data-min-width="140"></div>
                               <div data-src={one}></div>
                               <noscript>
                                   <img src={one} alt="img03" />
                               </noscript>
                           </div>
                       </li>
                       <li>
                           <div data-alt="img04" data-description="<h3>Sky high</h3>" data-max-width="1800" data-max-height="1350">
                               <div data-src={one} data-min-width="1300"></div>
                               <div data-src={one} data-min-width="1000"></div>
                               <div data-src={one} data-min-width="700"></div>
                               <div data-src={one} data-min-width="300"></div>
                               <div data-src={one} data-min-width="200"></div>
                               <div data-src={one} data-min-width="140"></div>
                               <div data-src={one}></div>
                               <noscript>
                                   <img src={one} alt="img03" />
                               </noscript>
                           </div>
                       </li>
                       <li>
                           <div data-alt="img04" data-description="<h3>Sky high</h3>" data-max-width="1800" data-max-height="1350">
                               <div data-src={one} data-min-width="1300"></div>
                               <div data-src={one} data-min-width="1000"></div>
                               <div data-src={one} data-min-width="700"></div>
                               <div data-src={one} data-min-width="300"></div>
                               <div data-src={one} data-min-width="200"></div>
                               <div data-src={one} data-min-width="140"></div>
                               <div data-src={one}></div>
                               <noscript>
                                   <img src={one} alt="img03" />
                               </noscript>
                           </div>
                       </li>
                       <li>
                           <div data-alt="img04" data-description="<h3>Sky high</h3>" data-max-width="1800" data-max-height="1350">
                               <div data-src={one} data-min-width="1300"></div>
                               <div data-src={one} data-min-width="1000"></div>
                               <div data-src={one} data-min-width="700"></div>
                               <div data-src={one} data-min-width="300"></div>
                               <div data-src={one} data-min-width="200"></div>
                               <div data-src={one} data-min-width="140"></div>
                               <div data-src={one}></div>
                               <noscript>
                                   <img src={one} alt="img03" />
                               </noscript>
                           </div>
                       </li>
                       
                   </ul>

                   <div className="gamma-overlay"></div>

                   {/* <div id="loadmore" className="loadmore">Example for loading more items...</div> */}

               </div>
        </div>
       );
    }
}

export default ImageGallery;


// WEBPACK FOOTER //
// ./src/Components/Gallery/gallery.js


// WEBPACK FOOTER //
// ./src/Components/Gallery/gallery.js