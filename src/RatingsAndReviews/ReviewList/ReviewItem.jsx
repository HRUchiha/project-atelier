import React from 'react';
import Item from './Item.css';

class ReviewListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.trueChecker = this.trueChecker.bind(this);
    this.respChecker = this.respChecker.bind(this);
  }

  componentDidMount() {
    const { reco } = this.props;
    if (reco) {
      console.log(reco);
    }
  }

  trueChecker() {
    const { reco } = this.props;
    if (reco) {
      return 'recommended: true';
    }
    return reco;
  }

  respChecker() {
    const { resp } = this.props;
    if (resp) {
      return resp;
    }
    return resp;
  }

  render() {
    const {
      rating, name, date, summary, body, help,
    } = this.props;
    return (
      <div className="grid-container4" style={Item}>
        <h3 className="grid-item-1">
          Star Ratings:
          {rating}
        </h3>
        <div className="grid-item-2">
          <h5>
            {name}
            ,
            (
            {date}
            )
          </h5>
        </div>
        <h3 className="grid-item-3">{summary}</h3>
        <p className="grid-item-4">{body}</p>
        <h5 className="grid-item-5">{this.respChecker()}</h5>
        <h5 className="grid-item-6">{this.trueChecker()}</h5>
        <h5 className="grid-item-7">
          Helpful? Yes: (
          {help}
          ) | Report
        </h5>
      </div>
    );
  }
}

export default ReviewListItem;
