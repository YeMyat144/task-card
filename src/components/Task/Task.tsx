import React from 'react';
import { Task as TaskType } from '../../types';
import './Task.css';

type TaskProps = {
  task: TaskType;
};

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      <p>{task.title}</p>
    </div>
  );
};

export default Task;
