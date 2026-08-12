import { createTodo, fetchTodos } from '../todoApi'
import type { Todo } from '@/types/Todo'

const mockFetch = jest.fn<ReturnType<typeof fetch>, Parameters<typeof fetch>>()
const originalFetch = globalThis.fetch

function mockResponse(data: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: jest.fn().mockResolvedValue(data),
  } as unknown as Response
}

describe('todoApi', () => {
  beforeEach(() => {
    globalThis.fetch = mockFetch
  })

  afterEach(() => {
    mockFetch.mockReset()

    if (originalFetch) {
      globalThis.fetch = originalFetch
    } else {
      Reflect.deleteProperty(globalThis, 'fetch')
    }
  })

  it('returns todos from the external API', async () => {
    const todos: Todo[] = [
      { userId: 1, id: 1, title: 'Learn testing', completed: false },
    ]
    mockFetch.mockResolvedValue(mockResponse(todos))

    await expect(fetchTodos()).resolves.toEqual(todos)
    expect(mockFetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/todos'
    )
  })

  it('sends a new todo to the external API', async () => {
    const createdTodo: Todo = {
      userId: 1,
      id: 201,
      title: 'Practice mocking',
      completed: false,
    }
    mockFetch.mockResolvedValue(mockResponse(createdTodo, 201))

    await expect(createTodo('Practice mocking')).resolves.toEqual(createdTodo)
    expect(mockFetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/todos',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1,
          title: 'Practice mocking',
          completed: false,
        }),
      }
    )
  })

  it('throws a useful error when the external API fails', async () => {
    mockFetch.mockResolvedValue(mockResponse(null, 503))

    await expect(fetchTodos()).rejects.toThrow('Unable to load todos (503)')
  })
})
