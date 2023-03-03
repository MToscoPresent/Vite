import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";
import Modal from "./components/Modal";
//import "./components/Modal/modal.module.css"
//import Popup from "reactjs-popup";
//import { popup } from "./components/popup"


const LOCAL_STORAGE_KEY = 'todo:tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false)

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(saved) {
      setTasks(JSON.parse(saved));
    }
  }

  function setTasksAndSave(newTasks) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  useEffect(() => {
    loadSavedTasks();
  }, [])

  function addTask(taskTitle, taskContent) {
    setTasksAndSave([...tasks, {
      id: crypto.randomUUID(),
      title: taskTitle,
      content: taskContent,
      isCompleted: false
    }]);
  }

  /*function addContent(taskContent) {
    setTasksAndSave([...tasks, {
      id: crypto.randomUUID(),
      content: taskContent,
      isCompleted: false
    }]);
  }*/

  function deleteTaskById(taskId) {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasksAndSave(newTasks);
  }

  function toggleTaskCompletedById(taskId) {
    const newTasks = tasks.map(task => {
      if(task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted
        }
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  return (
    <>
      <Header handleAddTask={addTask} />
      <Tasks
        tasks={tasks}
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedById}
      />
      {/* <Popup trigger={<button> Trigger</button>} position="right center">
        <div>Popup content here !!</div>
      </Popup>
      <div>
      <button 
      onClick={() => setOpenModal(true)} 
      className='modalButton'>
        Modal
      </button>
      <Modal 
      open={openModal} 
      onClose={() => setOpenModal(false)} />
      </div> */}
      
    </>
  )
}

export default App
