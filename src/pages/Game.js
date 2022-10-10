import React from 'react';
import { arrayOf, shape } from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends React.Component {
  state = {
    answerColor: false,
    isDisable: false,
    timer: 30,
  };

  componentDidMount() {
    setInterval((
    ) => {
      this.setState(prevState => ({
        timer: prevState.timer - 1,
      }),
        () => {
          this.stopTimer()
        }
      )
    }, 1000)
  }

  stopTimer = () => {
    setTimeout(() => {
      this.setState({
        isDisable: true,
      })
    }, 30000)
  }


  shuffleAnswers = (question) => {
    const NUMBER = 0.5;
    const answers = [...question.incorrect_answers, question.correct_answer];
    return answers.sort(() => Math.random() - NUMBER);
  };

  handleAnswers = () => {
    this.setState({
      answerColor: true,
    });
  };

  render() {
    const { questions } = this.props;
    const { answerColor, timer } = this.state;
    console.log(questions);
    return (
      <>
        <Header />
        <div>
          {timer}
        </div>
        {questions.length > 0 && (
          <>
            <p
              data-testid="question-category"
            >
              {questions[0].category}
            </p>
            <br />
            <p
              data-testid="question-text"
            >
              {questions[0].question}
            </p>
            <br />
            <div
              data-testid="answer-options"
            >
              {this.shuffleAnswers(questions[0])
                .map((answer, index) => ((answer === questions[0].correct_answer)
                  ? (
                    <button
                      key={answer}
                      data-testid="correct-answer"
                      type="button"
                      className={answerColor ? 'greenColor' : ''}
                      onClick={this.handleAnswers}

                    >
                      {answer}
                    </button>
                  ) : (
                    <button
                      key={answer}
                      data-testid={`wrong-answer-${index}`}
                      type="button"
                      className={answerColor ? 'redColor' : ''}
                      onClick={this.handleAnswers}

                    >
                      {answer}
                    </button>
                  )

                ))}
            </div>

          </>
        )}
      </>
    );
  }
}

Game.propTypes = {
  questions: arrayOf(shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.game.questions,
});

export default connect(mapStateToProps)(Game);
