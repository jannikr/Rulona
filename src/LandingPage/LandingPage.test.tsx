import React from 'react';
import { render, screen } from '@testing-library/react';
import LandingPage from './LandingPage';
import { BrowserRouter } from 'react-router-dom';

test('renders learn react link', () => {
  render(<LandingPage />, { wrapper: BrowserRouter });
  const placeholder = screen.getByText(/placeholder/i);
  expect(placeholder).toBeInTheDocument();
});
