import React from 'react';
import axios from 'axios';
import AddAnswer from './AddAnswer.jsx';
import './Question.css';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 0,
      showAll: false,
      answerModalOpen: false,
      questionVotes: 0,
      answerVotes: 0,
    };
    this.toggleAnswers = this.toggleAnswers.bind(this);
    this.addOrSubtract = this.addOrSubtract.bind(this);
    this.answerModal = this.answerModal.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  handleVote() {
    const { questionVotes } = this.state;
    const { details, fetcher } = this.props;
    this.setState({ questionVotes: questionVotes + 1 });
    const apiURL = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/qa/questions/${details.question_id}/helpful`;
    const options = {
      url: apiURL,
      method: 'put',
      headers: { authorization: process.env.API_KEY },
    };
    axios(options).then(() => {
      console.log('PUT Req successful');
    }).catch((err) => {
      console.log('error on PUT req', err);
    }).then(() => {
      fetcher();
    });
  }

  toggleAnswers() {
    const { showAll } = this.state;
    this.setState({ showAll: !showAll });
    this.addOrSubtract();
  }

  answerModal(cb) {
    this.setState({ answerModalOpen: cb });
  }

  addOrSubtract() {
    const { display } = this.state;
    if (display === 0) {
      this.setState({ display: 20 });
    } if (display === 20) {
      this.setState({ display: 0 });
    }
  }

  render() {
    const {
      details, item, fetcher,
    } = this.props;
    const {
      display, answerModalOpen, answerVotes,
    } = this.state;
    const answerObj = Object.values(details.answers);
    return (
      <div>
        <div className="smallQ">
          Question Helpful?
          <div role="button" tabIndex={0} onKeyPress={this.handleEnter} onClick={this.handleVote} id="yes">{`Yes (${details.question_helpfulness})`}</div>
        </div>
        <div className="answerSmallDiv">
          Answer Helpful?
          <div role="button" tabIndex={0} onKeyPress={this.handleEnter} onClick={() => { this.setState({ answerVotes: answerVotes + 1 }); }} className="yes">{`Yes (${answerVotes})`}</div>
          <div role="button" tabIndex={0} className="addAnswer" onClick={this.answerModal} onKeyPress={(e) => { this.handleKeyPress(e); }}>Add Answer</div>
          <div role="button" tabIndex={0} onKeyPress={this.handleEnter} onClick={this.toggleAnswers} className="moreAnswers">More Answers</div>
        </div>
        {answerModalOpen
          ? (
            <AddAnswer
              fetcher={fetcher}
              item={item}
              details={details}
              modalFun={this.answerModal}
            />
          ) : null}
        {answerObj.map((answer, index) => (
          <div className="answer" key={answer.id}>
            {index <= display ? `A:  ${answer.body} ` : null}
            <div className="username">
              {index <= display ? `by User: ${answer.answerer_name}, ${answer.date}` : null}
            </div>
            <div className="pictures">
              {index <= display ? `${answer.photos}` : null}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Question;
