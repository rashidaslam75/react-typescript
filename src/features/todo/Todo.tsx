import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createTodo, incrementAsync, removeTodo, todoSelector } from './todoSlice';

export const Todo = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(todoSelector)
  const [value, setValue] = useState('');

  const onSubmit = () => {
    dispatch(incrementAsync())
    dispatch(createTodo({ id: Math.random().toString(), text: value }))
  }

  const onDelete = (id: string) => {
    dispatch(removeTodo({id}))
  }

  return (
    <div>
      <h3>To do app</h3>

      <input onChange={(e) => setValue(e.target.value)} value={value} />
      <button onClick={onSubmit}>Add </button>
      <br />
      <ul>
        {todos.todos.map(x => {
          return (
            <li onClick={() => onDelete(x.id)}>{x.text}</li>
          )
        })}
      </ul>
    </div>
  )
}
