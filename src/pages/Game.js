import React from 'react';
import { arrayOf, shape } from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

const ONE_SEC = 1000;

class Game extends React.Component {
  state = {
    answerColor: false,
    isDisable: false,
    timer: 30,
    answers: [],
    intervalId: 0,
  };

  componentDidMount() {
    const { questions } = this.props;

    this.shuffleAnswers();
    if (questions.length > 0) this.startTimer();
  }

  startTimer = () => {
    const intervalId = setInterval(() => {
      const { timer } = this.state;

      this.setState(
        (prevState) => ({
          timer: prevState.timer - 1,
        }),
        () => {
          if (timer === 1) this.stopTimer(intervalId);
        },
      );
    }, ONE_SEC);

    this.setState({ intervalId });
  };

  stopTimer = () => {
    const { intervalId } = this.state;
    clearInterval(intervalId);
    this.setState({ isDisable: true });
  };

  shuffleAnswers = () => {
    const { questions } = this.props;
    const NUMBER = 0.5;
    const answers = [
      ...questions[0].incorrect_answers,
      questions[0].correct_answer,
    ];
    const randomAnswers = answers.sort(() => Math.random() - NUMBER);
    this.setState({ answers: randomAnswers });
  };

  handleAnswers = () => {
    this.setState({
      answerColor: true,
    });

    this.stopTimer();
  };

  render() {
    const { questions } = this.props;
    const { answerColor, timer, isDisable, answers } = this.state;

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
              {answers
                .map((answer, index) => ((answer === questions[0].correct_answer)
                  ? (
                    <button
                      key={ answer }
                      data-testid="correct-answer"
                      type="button"
                      className={ answerColor ? 'greenColor' : '' }
                      onClick={ this.handleAnswers }
                      disabled={ isDisable }
                    >
                      {answer}
                    </button>
                  ) : (
                    <button
                      key={ answer }
                      data-testid={ `wrong-answer-${index}` }
                      type="button"
                      className={ answerColor ? 'redColor' : '' }
                      onClick={ this.handleAnswers }
                      disabled={ isDisable }
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
  questions: state.player.questions,
});

export default connect(mapStateToProps)(Game);
