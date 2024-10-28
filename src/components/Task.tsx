import React from 'react';
import { Task as TaskType } from '../types';

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
    <div style={{ border: '1px solid gray', margin: '0.5rem 0', padding: '0.5rem', backgroundColor: task.label }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due: {task.dueDate}</p>
      <button onClick={deleteTask} style={{ color: 'red' }}>Delete</button>
      <button onClick={toggleCompletion} style={{ color: isCompleted ? 'green' : 'black' }}>
        {isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
      </button>
      {isCompleted && <div style={{ width: '100%', height: '5px', background: 'green', marginTop: '10px' }} />}
    </div>
  );
};

export default Task;
