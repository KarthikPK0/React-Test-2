import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo, toggleTodo } from '../redux/todoSlice'


function ToDoApp() {

    const [text, setText] = useState('');
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();
  
    const handleAddTodo = () => {
      if (text.trim()) {
        dispatch(addTodo(text));
        setText('');
      }
    };
  
    const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className='d-flex justify-content-center'>
    <div style={{textAlign:'center', marginTop:'50px'}} className="bg-white w-75  rounded border shadow p-5">
    <h1>My Todo List</h1>
  <div style={{gap:'1em'}} className="d-flex d-row">
  <input 
        type="text" 
        className='form-control'
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Enter todo" 
      />
      <button  className='btn btn-primary' onClick={handleAddTodo}>Submit</button>
  </div>
     
      <ul style={{listStyleType:'none',padding:'0'}}>
        {todos.map((todo) => (
          <li style={{padding:'10px',margin:'10px 0'}} className='border d-flex justify-content-between align-items-center' key={todo.id}>
          
          <div>  <input className='form-check-input '
              type="checkbox" 
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />
               <span  style={{ textDecoration: todo.completed ? 'line-through' : 'none',marginLeft:'10px' }} className='fw-bolder'>
               {todo.text}</span></div>
         
           
            <button className='btn btn-danger' onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
          </li>
        ))}
      </ul>
      <h5 style={{textAlign:'start'}}  className='fw-bolder'>Total Completed Items: {completedCount}</h5>
    </div>

    </div>
  )
}

export default ToDoApp

