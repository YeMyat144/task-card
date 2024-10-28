import React, { useState } from 'react';
import Task from './Task';
import { Column as ColumnType, Task as TaskType } from '../types';

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

  const deleteColumn = () => {
    setColumns(columns.filter((col) => col.id !== column.id));
  };

  return (
    <div style={{ border: '1px solid black', padding: '1rem' }}>
      <h2>
        {column.title} 
        <button onClick={deleteColumn} style={{ marginLeft: '10px', color: 'red' }}>Delete Column</button>
      </h2>
      <div>
        {column.tasks.map((task) => (
          <Task key={task.id} task={task} deleteTask={() => deleteTask(task.id)} />
        ))}
      </div>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Task title"
      />
      <textarea
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Task description"
      />
      <input
        type="date"
        value={taskDueDate}
        onChange={(e) => setTaskDueDate(e.target.value)}
      />
      <input
        type="color"
        value={taskLabel}
        onChange={(e) => setTaskLabel(e.target.value)}
        title="Label color"
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default Column;
