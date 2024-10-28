import React from 'react';
import { Task as TaskType } from '../../types';
import './task.css';

type TaskProps = {
  task: TaskType;
  deleteTask: () => void;
};

const Task: React.FC<TaskProps> = ({ task, deleteTask }) => {
  const [isCompleted, setIsCompleted] = React.useState(task.completed);

  const toggleCompletion = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div className="task-container" style={{ "--task-label-color": task.label } as React.CSSProperties}>
      <div className="task-label"></div>
      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description}</p>
      <p className="task-due-date">Due: {task.dueDate}</p>
      <button onClick={deleteTask} className="task-button delete">Delete</button>
      <button onClick={toggleCompletion} className="task-button complete">
        {isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
      </button>
      {isCompleted && <div className="task-completed-indicator" />}
    </div>
  );
};

export default Task;
