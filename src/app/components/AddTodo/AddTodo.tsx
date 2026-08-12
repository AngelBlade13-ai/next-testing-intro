import { FormEvent, useState } from 'react'
import type { Todo } from '@/types/Todo'

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export default function AddItemForm({ setTodos }: Props) {
  const [item, setItem] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const title = item.trim()
    if (!title) return

    setTodos(prev => {
      const highestId = prev.reduce((maxId, todo) => Math.max(maxId, todo.id), 0)
      return [...prev, { userId: 1, title, completed: false, id: highestId + 1 }]
    })
    setItem('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <label className="sr-only" htmlFor="title">
        New Todo
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={item}
        onChange={e => setItem(e.target.value)}
        className="text-2xl p-1 rounded-lg flex-grow w-full"
        placeholder="New Todo"
        autoFocus
      />
      <button
        type="submit"
        className="p-2 text-xl rounded-2xl text-black border-solid border-black border-2 max-w-xs bg-green-500 hover:cursor-pointer hover:bg-green-400 disabled:bg-gray-300"
        disabled={!item.trim()}
      >
        Submit
      </button>
    </form>
  )
}
