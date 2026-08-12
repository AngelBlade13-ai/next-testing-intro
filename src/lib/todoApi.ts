import type { Todo } from '@/types/Todo'

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos'

export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch(TODOS_URL)

  if (!response.ok) {
    throw new Error(`Unable to load todos (${response.status})`)
  }

  return response.json() as Promise<Todo[]>
}

export async function createTodo(title: string): Promise<Todo> {
  const response = await fetch(TODOS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: 1, title, completed: false }),
  })

  if (!response.ok) {
    throw new Error(`Unable to create todo (${response.status})`)
  }

  return response.json() as Promise<Todo>
}
