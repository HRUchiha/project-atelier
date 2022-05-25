import React from 'react';
import star from './img/star.svg';
import starFill from './img/star-fill.svg';
// import Item from '../Item.css';
import Star from './Star.css';

class StarRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { rating } = this.props;

    return (
      <div>
        <div className="offStars" style={Star}>
          <img className="offStar" src={star} alt="" />
          <img className="offStar" src={star} alt="" />
          <img className="offStar" src={star} alt="" />
          <img className="offStar" src={star} alt="" />
          <img className="offStar" src={star} alt="" />
        </div>
        <div className="onStars" style={Star}>
          {[...Array(rating)].map((star) => (
            <img className="onStar" src={starFill} alt="" />
          ))}
        </div>
      </div>
    );
  }
}
export default StarRating;