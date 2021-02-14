import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


describe("Appearance of page elements", () => {
  test('renders page title', () => {
    render(<App />);
    const headerTitle = screen.getByText(/Github Stars/);
    expect(headerTitle).toBeInTheDocument();
  });
});
