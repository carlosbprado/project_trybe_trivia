import React from 'react';
import { string, number, func } from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { saveProfilePicture } from '../redux/actions';

class Header extends React.Component {
  state = {
    url: '',
  };

  componentDidMount() {
    this.covertEmailToPicture();
  }

  covertEmailToPicture = () => {
    const { gravatarEmail, callSaveProfilePicture } = this.props;
    const hash = md5(gravatarEmail).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({ url });
    callSaveProfilePicture(url);
  };

  render() {
    const { name, score } = this.props;
    const { url } = this.state;

    return (
      <div>
        <img src={ url } alt={ name } data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
      </div>
    );
  }
}

Header.propTypes = {
  gravatarEmail: string.isRequired,
  name: string.isRequired,
  score: number.isRequired,
  callSaveProfilePicture: func.isRequired,
};

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  profilePicture: state.player.profilePicture,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  callSaveProfilePicture: (picture) => dispatch(saveProfilePicture(picture)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
