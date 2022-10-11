import React from 'react';
import { arrayOf, shape, func } from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { updateAssertions, updateScore } from '../redux/actions';

const ONE_SEC = 1000;
const NUMBER = 0.5;
const HARD_POINT = 3;

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

    this.shuffleAnswers(questions);
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

  stopTimer = (answer) => {
    const { intervalId } = this.state;
    clearInterval(intervalId);
    this.setState({ isDisable: true });
    this.calculateScore(answer);
  };

  shuffleAnswers = (questions) => {
    const answers = [
      ...questions[0].incorrect_answers,
      questions[0].correct_answer,
    ];
    const randomAnswers = answers.sort(() => Math.random() - NUMBER);
    this.setState({ answers: randomAnswers });
  };

  handleAnswers = (answer) => {
    this.setState({
      answerColor: true,
    });

    this.stopTimer(answer);
  };

  calculateScore = (answer) => {
    const { timer } = this.state;
    const { questions, callUpdateScore, callUpdateAssertions } = this.props;
    const basePoints = 10;
    const { difficulty, correct_answer: correctAnswer } = questions[0];
    let difficultyPoints = 0;

    if (difficulty === 'easy') difficultyPoints = 1;
    if (difficulty === 'medium') difficultyPoints = 2;
    if (difficulty === 'hard') difficultyPoints = HARD_POINT;

    if (answer === correctAnswer && timer > 0) {
      const score = basePoints + (timer * difficultyPoints);
      callUpdateScore(score);
      callUpdateAssertions(1);
    }
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
                      onClick={ () => this.handleAnswers(answer) }
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
                      onClick={ () => this.handleAnswers(answer) }
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
  callUpdateScore: func.isRequired,
  callUpdateAssertions: func.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.player.questions,
});

const mapDispatchToProps = (dispatch) => ({
  callUpdateScore: (payload) => dispatch(updateScore(payload)),
  callUpdateAssertions: (payload) => dispatch(updateAssertions(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
