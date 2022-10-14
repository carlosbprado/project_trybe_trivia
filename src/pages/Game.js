import React from 'react';
import { arrayOf, shape, func, string, number } from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { updateAssertions, updateScore } from '../redux/actions';

const de = require('he');

const ONE_SEC = 1000;
const NUMBER = 0.5;
const HARD_POINT = 3;
const MAX_QUESTION_POSITION = 5;

class Game extends React.Component {
  state = {
    answerColor: false,
    isDisable: false,
    timer: 30,
    answers: [],
    intervalId: 0,
    questionPosition: 0,
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
          if (timer === 1) this.handleAnswers();
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
    const { questionPosition } = this.state;

    const answers = [
      ...questions[questionPosition].incorrect_answers,
      questions[questionPosition].correct_answer,
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
    const { timer, questionPosition } = this.state;
    const { questions, callUpdateScore, callUpdateAssertions } = this.props;
    const basePoints = 10;
    const { difficulty, correct_answer: correctAnswer } = questions[questionPosition];
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

  handleNextQuestion = () => {
    const { history } = this.props;

    this.setState(
      ({ questionPosition }) => ({

        questionPosition: questionPosition <= MAX_QUESTION_POSITION
          ? questionPosition + 1 : questionPosition,
        answerColor: false,
        isDisable: false,
        timer: 30,
      }),
      () => {
        const { questions } = this.props;
        const { questionPosition } = this.state;

        if (questionPosition === MAX_QUESTION_POSITION) {
          this.saveToLocalStorage();
          history.push('/feedback');
        } else {
          this.shuffleAnswers(questions);
          this.startTimer();
        }
      },
    );
  };

  saveToLocalStorage = () => {
    const { name, score, profilePicture } = this.props;
    const localRanking = JSON.parse(localStorage.getItem('ranking'));

    const newRankingObj = {
      name,
      score,
      picture: profilePicture,
    };

    if (localRanking) {
      localStorage.setItem(
        'ranking',
        JSON.stringify([...localRanking, newRankingObj]),
      );
    } else {
      localStorage.setItem(
        'ranking',
        JSON.stringify([newRankingObj]),
      );
    }
  };

  render() {
    const { questions } = this.props;
    const { answerColor, timer, isDisable, answers, questionPosition } = this.state;

    return (
      <div className="mb-10">
        <Header />

        <div className="text-rose-500 font-bold text-xl my-5 uppercase">
          <span>Time left:</span>
          <span className="ml-2">{timer}</span>
        </div>

        {questions.length > 0 && questionPosition < MAX_QUESTION_POSITION && (
          <div>
            <h2
              data-testid="question-category"
              className="font-bold"
            >
              {de.decode(questions[questionPosition].category)}
            </h2>

            <p data-testid="question-text" className="py-4 mb-10 text-xl">
              {de.decode(questions[questionPosition].question)}
            </p>

            <div
              data-testid="answer-options"
              className="flex gap-3 flex-col mb-4"
            >
              {answers
                .map((answer, index) => (
                  (answer === de.decode(questions[questionPosition].correct_answer))
                    ? (
                      <button
                        key={ answer }
                        data-testid="correct-answer"
                        type="button"
                        className={ `${answerColor
                          ? 'greenColor bg-green-600 text-slate-100'
                          : 'bg-slate-100 text-slate-900'} 
                          p-4 
                        font-bold` }
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
                        className={ `${answerColor
                          ? 'redColor bg-rose-700 text-slate-100'
                          : 'bg-slate-100 text-slate-900'} 
                          p-4 
                        font-bold` }
                        onClick={ () => this.handleAnswers(answer) }
                        disabled={ isDisable }
                      >
                        {answer}
                      </button>
                    )

                ))}
            </div>

          </div>
        )}

        {
          isDisable && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.handleNextQuestion }
              className="p-4 bg-indigo-400 w-full font-bold uppercase"
            >
              Next

            </button>
          )
        }
      </div>
    );
  }
}

Game.propTypes = {
  questions: arrayOf(shape({})).isRequired,
  callUpdateScore: func.isRequired,
  callUpdateAssertions: func.isRequired,
  history: shape({}).isRequired,
  name: string.isRequired,
  score: number.isRequired,
  profilePicture: string.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.player.questions,
  name: state.player.name,
  score: state.player.score,
  profilePicture: state.player.profilePicture,
});

const mapDispatchToProps = (dispatch) => ({
  callUpdateScore: (payload) => dispatch(updateScore(payload)),
  callUpdateAssertions: (payload) => dispatch(updateAssertions(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
