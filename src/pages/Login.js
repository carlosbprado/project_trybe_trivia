import React from 'react';
import { connect } from 'react-redux';
import { func, shape, bool } from 'prop-types';
import { savePlayer, requestAPI, resetStates } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    name: '',
    isButtonDisable: true,
  };

  componentDidMount() {
    const { callResetStates } = this.props;
    callResetStates();
  }

  handleButton = (event) => {
    event.preventDefault();
    const { callSavePlayer, history, callRequestAPI } = this.props;
    const { name, email } = this.state;
    callSavePlayer({ name, email });
    callRequestAPI(history);
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
    const { history, loading } = this.props;

    return (
      <form
        onSubmit={ this.handleButton }
        className="bg-slate-600 p-10 text-slate-100 shadow-lg max-w-lg mx-auto mb-10"
      >
        <div className="mb-10">
          <label htmlFor="email">
            <span className="hidden">e-mail</span>
            <input
              id="email"
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleInput }
              placeholder="your@email.com"
              className="w-full p-4 bg-transparent border-b-4 border-slate-500 font-bold
            placeholder:font-normal autofill:bg-transparent mb-4"
            />
          </label>

          <label htmlFor="name">
            <span className="hidden">Name</span>
            <input
              id="name"
              data-testid="input-player-name"
              type="name"
              name="name"
              value={ name }
              onChange={ this.handleInput }
              placeholder="Your Name"
              className="w-full p-4 bg-transparent border-b-4 border-slate-500 font-bold
            placeholder:font-normal"
            />
          </label>
        </div>

        <button
          data-testid="btn-play"
          type="submit"
          disabled={ isButtonDisable }
          className={ `${isButtonDisable ? 'bg-slate-500' : 'bg-indigo-500 shadow-lg'} 
          py-4 w-full font-bold uppercase` }
        >
          {loading ? 'Loading...' : 'Play'}
        </button>

        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
          className="hidden"
        >
          Configurações
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  callSavePlayer: func.isRequired,
  callRequestAPI: func.isRequired,
  history: shape({
    push: func.isRequired,
  }).isRequired,
  callResetStates: func.isRequired,
  loading: bool.isRequired,
};

const mapStateToProps = (state) => ({
  profilePicture: state.player.profilePicture,
  loading: state.player.loading,
});

const mapDispatchToProps = (dispatch) => ({
  callSavePlayer: (payload) => dispatch(savePlayer(payload)),
  callRequestAPI: (history) => dispatch(requestAPI(history)),
  callResetStates: () => dispatch(resetStates()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
