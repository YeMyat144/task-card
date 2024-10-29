import React from 'react';
import { Task as TaskType } from '../types';
import { Box, Typography, Checkbox, Paper } from '@mui/material';

type TaskProps = {
  task: TaskType;
};

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <Paper 
      elevation={1}
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 1.5,
        marginY: 1,
        backgroundColor: task.completed ? 'grey.100' : 'white',
        borderLeft: `4px solid ${task.label || '#000'}`,  // Label color indicator
      }}
    >
      <Checkbox 
        checked={task.completed}
        sx={{ color: task.label }}
        inputProps={{ 'aria-label': 'Task completion' }}
        disabled
      />
      <Box ml={1.5}>
        <Typography 
          variant="body1"
          sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}
        >
          {task.title}
        </Typography>
        {task.description && (
          <Typography variant="body2" color="textSecondary">
            {task.description}
          </Typography>
        )}
        {task.dueDate && (
          <Typography variant="caption" color="textSecondary">
            Due: {task.dueDate}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default Task;
