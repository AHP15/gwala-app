import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import App from '../../src/App';

test('Test <App />', async () => {
  render(<App />);

  // fireEvent.click(screen.getByRole('button'));

  // await screen.getByRole('button');

  // expect(screen.getByRole('button')).toHaveTextContent('count is 1');
});
