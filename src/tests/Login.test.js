import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

const nameText = 'input-player-name';
const emailText = 'input-gravatar-email';

describe('testa componente Login', () => {
  test('Se possui um titulo com nome Login', () => {
    renderWithRouterAndRedux(<App />);
    const loginText = screen.getByText('Login');
    expect(loginText).toBeInTheDocument();
  });

  test('Se possui um input para email', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('input-gravatar-email');
    expect(emailInput).toBeInTheDocument();
  });

  test('Se possui um input para nome', () => {
    renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByTestId('input-player-name');
    expect(nameInput).toBeInTheDocument();
  });

  test('Se possui um botao', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByTestId('btn-play');
    expect(button).toBeInTheDocument();
  });

  test('Se o botao inicia desativado', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByTestId('btn-play');
    expect(button).toHaveAttribute('disabled');
  });

  test('Se o botao ativa ao preencher os inputs corretamente', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailText);
    const nameInput = screen.getByTestId(nameText);
    const button = screen.getByTestId('btn-play');

    userEvent.type(emailInput, 'email@provider.com');
    userEvent.type(nameInput, '123456');
    expect(button).toBeEnabled();
  });

  test('Se, ao clicar no botão redireciona para o /game', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailText);
    const nameInput = screen.getByTestId(nameText);
    const button = screen.getByTestId('btn-play');

    userEvent.type(emailInput, 'email@provider.com');
    userEvent.type(nameInput, '123456');
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/game');
  });
});
