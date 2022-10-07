import React from 'react';
import { connect } from 'react-redux';
import { func, shape } from 'prop-types';
import { getName, requestAPI } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    name: '',
    isButtonDisable: true,
  };

  handleButton = (event) => {
    event.preventDefault();
    const { saveUserName, history, callrequestAPI } = this.props;
    const { name } = this.state;
    saveUserName(name);
    callrequestAPI();
    history.push('/game');
  };

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.verifyButton());
  };

  verifyButton = () => {
    const { email, name } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = regex.test(email);
    const verifyName = name !== '';
    this.setState({
      isButtonDisable: !(verifyEmail && verifyName),
    });
  };

  render() {
    const { isButtonDisable, email, name } = this.state;
    const { history } = this.props;

    return (
      <>
        <div>Login</div>
        <p>teste@teste.com</p>

        <form
          onSubmit={ this.handleButton }
        >
          <label htmlFor="email">
            e-mail
            <input
              id="email"
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleInput }
            />
          </label>
          <label htmlFor="name">
            Name
            <input
              id="name"
              data-testid="input-player-name"
              type="name"
              name="name"
              value={ name }
              onChange={ this.handleInput }
            />
          </label>
          <button
            data-testid="btn-play"
            type="submit"
            disabled={ isButtonDisable }
          >
            Play
          </button>

          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/settings') }
          >
            Configurações
          </button>
        </form>

      </>
    );
  }
}

Login.propTypes = {
  saveUserName: func.isRequired,
  callrequestAPI: func.isRequired,
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveUserName: (payload) => dispatch(getName(payload)),
  callrequestAPI: () => dispatch(requestAPI()),
});

export default connect(null, mapDispatchToProps)(Login);
