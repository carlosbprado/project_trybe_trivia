import React from 'react';
import { connect } from 'react-redux';
import { shape } from 'prop-types';

class Ranking extends React.Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const localRanking = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ ranking: localRanking });
  }

  render() {
    const { history } = this.props;
    const { ranking } = this.state;

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>

        <ul>
          {
            ranking
              .sort((a, b) => b.score - a.score)
              .map((player, index) => (
                <li key={ index }>
                  <img src={ player.picture } alt={ player.name } />
                  <p data-testid={ `player-name-${index}` }>{player.name}</p>
                  <p data-testid={ `player-score-${index}` }>{player.score}</p>
                </li>
              ))
          }
        </ul>

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
  history: shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  profilePicture: state.player.profilePicture,
});

export default connect(mapStateToProps)(Ranking);
