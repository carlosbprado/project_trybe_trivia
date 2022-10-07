import React from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { name, email } = this.props;
    const hash = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;

    return (
      <div>
        <img src={ url } alt={ name } data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">0</p>
      </div>

    );
  }
}

Header.propTypes = {
  email: string.isRequired,
  name: string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
  profilePicture: state.user.profilePicture,
});

const mapDispatchToProps = (dispatch) => ({
  callSaveProfilePicture: (picture) => dispatch(saveProfilePicture(picture)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
