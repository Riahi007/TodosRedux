import React, { createContext, useReducer } from 'react';

export const TodosContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'AddTodo':
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: action.payload.id, title: action.payload.title, completed: false },
        ],
        newTodo: '',
      };

    case 'Update':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };

    case 'Delete':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
      };

    case 'UpdateInput':
      return {
        ...state,
        newTodo: action.payload, 
      };

    default:
      return state;
  }
}

export const addAction = (param) => (
    { type: 'AddTodo', payload:param }
);


export const UpdateAction = (param) =>(
     { type: 'Update', payload:param }
    );

export const deleteAction = (param) => (
    { type: 'Delete', payload:param }
);

export const updateInputAction = (value) =>(
    { type: 'UpdateInput', payload:value }
);

function Context({ children }) {
  const initialState = { todos: [], newTodo: '' };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
}

export default Context;
