import React from 'react';
import { arrayOf, shape } from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends React.Component {
  shuffleAnswers = (question) => {
    const NUMBER = 0.5;
    const answers = [...question.incorrect_answers, question.correct_answer];
    return answers.sort(() => Math.random() - NUMBER);
  };

  render() {
    const { questions } = this.props;
    return (
      <>
        <Header />
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
                      data-testid="correct-answer"
                      type="button"
                    >
                      {answer}
                    </button>
                  ) : (
                    <button
                      data-testid={ `wrong-answer-${index}` }
                      type="button"
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

// function shuffle(array) {
//   return array.sort(() => Math.random() - 0.5).
// }
