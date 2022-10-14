import { Route, Switch } from 'react-router-dom';
import React from 'react';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="mt-20">
      <header className="mb-10">
        <img src={ logo } alt="logo" className="w-full max-w-xs mx-auto" />
      </header>

      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/ranking" component={ Ranking } />
      </Switch>

      <Footer />
    </div>
  );
}
