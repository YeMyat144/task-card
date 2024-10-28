import React, { useState } from 'react';
import Task from '../Task/Task';
import { Column as ColumnType, Task as TaskType } from '../../types';
import './column.css';

type ColumnProps = {
  column: ColumnType;
  columns: ColumnType[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
};

const Column: React.FC<ColumnProps> = ({ column, columns, setColumns }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskLabel, setTaskLabel] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const addTask = () => {
    if (taskTitle.trim()) {
      const newTask: TaskType = {
        id: Date.now().toString(),
        title: taskTitle,
        description: taskDescription,
        dueDate: taskDueDate,
        label: taskLabel,
        completed: false,
      };
      const updatedColumns = columns.map((col) =>
        col.id === column.id ? { ...col, tasks: [...col.tasks, newTask] } : col
      );
      setColumns(updatedColumns);
      setTaskTitle('');
      setTaskDescription('');
      setTaskDueDate('');
      setTaskLabel('');
      setIsFormVisible(false);
    }
  };

  const deleteTask = (taskId: string) => {
    const updatedColumns = columns.map((col) =>
      col.id === column.id
        ? { ...col, tasks: col.tasks.filter((task) => task.id !== taskId) }
        : col
    );
    setColumns(updatedColumns);
  };
  

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  return (
    <div className="column-container">
      <div className="column-header">
        <h2>{column.title}</h2>
        <button onClick={toggleFormVisibility} className="menu-toggle-button">
          ☰
        </button>
      </div>
      <div className="task-list">
        {column.tasks.map((task) => (
          <Task key={task.id} task={task} deleteTask={() => deleteTask(task.id)} />
        ))}
      </div>
      {isFormVisible && (
        <div className="task-form">
          <input
            type="text"
            className="column-input"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Task title"
          />
          <textarea
            className="column-textarea"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Task description"
          />
          <input
            type="date"
            className="column-date"
            value={taskDueDate}
            onChange={(e) => setTaskDueDate(e.target.value)}
          />
          <input
            type="color"
            className="column-color"
            value={taskLabel}
            onChange={(e) => setTaskLabel(e.target.value)}
            title="Label color"
          />
          <button onClick={addTask} className="add-task-button">Add Task</button>
        </div>
      )}
    </div>
  );
};

export default Column;
