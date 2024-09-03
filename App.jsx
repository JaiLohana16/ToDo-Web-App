import React from 'react'
import { useState,useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';


const App = () => {


  const [todo, settodo] = useState("")
  const [alltodos, setalltodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  
  const handleAdd = (e) => {
    setalltodos([...alltodos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
  }

  const handleChange = (e) => {
    settodo(e.target.value)
    
  }

  const handleEdit = (e) => {
    let id=e.target.name
    let t=alltodos.filter(i=>i.id===id)
    // map functiont returns a array and in our case the array will always have one element but it will be inside array so we have to do t[0]
    settodo(t[0].todo)
    // after above line now we have got the todo data in our input box for updation so we want deletion of this item
    handleDelete(e)
  }
  const toggleFinished=(e)=>{
    setshowFinished(!showFinished)
  }


  const handleDelete = (e) => {
    let id = e.target.name
    console.log(id)
    let newalltodos = alltodos.filter(item =>{
      return item.id !== id
    })
    setalltodos(newalltodos)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = alltodos.findIndex(item => {
      return item.id === id
    })
    let newalltodos = [...alltodos]
    newalltodos[index].isCompleted = !newalltodos[index].isCompleted
    setalltodos(newalltodos)
  }

  
  return (
    <div className='containner min-h-[80vh] mx-8 my-10 rounded-xl p-5 bg-red-200 text-center'>

      <div className="addToDo">
        <h1 className='text-lg font-bold'>Add a ToDo</h1>
        <input type="text" onChange={handleChange} value={todo} name="" id="" className='p-1 w-2/5 rounded-lg' />
        <button onClick={handleAdd} disabled={todo.length<3} className='bg-red-400 p-3 py-1 m-3 rounded-lg text-white font-bold'>Add</button>
      </div>
      <input onChange={toggleFinished} type="checkbox" checked={showFinished} name="" id="" />Show Finished
      <h1 className='text-lg font-bold'>Your ToDos</h1>
      <div className="todos bg-red-100 p-5 ml-72 w-[800px] rounded-xl">
        {alltodos.length===0 && <div className='text-left font-bold'>No ToDo to display</div>}
        {alltodos.map(item => {


          return (showFinished || !item.isCompleted )&&<div key={item.id} className="todo flex justify-center m-5">
            <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}
              name={item.id} id="" className='m-2 ' />
            <div className={item.isCompleted ? "line-through text-xl" : "text-xl"}>{item.todo}</div>
            <div className="buttons flex gap-8 mx-6">
              <button onClick={handleEdit} name={item.id} className='bg-red-400 p-5 py-1 rounded-lg '>Edit</button>
              <button onClick={handleDelete} name={item.id} className='bg-red-400 p-3 py-1 rounded-lg'>Delete</button>
            </div>

          </div>
        })}
      </div>

    </div>

  )
}

export default App
