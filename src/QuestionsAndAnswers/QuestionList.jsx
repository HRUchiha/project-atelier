import React from 'react';
import axios from 'axios';
import Question from './Question.jsx';
import AddQuestion from './AddQuestion.jsx';
import AddAnswer from './AddAnswer.jsx';
import './QuestionList.css';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      questionIndex: 1,
      modalOpen: false,
      answerModalOpen: false,
      search: '',
    };

    this.fetcherQuestions = this.fetcherQuestions.bind(this);
    this.openModal = this.openModal.bind(this);
    this.answerModal = this.answerModal.bind(this);
  }

  componentDidMount() {
    this.fetcherQuestions();
  }

  // REPLACE: once id is received from overview component getDerived state method will be removed...
  static getDerivedStateFromProps(props) {
    return {
      sampleItem: props,
    };
  }

  fetcherQuestions() {
    const { item } = this.props;
    const apiURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/qa/questions';
    const options = {
      url: apiURL,
      method: 'get',
      headers: { authorization: process.env.API_KEY },
      params: {
        product_id: item.id,
        page: 1,
        count: 5,
      },
    };
    axios(options).then((data) => {
      this.setState({ questions: data.data.results });
    }).catch((err) => {
      console.log('error fetching data', err);
    });
  }

  openModal(cb) {
    this.setState({ modalOpen: cb });
  }

  answerModal(cb) {
    this.setState({ answerModalOpen: cb });
  }

  render() {
    const {
      questions, questionIndex, modalOpen, search, answerModalOpen,
    } = this.state;
    const { item } = this.props;
    return (
      <div className="QADiv">
        <div>QUESTIONS AND ANSWERS</div>
        <div className="searchDiv">
          <input
            className="inputs"
            type="text"
            placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
            onChange={(e) => { this.setState({ search: e.target.value }); }}
          />
          <div className="icon">
            Icon
          </div>
        </div>
        <div>
          {
            questions.filter((question) => {
              if (search.length < 3) {
                return question;
              }
              if (search.length >= 3
              && question.question_body.toLowerCase().includes(search.toLowerCase())) {
                return question;
              }
              return null;
            }).map((elem, index) => (
              <div key={elem.question_id} className="QAPair">
                {index <= questionIndex ? <p className="question">{`Q:  ${elem.question_body}`}</p> : null}
                {index <= questionIndex
                  ? <div className="addAnswer"onClick={this.answerModal}>Add Answer</div>
                  : null}
                {index <= questionIndex
                  ? <Question className="answer" details={elem} onClick={this.passClick} />
                  : null}
              </div>
            ))
          }
        </div>
        <button type="button">MORE ANSWERED QUESTIONS</button>
        <button type="button" onClick={this.openModal}>ADD A QUESTION  +</button>
        {modalOpen ? <AddQuestion item={item} modal={this.openModal} /> : null}
        {answerModalOpen ? <AddAnswer modalFun={this.answerModal} /> : null}
      </div>
    );
  }
}

export default QuestionList;