import { useEffect, useState } from 'react'
import './App.css'
import { TodoContextProvider } from "./contexts"
import {TodoForm, TodoItem} from "./components"

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prevTodos) => [{...todo}, ...prevTodos]);
  }

  const toggleTodo = (id) => {
    setTodos(prevTodos => prevTodos.map((todo) => {
      return todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo;
    }));
  }

  const editTodo = (id, todoMsg) => {
    setTodos((prevTodos) => prevTodos.map((todo) => {
      if (todo.id === id) {
        todo.todo = todoMsg;
      }
      return todo;
    }));
  }

  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter((todo) => todo.id !== id));
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos === null) { //if locally stored todos empty, then add 3 default todos
      setTodos([
        {
            id: 1,
            todo: "Eat",
            isCompleted: false,
        },
        {
            id: 2,
            todo: "Sleep",
            isCompleted: false,
        },
        {
            id: 3,
            todo: "Code",
            isCompleted: false,
        }
      ]);
    }
    else if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContextProvider value={{todos, addTodo, toggleTodo, editTodo, deleteTodo}}>
      <div className="bg-[#172842] min-h-100 h-fit py-8 px-4 rounded-lg">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">ManageYour Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            { todos.map((todo) => (
              <div key={todo.id} className='w-full'>
                <TodoItem todo={todo}/>
              </div>
            )) }
          </div>
        </div>
      </div>
    </TodoContextProvider>
  )
}


export default App;