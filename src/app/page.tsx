'use client'
import { useState } from 'react'

export default function Home() {
  const [todos, setTodos] = useState<any[]>([])
  const [input, setInput] = useState('')

  function addTodo() {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, done: false }])
      setInput('')
    }
  }

  function toggleTodo(id: any) {
    setTodos(todos.map((t: any) => t.id === id ? { ...t, done: !t.done } : t))
  }

  function deleteTodo(id: any) {
    setTodos(todos.filter((t: any) => t.id !== id))
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>Todo App</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
        />
        <button onClick={addTodo} style={{ padding: '8px 16px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Add
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo: any) => (
          <li key={todo.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderBottom: '1px solid #eee' }}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{ flex: 1, textDecoration: todo.done ? 'line-through' : 'none', color: todo.done ? '#999' : '#000' }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)} style={{ background: '#ff4444', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      {todos.length === 0 && <p style={{ textAlign: 'center', color: '#999' }}>No todos yet. Add one above!</p>}
    </div>
  )
}
