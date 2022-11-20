import { screen } from '@testing-library/react';
import App from './App';
import {renderWithProviders} from "./utils/test-utils";

test('renders learn react link', () => {
  renderWithProviders(<App />);
  const linkElement = screen.getByText(/Pokerfoci/i);
  expect(linkElement).toBeInTheDocument();
});
