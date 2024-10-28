import React, { useState } from 'react';
import Task from '../Task/Task';
import { Card as CardType, Task as TaskType, Column as ColumnType } from '../../types';
import './Card.css';

type CardProps = {
  card: CardType;
  columnId: string;
  columns: ColumnType[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
};

const Card: React.FC<CardProps> = ({ card, columnId, columns, setColumns }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');

  const completedTasksCount = card.tasks.filter((task) => task.completed).length;
  const incompleteTasksCount = card.tasks.length - completedTasksCount;

  const addTask = () => {
    if (taskTitle.trim()) {
      const newTask: TaskType = {
        id: Date.now().toString(),
        title: taskTitle,
        completed: false,
      };
      const updatedColumns = columns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: col.cards.map((c) =>
                c.id === card.id ? { ...c, tasks: [...c.tasks, newTask] } : c
              ),
            }
          : col
      );
      setColumns(updatedColumns);
      setTaskTitle('');
      setIsAddingTask(false);
    }
  };

  return (
    <div className="card">
      <h3>{card.title}</h3>
      <p>Complete: {completedTasksCount} / Incomplete: {incompleteTasksCount}</p>
      <button onClick={() => setIsAddingTask((prev) => !prev)}>☰</button>

      {isAddingTask && (
        <div className="task-form">
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Task title"
          />
          <button onClick={addTask}>Add Task</button>
        </div>
      )}

      <div className="tasks-container">
        {card.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Card;
