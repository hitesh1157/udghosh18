import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {FlatButton} from "material-ui";
import {Link} from "react-router-dom";

function Result(props) {

  return (
    <ReactCSSTransitionGroup
      className="container result"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div>
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <h2>Your answers have been submitted successfully. We will inform you if you are short listed for the Second stage. You may now exit.</h2>
        </div>

        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <Link to="/">
            <FlatButton
              label="Save and Exit"
            />
          </Link>
        </div>

      </div>
    </ReactCSSTransitionGroup>
  );

}

Result.propTypes = {
  quizResult: React.PropTypes.string.isRequired,
};

export default Result;



// WEBPACK FOOTER //
// ./src/Components/temp/Quiz/components/Result.js