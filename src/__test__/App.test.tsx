import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import preview from 'jest-preview'

import App from '../App'

describe('App', () => {
 it('should work as expected', async () => {
  render(<App />)

  await userEvent.click(screen.getByTestId('increase'))
  await userEvent.click(screen.getByTestId('increase'))
  await userEvent.click(screen.getByTestId('increase'))
  await userEvent.click(screen.getByTestId('increase'))
  await userEvent.click(screen.getByTestId('increase'))
  await userEvent.click(screen.getByTestId('increase'))

  // Open http://localhost:3336 to see preview
  // Require to run `jest-preview` server before
  preview.debug()

  expect(screen.getByTestId('count')).toContainHTML('6')
 })
})
