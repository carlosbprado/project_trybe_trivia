import React from 'react';
import { connect } from 'react-redux';
import { shape } from 'prop-types';

class Ranking extends React.Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    this.saveToLocalStorage();

    const localRanking = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ ranking: localRanking });
  }

  saveToLocalStorage = () => {
    const { name, score, profilePicture } = this.props;
    const localRanking = JSON.parse(localStorage.getItem('ranking'));

    const newRankingObj = {
      name,
      score,
      picture: profilePicture,
    };

    if (localRanking) {
      localStorage.setItem('ranking', JSON.stringify([...localRanking, newRankingObj]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([newRankingObj]));
    }
  };

  render() {
    const { history } = this.props;
    const { ranking } = this.state;
    console.log(ranking);

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>

        <ul>
          {
            ranking
              .sort((a, b) => b.score - a.score)
              .map((player, index) => (
                <li key={ player.name }>
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
