import React from 'react';
import { number, shape } from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

const MIN_ASSERTIONS = 3;

class Feedback extends React.Component {
  render() {
    const { assertions, score, history } = this.props;

    return (
      <>
        <Header />

        <main className="mt-10 mb-10">
          <div data-testid="feedback-text" className="font-bold text-2xl mb-10">
            {assertions >= MIN_ASSERTIONS
              ? (
                <span className="text-green-400">Well Done!</span>
              )
              : (
                <span className="text-red-400">Could be better...</span>
              ) }
          </div>

          <div
            data-testid="feedback-total-score"
            className="text-xl flex items-center justify-center flex-col mb-5"
          >
            <span className="mb-4">Total score:</span>
            <span
              className="font-bold text-5xl text-indigo-400 ml-2"
            >
              {score}
            </span>
          </div>

          <div
            data-testid="feedback-total-question"
            className="text-xl flex items-center justify-center flex-col mb-5"
          >
            <span className="mb-4">Correct answers:</span>
            <span
              className="font-bold text-5xl text-indigo-400 ml-2"
            >
              {assertions}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              data-testid="btn-play-again"
              onClick={ () => history.push('/') }
              className="p-4 bg-indigo-400 font-bold uppercase"
            >
              Play Again
            </button>

            <button
              type="button"
              onClick={ () => history.push('/ranking') }
              data-testid="btn-ranking"
              className="p-4 bg-indigo-600 font-bold uppercase"
            >
              Ranking
            </button>
          </div>
        </main>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: number.isRequired,
  score: number.isRequired,
  history: shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
