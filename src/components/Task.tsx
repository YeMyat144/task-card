import React from 'react';
import { Task as TaskType } from '../types';
import { Box, Typography, Checkbox, Paper, useTheme } from '@mui/material';

type TaskProps = {
  task: TaskType;
};

const Task: React.FC<TaskProps> = ({ task }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={1}
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 1.5,
        marginY: 1,
        backgroundColor: theme.palette.background.paper,
        borderLeft: `4px solid ${task.label || theme.palette.primary.main}`,
      }}
    >
      <Checkbox 
        checked={task.completed}
        sx={{ color: task.label || theme.palette.primary.main }}
        inputProps={{ 'aria-label': 'Task completion' }}
        disabled
      />
      <Box ml={1.5}>
        <Typography
          variant="body1"
          sx={{ textDecoration: task.completed ? 'line-through' : 'none', color: theme.palette.text.primary }}
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
