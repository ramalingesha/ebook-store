import React from 'react';
import { render, screen } from '@testing-library/react';
import Copyright from './copyright';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

describe('Copyright', () => {
  it('should render copyright text', () => {
    const { container } = render(<Copyright />);
    const year = new Date().getFullYear();

    expect(container.innerHTML).toMatch('Copyright ©');
    expect(container.innerHTML).toMatch('JSCode Blog');
    expect(container.innerHTML).toMatch(`${year}`);
  });

  it('should contain link that opens \'http://jscode.blog/\'', () => {
    render(<Copyright />);

    const copyRightLink = screen.getByRole('link', { name: 'JSCode Blog' });
    expect(copyRightLink).toBeInTheDocument();
    expect(copyRightLink.getAttribute('href')).toEqual('http://jscode.blog/');
    expect(copyRightLink.getAttribute('target')).toEqual('blank');
  })
});
