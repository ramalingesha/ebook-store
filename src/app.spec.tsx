import App from './app';
import React from 'react';
import { shallow } from 'enzyme';
import { render, screen, fireEvent } from '@testing-library/react';

describe('App Component', () => {
  let wrapper;

  it('renders app component', () => {
    // wrapper = shallow(<App />);

    // expect(wrapper).toBeDefined();
    // expect(wrapper.html()).not.toBeNull();
    render(<App />);
    // screen.debug();
  });
});
