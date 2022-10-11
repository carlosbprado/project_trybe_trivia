import React from 'react';
import { number } from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

const MIN_ASSERTIONS = 3;

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;

    return (
      <div>
        <Header />
        <div data-testid="feedback-text">
          {assertions >= MIN_ASSERTIONS ? 'Well Done!' : 'Could be better...'}
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
