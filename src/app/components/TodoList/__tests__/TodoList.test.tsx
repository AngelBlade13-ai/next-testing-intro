import { render, screen } from '@testing-library/react'
import TodoList from '../TodoList'

const mockTodos = [
  { userId: 1, title: 'Wave hello! 👋', completed: false, id: 1 },
  { userId: 1, title: 'Get Coffee ☕☕☕', completed: false, id: 2 },
]
const mockSetTodos = jest.fn()

describe('TodoList', () => {
  it('should render "No Todos Available" when the array is empty', () => {
    render(<TodoList todos={[]} setTodos={mockSetTodos} />)
    expect(screen.getByText('No Todos Available')).toBeInTheDocument()
  })
  it('should render a list with the correct number of items', () => {
    render(<TodoList todos={mockTodos} setTodos={mockSetTodos} />)
    expect(screen.getAllByRole('article')).toHaveLength(2)
  })
  it('should render the todos in the correct order', () => {
    render(<TodoList todos={mockTodos} setTodos={mockSetTodos} />)
    expect(screen.getAllByTestId('todo-item')[0]).toHaveTextContent('Get Coffee ☕☕☕')
  })

  it('should not mutate the supplied todos array when sorting', () => {
    const todos = [...mockTodos]
    const originalOrder = todos.map(todo => todo.id)

    render(<TodoList todos={todos} setTodos={mockSetTodos} />)

    expect(todos.map(todo => todo.id)).toEqual(originalOrder)
  })
})
