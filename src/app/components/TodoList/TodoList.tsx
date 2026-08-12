import TodoItem from '../TodoItem/TodoItem'
import type { Todo } from '@/types/Todo'

type Props = {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export default function TodoList({ todos, setTodos }: Props) {
  if (todos.length === 0) {
    return <p>No Todos Available</p>
  }

  const sortedTodos = [...todos].sort((a, b) => b.id - a.id)

  return (
    <section aria-label="Todo list">
      {sortedTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
      ))}
    </section>
  )
}
