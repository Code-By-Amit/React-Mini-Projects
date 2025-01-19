import { useEffect, useState } from 'react'
import { NavBar } from './components/NavBar'
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todosString = localStorage.getItem("todos")
    console.log(todosString)
    if (todosString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      console.log("Parsed: ",todos)
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  const toggleFinished = () => {
    setShowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(item => item.id === id)
    setTodo(t[0].todo)
    const newtodo = todos.filter(item => item.id !== id)
    setTodos(newtodo)

  }

  const handleDelete = (e, id) => {
    const newtodo = todos.filter(item => item.id !== id)
    setTodos(newtodo)

  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")

  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    const id = e.target.name;
    let index = todos.findIndex((item => item.id === id))
    const newtodo = [...todos]
    newtodo[index].isCompleted = !newtodo[index].isCompleted
    setTodos(newtodo)

  }

  return (
    <>
      <NavBar />
      <div className="container m-auto my-5 rounded-xl p-5 bg-violet-200 w-1/2 min-h-[80vh]">
        <div className="addtodo">
          <h1 className='text-lg font-bold'>Add todo</h1>
          <div className='flex p-4 gap-3'>
            <input onChange={handleChange} value={todo} type="text" placeholder='Add a Task....' className='text-sm h-9 p-2 px-4 w-full rounded-full' />
            <button onClick={handleAdd} disabled={todo.length < 3} className=' disabled:bg-violet-600 bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md text-sm font-bold' >Add</button>
          </div>
        </div>
        <div>
          <input type="checkbox" onChange={toggleFinished} checked={showFinished} /> Show Finished
        </div>
        <h1 className='text-lg font-bold '>My Todos</h1> 
        <div className="todos px-4">
          {todos.length === 0 && <div className='m-5 '> No todos to Display </div>}
          {todos.map((item) => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex m-2 py-1 px-2 w-full my-3 justify-between ">
              <div className='flex'>
                <div >
                  <input type="checkbox" name={item.id} onChange={handleCheckbox} checked={item.isCompleted} value={item.isCompleted} className='mx-1' />
                </div>
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
              </div>

              <div className="button flex items-center">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 h-7 text-white rounded-md mx-2 text-sm font-bold' >Edit</button>
                <button onClick={(e) => handleDelete(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 h-7 text-white rounded-md mx-2 text-sm font-bold' >Delete</button>
              </div>
            </div>

          })}
        </div>
      </div>
    </>
  )
}

export default App
