import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

const INITIAL_STATE = {
  name: 'nome-da-pessoa',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  profilePicture: '',
  questions: [],
};

describe('Testa componente Ranking', () => {

  it('Possui um h1 com o texto Ranking', () => {
    localStorage.setItem('ranking', JSON.stringify([]));
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/ranking');
    const title = screen.getByRole('heading', {
      name: 'Ranking',
      level: 1,
    })
    expect(title).toBeInTheDocument();
  })

  it('Possui o botao Go Home', () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/ranking');
    const button = screen.getByTestId('btn-go-home');
    expect(button).toBeInTheDocument();
  })

  it('Ao clicar no botão Go Home redireciona para a rota / ', () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/ranking');
    const button = screen.getByTestId('btn-go-home');
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  })

  it('Exibe na tela as informações dos jogadores', () => {
    const players = [{ name: 'L2VEC', score: 130, picture: '' },
    { name: 'ovelha', score: 500, picture: '', }];
    localStorage.setItem('ranking', JSON.stringify(players));
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/ranking');
    const player1 = screen.getByTestId(`player-name-0`);
    const player2 = screen.getByTestId(`player-name-1`);
    expect(player1).toBeInTheDocument();
    expect(player2).toBeInTheDocument();

  })

})

// onvolumechange