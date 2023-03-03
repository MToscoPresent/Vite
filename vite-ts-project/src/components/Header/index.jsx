import todoLogo from '../../assets/todoLogo.svg';
import styles from './header.module.css';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useState } from 'react';

export function Header({ handleAddTask, handleAddContent }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    handleAddTask(title, content);
    setTitle('');
    setContent('')
  }

  function onChangeTitle(event) {
    setTitle(event.target.value);
  }

  function onChangeContent(event) {
    setContent(event.target.value);
  }

  return (
    <header className={styles.header}>
      {/* <img src={todoLogo} /> */}

      <form onSubmit={handleSubmit} className={styles.newTaskForm}>
        {/* <input placeholder="Add a new task" type="text" onChange={onChangeTitle} value={title} /> */}
        <input placeholder="Add a new task" type="text" onChange={onChangeTitle} value={title} />
        <input placeholder="Add a new task" type="text" onChange={onChangeContent} value={content} />
        <button>Create <AiOutlinePlusCircle size={20} /></button>
      </form>
    </header>
  )
}