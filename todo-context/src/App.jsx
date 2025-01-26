import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {TodoProvider} from './context/index.js'
import TodoForm from './Components/TodoForm.jsx'
import { TodoList } from './Components/index.js'

function App() {

  const [todos, setTodos ] = useState([]) 

  const addTodo = (todo) => {
    setTodos(prevTodos => [ todo,...prevTodos])
  }

  const updateTodo = (todo , id) =>{
     setTodos(prevTodos => prevTodos.map(prevTodo => prevTodo.id === id ?
       {...prevTodo, todo: todo.todo } : prevTodo))
  }

  const deleteTodo = (id) => {
    setTodos(prevTodos=> prevTodos.filter(prevTodo => prevTodo.id !== id ))
  }

  const toggleComplete = (id) => {
     setTodos( prevTodos => prevTodos.map(prevTodo => prevTodo.id === id ? 
      {...prevTodo, completed : !prevTodo.completed}
       : prevTodo ))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    alert()
   if(todos && todos.length ){
    setTodos(todos)
    
    
   }
    }, [])

    useEffect(()=> {
      
      localStorage.setItem("todos", JSON.stringify(todos))
    },[todos])
  
    



  return (
    <TodoProvider value={{todos, addTodo , deleteTodo, updateTodo , toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                      <TodoForm/>
                        {/* Todo form goes here */} 
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {
                        
                        todos.map(todo => (
                          <div key={todo.id} className='w-full' >
                          <TodoList todo={todo} />
                          </div>
                        ))
                        }
                    </div>
                </div>
            </div>
    </TodoProvider>  
  )
}

export default App
