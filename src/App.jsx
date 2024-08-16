import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { stringify, v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])


  const saveToLs = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (params) => {
    setshowfinished(!showfinished) 
  }
  

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });

    settodos(newTodos);
    saveToLs()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id != id;
    });

    settodos(newTodos);
    saveToLs()
  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    saveToLs()
  }

  const handleChange = (e) => {
    settodo(e.target.value);
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id == id;
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    settodos(newTodos)
    saveToLs()
  }



  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-4 bg-blue-100 min-h-[80vh] md:w-3/4">
      <h1 className='text-center font-bold text-xl'>ToDoist - Manage your todos at one place.</h1>

        <div className="addTodo my-3 flex flex-col gap-4">
          <h1 className='text-xl font-bold text-slate-800'>Add a Todo</h1>
          {/* <input onChange={handleChange} value={todo} type="text" className='w-1/2' /> */}
          <div className='flex'>
            <input onKeyDown={(e) => e.key === "Enter" && handleAdd()} onChange={handleChange} value={todo} type="text" className=' w-3/4 rounded-lg px-2 py-1 my-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-blue-600 hover:bg-blue-800 p-3 py-1 text-sm text-white disabled:bg-blue-300 rounded-lg mx-6 font-bold'>Save</button></div>
        </div>
        <div className='flex gap-5 font-medium '>
        <input  onChange={toggleFinished} type="checkbox" checked={showfinished}/>Show Finished</div>
        <h1 className='text-xl font-bold text-slate-800'>Your Todos</h1>
        <div className="todos">
          {todos.length === 0 && <div className='my-5 mx-2 font-bold'>No todos to display.</div>}
          {todos.map(item => {
            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex my-2 space-x-7 w-full">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-blue-600 hover:bg-blue-800 p-3 py-1 text-sm text-white rounded-lg mx-1 font-bold'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-blue-600 hover:bg-blue-800 p-3 py-1 text-sm text-white rounded-lg mx-1 font-bold'><MdDelete /></button>
              </div>
            </div>
          })}

        </div>
      </div>
    </>
  )
}

export default App
