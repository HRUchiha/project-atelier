import React from 'react';
import Breakdown from './Breakdown.jsx';
import Recommendations from './Recommendations.jsx';
import Summary from './Summary.jsx';
import rBreakdown from './rBreakdown.css';

class RatingsBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div style={rBreakdown} className="grid-container2 ratingsBreakdown">
        <div className="grid-item breakDown">
          <Breakdown />
        </div>
        <div className="grid-item recommendations">
          <Recommendations />
        </div>
        <div className="grid-item summary">
          <Summary />
        </div>
      </div>
    );
  }
}

export default RatingsBreakdown;