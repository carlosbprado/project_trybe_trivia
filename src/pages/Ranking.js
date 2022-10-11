import React from 'react';
import { func } from 'prop-types';

export default class Ranking extends React.Component {
  render() {
    const { history } = this.props;

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>

        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ () => history.push('/') }
        >
          Go home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: func.isRequired,
};
