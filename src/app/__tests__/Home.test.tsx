import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../page'

describe('Home', () => {
  it('should add a new todo', async () => {
    const user = userEvent.setup()
    render(<Home />)
    const input = screen.getByPlaceholderText('New Todo')
    await user.type(input, 'My new todo')
    expect(input).toHaveValue('My new todo')
    const button = screen.getByRole('button', { name: 'Submit' })
    await user.click(button)
    expect(input).toHaveValue('')
    const data = await screen.findByText('My new todo')
    expect(data).toHaveTextContent('My new todo')
  })

  it('should update a todo', async () => {
    const user = userEvent.setup()
    render(<Home />)
    const checkbox = screen.getAllByRole('checkbox')[0]
    expect(checkbox).not.toBeChecked()
    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('should delete a todo', async () => {
    const user = userEvent.setup()
    render(<Home />)
    const todoText = screen.queryByText('Write Code 💻')
    expect(todoText).toBeInTheDocument()
    const button = screen.getByRole('button', { name: 'Delete Write Code 💻' })
    await user.click(button)
    expect(todoText).not.toBeInTheDocument()
  })
})
