import React from 'react';
import { number } from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

const MIN_ASSERTIONS = 3;

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;

    return (
      <div>
        <Header />
        <div data-testid="feedback-text">
          {assertions >= MIN_ASSERTIONS ? 'Well Done!' : 'Could be better...'}
        </div>

        <div data-testid="feedback-total-score">{score}</div>
        <div data-testid="feedback-total-question">{assertions}</div>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: number.isRequired,
  score: number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
