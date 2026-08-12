import { FaTrash } from 'react-icons/fa'
import type { Todo } from '@/types/Todo'

type Props = {
  todo: Todo
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export default function TodoItem({ todo, setTodos }: Props) {
  const handleChange = () => {
    setTodos(prevTodos =>
      prevTodos.map(item =>
        item.id === todo.id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  const handleDelete = () => {
    setTodos(prev => prev.filter(item => item.id !== todo.id))
  }

  return (
    <article className="my-4 flex justify-between items-center">
      <label className="text-2xl hover:underline" data-testid="todo-item" htmlFor={todo.id.toString()}>
        {todo.title}
      </label>
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={todo.completed}
          id={todo.id.toString()}
          name="completed"
          onChange={handleChange}
          className="min-w-[2rem] min-h-[2rem]"
        />
        <button
          type="button"
          aria-label={`Delete ${todo.title}`}
          data-testid="delete-button"
          onClick={handleDelete}
          className="p-3 text-xl rounded-2xl text-black border-solid border-black border-2 max-w-xs bg-red-400 hover:cursor-pointer hover:bg-red-300"
        >
          <FaTrash />
        </button>
      </div>
    </article>
  )
}
