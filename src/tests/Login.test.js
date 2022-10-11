import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { questionsResponse } from '../../cypress/mocks/questions';

const nameText = 'input-player-name';
const emailText = 'input-gravatar-email';

describe('testa componente Login', () => {

  beforeEach(() => {

    global.fetch = jest.fn(async (endPoint) => ({
      json: async () => {
        if (endPoint.includes('//opentdb.com/api.php?amount=5&token=')) {
          return questionsResponse
        }
        return {
          "response_code": 0,
          "response_message": "Token Generated Successfully!",
          "token": "f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
        }
      }
    }))
  })

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

  test('Se possui um botao Play', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByTestId('btn-play');
    expect(button).toBeInTheDocument();
  });

  test('Se possui um botao Settings', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByTestId('btn-settings');
    expect(button).toBeInTheDocument();
  });

  test('Se o botao Play inicia desativado', () => {
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

  test('Se, ao clicar no botão Configurações redireciona para o /settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailText);
    const nameInput = screen.getByTestId(nameText);
    const button = screen.getByTestId('btn-settings');

    userEvent.type(emailInput, 'email@provider.com');
    userEvent.type(nameInput, '123456');
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/settings');
  });

  test('Se, ao clicar no botão Play redireciona para o /game', async () => {

    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailText);
    const nameInput = screen.getByTestId(nameText);
    const button = screen.getByTestId('btn-play');

    userEvent.type(emailInput, 'email@provider.com');
    userEvent.type(nameInput, '123456');
    userEvent.click(button);

    await waitFor(() => expect(history.location.pathname).toBe('/game')
    )
  });
});

