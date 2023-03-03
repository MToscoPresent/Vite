import React from 'react'
import { useEffect, useState } from "react";
import { Header } from '../Header';
import { Tasks } from '../Tasks';
import './modal.module.css';

const LOCAL_STORAGE_KEY = 'todo:tasks';

const Modal = ({ open, onClose }) => {
    if (!open) return null;
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
    return (
    <>
    <Header handleAddTask={addTask} />
        <Tasks
            tasks={tasks}
            onDelete={deleteTaskById}
            onComplete={toggleTaskCompletedById}
        />
       {/* <div onClick={onClose} className='overlay'>
         <div
           onClick={(e) => {
             e.stopPropagation();
           }}
           className='modalContainer'
         >
           <div className='modalRight'>
             <p className='closeBtn' onClick={onClose}>
               X
             </p>
             <div className='content'>
               <p>Do you want a</p>
               <h1>$20 CREDIT</h1>
               <p>for your first tade?</p>
             </div>
             <div className='btnContainer'>
               <button className='btnPrimary'>
                 <span className='bold'>YES</span>, I love NFT's
               </button>
               <button className='btnOutline'>
                 <span className='bold'>NO</span>, thanks
               </button>
             </div>
           </div>
         </div>
       </div> */}
    </>
    );
  };
}

export default Modal