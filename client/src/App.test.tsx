import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

describe('app landing page', () => {
  test('renders overview component', () => {
    render(<App />);
    const overviewElement = screen.getByTestId('overview');
    expect(overviewElement).toBeInTheDocument();
  });
});
