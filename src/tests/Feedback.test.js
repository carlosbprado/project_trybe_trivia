
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

describe('testa componente Feedback', () => {

  it('Possui um botão Play Again', () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');
    const button = screen.getByTestId('btn-play-again');
    expect(button).toBeInTheDocument();
  })

  it('Possui um botão Ranking', () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');
    const button = screen.getByTestId('btn-ranking');
    expect(button).toBeInTheDocument();
  })

  it('Ao clicar no botão Play Again redireciona para a rota / ', () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');
    const button = screen.getByTestId('btn-play-again');
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  })

  it('Ao clicar no botão Ranking redireciona para a rota /ranking ', () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');
    const button = screen.getByTestId('btn-ranking');
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
  })

  it('Assertions >= 3 renderiza a mensagem Well Done!', () => {
    renderWithRouterAndRedux(<App />, { player: { ...INITIAL_STATE, assertions: 3, } }, '/feedback');
    expect(screen.getByText(/well done/i)).toBeInTheDocument();
  })

})