import React, { useState } from 'react';
import { Card as CardType, Column as ColumnType, Task as TaskType } from '../../types';
import './card.css';

type CardProps = {
  card: CardType;
  columnId: string;
  columns: ColumnType[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
};

const Card: React.FC<CardProps> = ({ card, columnId, columns, setColumns }) => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskLabel, setTaskLabel] = useState('#ffffff'); // Default to white

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
      resetTaskForm();
    }
  };

  const resetTaskForm = () => {
    setTaskTitle('');
    setTaskDescription('');
    setTaskDueDate('');
    setTaskLabel('#ffffff');
    setShowTaskForm(false);
  };

  const deleteCard = () => {
    const updatedColumns = columns.map((col) =>
      col.id === columnId
        ? { ...col, cards: col.cards.filter(c => c.id !== card.id) }
        : col
    );

    setColumns(updatedColumns);
  };

  const deleteTask = (taskId: string) => {
    const updatedColumns = columns.map((col) =>
      col.id === columnId
        ? {
            ...col,
            cards: col.cards.map(c =>
              c.id === card.id
                ? { ...c, tasks: c.tasks.filter(task => task.id !== taskId) }
                : c
            ),
          }
        : col
    );

    setColumns(updatedColumns);
  };

  const completedTasks = card.tasks.filter((task) => task.completed).length;

  return (
    <div className="card">
      <div className="card-header">
        <span className="label" style={{ backgroundColor: card.label }}>{card.label}</span>
        <h3>{card.title}</h3>
        <button onClick={deleteCard} style={{ marginLeft: '10px', color: 'red' }}>Delete Card</button>
        <button onClick={() => setShowTaskForm(!showTaskForm)} className="menu-icon">☰</button>
      </div>
      <p>{completedTasks} / {card.tasks.length} Tasks Completed</p>

      {showTaskForm && (
        <div className="task-form">
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Task Title"
          />
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Description"
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
            title="Task Label Color"
          />
          <button onClick={addTask}>Add Task</button>
          <button onClick={resetTaskForm}>Cancel</button>
        </div>
      )}
      
      <div className="tasks-container">
        {card.tasks.map((task) => (
          <div key={task.id} className="task">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => {
                // Toggle completion
                const updatedColumns = columns.map((col) =>
                  col.id === columnId
                    ? {
                        ...col,
                        cards: col.cards.map((c) =>
                          c.id === card.id
                            ? {
                                ...c,
                                tasks: c.tasks.map((t) =>
                                  t.id === task.id ? { ...t, completed: !t.completed } : t
                                ),
                              }
                            : c
                        ),
                      }
                    : col
                );
                setColumns(updatedColumns);
              }}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</span>
            <p>{task.description}</p>
            <p>Due: {task.dueDate}</p>
            <button onClick={() => deleteTask(task.id)} style={{ color: 'red' }}>Delete Task</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
