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
        <h1
          className="text-4xl font-bold text-indigo-400 mb-10"
          data-testid="ranking-title"
        >
          Ranking
        </h1>

        <ul className="flex flex-col gap-5">
          {ranking
            .sort((a, b) => b.score - a.score)
            .map((player, index) => (
              <li
                key={ index }
                className="flex justify-between items-center bg-slate-600 p-4"
              >
                <img
                  className="rounded-full w-10"
                  src={ player.picture }
                  alt={ player.name }
                />
                <p data-testid={ `player-name-${index}` }>{player.name}</p>
                <p
                  className="text-4xl font-bold text-indigo-400"
                  data-testid={ `player-score-${index}` }
                >
                  {player.score}
                </p>
              </li>
            ))}
        </ul>

        <button
          className="p-4 bg-indigo-500 uppercase font-bold my-5"
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
