import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddTodo from '../AddTodo'

const mockSetTodos = jest.fn()

describe('AddTodo', () => {
  beforeEach(() => {
    mockSetTodos.mockClear()
  })

  describe('Render', () => {
    it('should render the input', () => {
      render(<AddTodo setTodos={mockSetTodos} />)
      expect(screen.getByPlaceholderText('New Todo')).toBeInTheDocument()
    })

    it('should render a disabled submit button', () => {
      render(<AddTodo setTodos={mockSetTodos} />)
      expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled()
    })
  })

  describe('Behavior', () => {
    it('should be able to add text to the input', async () => {
      const user = userEvent.setup()
      render(<AddTodo setTodos={mockSetTodos} />)
      const input = screen.getByPlaceholderText('New Todo')
      await user.type(input, 'hey there')
      expect(input).toHaveValue('hey there')
    })

    it('should enable the submit button when text is input', async () => {
      const user = userEvent.setup()
      render(<AddTodo setTodos={mockSetTodos} />)
      await user.type(screen.getByPlaceholderText('New Todo'), 'hey there')
      expect(screen.getByRole('button', { name: 'Submit' })).toBeEnabled()
    })

    it('should empty the text input when submitted', async () => {
      const user = userEvent.setup()
      render(<AddTodo setTodos={mockSetTodos} />)
      const input = screen.getByPlaceholderText('New Todo')
      await user.type(input, 'hey there')
      await user.click(screen.getByRole('button', { name: 'Submit' }))
      expect(input).toHaveValue('')
    })

    it('should call setTodos when submitted', async () => {
      const user = userEvent.setup()
      render(<AddTodo setTodos={mockSetTodos} />)
      await user.type(screen.getByPlaceholderText('New Todo'), 'hey there')
      await user.click(screen.getByRole('button', { name: 'Submit' }))
      expect(mockSetTodos).toHaveBeenCalled()
    })

    it('should create the first todo when the existing list is empty', async () => {
      const user = userEvent.setup()
      let todos: import('@/types/Todo').Todo[] = []
      const setTodos: React.Dispatch<React.SetStateAction<import('@/types/Todo').Todo[]>> = update => {
        todos = typeof update === 'function' ? update(todos) : update
      }
      render(<AddTodo setTodos={setTodos} />)

      await user.type(screen.getByRole('textbox', { name: 'New Todo' }), 'First todo')
      await user.click(screen.getByRole('button', { name: 'Submit' }))

      expect(todos).toEqual([
        { userId: 1, id: 1, title: 'First todo', completed: false },
      ])
    })

    it('should keep the submit button disabled for whitespace', async () => {
      const user = userEvent.setup()
      render(<AddTodo setTodos={mockSetTodos} />)

      await user.type(screen.getByRole('textbox', { name: 'New Todo' }), '   ')

      expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled()
    })
  })
})
