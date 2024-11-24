import React, { useContext } from 'react';
import './App.css'
import { TodosContext, addAction, UpdateAction, deleteAction, updateInputAction } from './Context';

function App() {
  const { state, dispatch } = useContext(TodosContext);

  
  const handleAddTodo = () => {
    if (state.newTodo.trim() === '') return; 
    const todo = { id: Date.now(), title: state.newTodo };
    dispatch(addAction(todo)); 
  };

  
  const handleToggleCompleted = (id) => {
    dispatch(UpdateAction({ id })); 
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteAction({ id }));
  };

  const handleInputChange = (e) => {
    dispatch(updateInputAction(e.target.value)); 
  };

  return (
    <div>
      <h1>Todo List</h1>

      <input type="text" value={state.newTodo} onChange={handleInputChange} placeholder="Add new todo" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
      <div className='list'>
        {state.todos.map((todo) => (
         
          <li key={todo.id}>
            {todo.title}
            <p>{todo.completed ? 'done' : 'pending'}</p>
            <button onClick={() => handleToggleCompleted(todo.id)}> Update </button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
         </div>
      </ul>
    </div>
  );
}

export default App;
