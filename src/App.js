import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { shape } from 'prop-types';

import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import Footer from './components/Footer';

import logo from './trivia.png';
import './App.css';

export default class App extends Component {
  render() {
    const { location: { pathname } } = this.props;

    return (
      <div>

        {
          pathname === '/' && (
            <header className="my-10">
              <img src={ logo } alt="logo" className="w-full max-w-xs mx-auto" />
            </header>
          )
        }

        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/ranking" component={ Ranking } />

        <Footer />
      </div>
    );
  }
}

App.defaultProps = {
  location: { pathname: '' },
};

App.propTypes = {
  location: shape({}),
};
