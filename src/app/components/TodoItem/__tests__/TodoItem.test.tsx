import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoItem from '../TodoItem'

const mockTodo = { userId: 1, title: 'Wave hello! 👋', completed: false, id: 1 }
const mockSetTodos = jest.fn()

describe('TodoItem', () => {
  beforeEach(() => {
    mockSetTodos.mockClear()
  })

  describe('Render', () => {
    it('should render an article', () => {
      render(<TodoItem todo={mockTodo} setTodos={mockSetTodos} />)
      expect(screen.getByRole('article')).toBeInTheDocument()
    })
    it('should render a label', () => {
      render(<TodoItem todo={mockTodo} setTodos={mockSetTodos} />)
      expect(screen.getByTestId('todo-item')).toBeInTheDocument()
    })
    it('should render a checkbox', () => {
      render(<TodoItem todo={mockTodo} setTodos={mockSetTodos} />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })
    it('should render a button', () => {
      render(<TodoItem todo={mockTodo} setTodos={mockSetTodos} />)
      expect(screen.getByRole('button', { name: `Delete ${mockTodo.title}` })).toBeInTheDocument()
    })
  })

  describe('Behavior', () => {
    it('should call setTodos when checkbox clicked', async () => {
      const user = userEvent.setup()
      render(<TodoItem todo={mockTodo} setTodos={mockSetTodos} />)
      await user.click(screen.getByRole('checkbox'))
      expect(mockSetTodos).toHaveBeenCalled()
    })
    it('should call setTodos when button clicked', async () => {
      const user = userEvent.setup()
      render(<TodoItem todo={mockTodo} setTodos={mockSetTodos} />)
      await user.click(screen.getByRole('button', { name: `Delete ${mockTodo.title}` }))
      expect(mockSetTodos).toHaveBeenCalled()
    })
  })
})
