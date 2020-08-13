import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Login from './login';
import mockAxios from '../../__mocks__/axios';
import { mount } from 'enzyme';
import { waitForDomChanges } from '../../__mocks__/helpers';
import userEvent from '@testing-library/user-event';
import App from '../../app';

describe('Login component', () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Login />
      </Router>
    );
  });

  it('should render title, input fields and login button', () => {
    // Title assertions
    const headerEl = screen.getByRole('heading', { name: 'Sign in' });
    expect(headerEl).toBeInTheDocument();
    expect(headerEl.tagName).toEqual('H1');

    // Form inputs assertions
    const emailField = screen.getByRole('textbox', { name: 'Email Address' });
    expect(emailField).toBeInTheDocument();
    expect(emailField).toBeRequired();

    const passwordField = screen.getByLabelText('Password');
    expect(passwordField).toBeInTheDocument();
    expect(passwordField.querySelector('input')?.type).toEqual('password');
    expect(passwordField.querySelector('input')).toBeRequired();

    // Check box assertions
    const rememberMeField = screen.getByRole('checkbox', {
      name: 'Remember me'
    });
    expect(rememberMeField).toBeInTheDocument();
    expect(rememberMeField).toHaveProperty('checked', false);

    // Signin button assertions
    const loginButton = screen.getByRole('button', { name: 'Sign In' });
    expect(loginButton).toBeInTheDocument();

    // Links assertions
    const forgotPasswordLink = screen.getByRole('link', {
      name: 'Forgot password?'
    });
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(forgotPasswordLink.getAttribute('href')).toEqual('#');

    const signUpLink = screen.getByRole('link', {
      name: "Don't have an account? Sign Up"
    });
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink.getAttribute('href')).toEqual('/signup');
  });

  it('should auto focus on username input field', () => {
    expect(
      screen.getByRole('textbox', { name: 'Email Address' })
    ).toHaveFocus();
  });

  it('should render <Copyright /> component', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('Copyright').exists()).toBeTruthy();
  });

  it('signup link click should open signup page', async () => {
    // Remove everything from dom created in beforeEach
    cleanup();

    // Render app component that has router config
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const signUpLink = screen.getByRole('link', {
      name: "Don't have an account? Sign Up"
    });
    userEvent.click(signUpLink);

    await waitForDomChanges();

    expect(
      screen.getByRole('link', {
        name: "Already have an account? Sign in"
      })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('link', {
        name: "Don't have an account? Sign Up"
      })
    ).not.toBeInTheDocument();

    // TODO:: Fix reset history state before each state.
    // Alternative solution to run this spec, navigate back to signin page from signup
    const signInLink = screen.getByRole('link', {
      name: "Already have an account? Sign in"
    });
    userEvent.click(signInLink);

    await waitForDomChanges();
  });

  describe('form validation', () => {
    let emailField: HTMLElement;
    beforeEach(() => {
      emailField = screen.getByRole('textbox', { name: 'Email Address' });
    });

    it('Username required error', () => {
      expect(screen.queryByText(/Username is required/i)).toBeNull();

      userEvent.tab();
      expect(screen.queryByText(/Username is required/i)).toBeInTheDocument();
    });

    it('invalid email error', () => {
      expect(screen.queryByText(/Invalid email/i)).toBeNull();

      userEvent.type(emailField, 'test');
      expect(screen.queryByText(/Invalid email/i)).toBeInTheDocument();

      userEvent.type(emailField, 'test@sd.com');
      expect(screen.queryByText(/Invalid email/i)).toBeNull();
    });

    it('Password required error', () => {
      const passwordInput: any = screen
        .getByLabelText('Password')
        .querySelector('input');

      userEvent.tab();
      expect(passwordInput).toHaveFocus();
      expect(screen.queryByText(/Password is required/i)).toBeNull();

      userEvent.tab();
      expect(screen.queryByText(/Password is required/i)).toBeInTheDocument();

      userEvent.type(passwordInput, 'password');
      expect(screen.queryByText(/Password is required/i)).toBeNull();
    });
  });

  describe('form submit', () => {
    let loginButton: HTMLElement;

    beforeEach(() => {
      loginButton = screen.getByRole('button', { name: 'Sign In' });
      expect(loginButton).toBeEnabled();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should disable Sign In button on form submit', async () => {
      loginButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(loginButton).toBeDisabled();
      await waitForDomChanges();
    });

    it('should call login api', async () => {
      const expectedResponse = {
        data: {
          success: true
        }
      };

      mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve(expectedResponse)
      );

      loginButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      // sign in button disable assertion
      expect(loginButton).toBeDisabled();

      await waitForDomChanges();

      // sign in button enable assertion
      expect(loginButton).toBeEnabled();
      expect(mockAxios.post).toHaveBeenCalledTimes(1);

      // TODO:: Not working - need to fix this issue
      // expect(mockAxios.post).toHaveReturnedWith('login');
    });

    it('should show dashboard page on successfull login', async () => {
      // Remove everything from dom created in beforeEach
      cleanup();

      // Render app component that has router config
      const { container } = render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
      loginButton = screen.getByRole('button', { name: 'Sign In' });

      const expectedResponse = {
        data: {
          success: true
        }
      };

      mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve(expectedResponse)
      );

      loginButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      await waitForDomChanges();

      expect(container.innerHTML).toMatch('I am Dashboard');
      expect(screen.queryByRole('button', { name: 'Sign In' })).toBeNull();
    });

    it('should display error message on invalid login request', async () => {
      mockAxios.post.mockImplementationOnce(() =>
        Promise.reject({
          response: {
            data: {
              message: 'Unauthorized user: Username/password is wrong'
            }
          }
        })
      );

      // Login error should not render on load
      expect(screen.queryByRole('alert')).toBeNull();

      loginButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      // Login error assertions
      const loginError = await screen.findByRole('alert');
      expect(loginError).toBeInTheDocument();
      expect(loginError.textContent).toEqual(
        'Unauthorized user: Username/password is wrong'
      );
    });
  });
});
