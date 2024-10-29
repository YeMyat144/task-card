import React, { useState } from 'react';
import { Card as CardType, Column as ColumnType, Task as TaskType } from '../types';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Checkbox,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';

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
        ? { ...col, cards: col.cards.filter((c) => c.id !== card.id) }
        : col
    );

    setColumns(updatedColumns);
  };

  const deleteTask = (taskId: string) => {
    const updatedColumns = columns.map((col) =>
      col.id === columnId
        ? {
            ...col,
            cards: col.cards.map((c) =>
              c.id === card.id
                ? { ...c, tasks: c.tasks.filter((task) => task.id !== taskId) }
                : c
            ),
          }
        : col
    );

    setColumns(updatedColumns);
  };

  const completedTasks = card.tasks.filter((task) => task.completed).length;

  return (
    <Paper elevation={2} sx={{ padding: 2, marginBottom: 2, backgroundColor: '#fafafa' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h6" color="primary" noWrap>
          {card.title}
        </Typography>
        <Box>
          <IconButton color="secondary" onClick={deleteCard}>
            <DeleteIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => setShowTaskForm(true)}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      <Typography variant="body2" color="textSecondary">
        {completedTasks} / {card.tasks.length} Tasks Completed
      </Typography>

      <Divider sx={{ my: 1 }} />

      <Box>
        {card.tasks.map((task) => (
          <Box key={task.id} display="flex" alignItems="center" gap={2} sx={{ paddingY: 1 }}>
            <Checkbox
              checked={task.completed}
              onChange={() => {
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
            <Box flex={1}>
              <Typography
                variant="subtitle1"
                style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              >
                {task.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {task.description}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Due: {task.dueDate}
              </Typography>
            </Box>
            <IconButton color="error" onClick={() => deleteTask(task.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>

      <Dialog open={showTaskForm} onClose={resetTaskForm}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            type="text"
            fullWidth
            variant="outlined"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={2}
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Due Date"
            type="date"
            fullWidth
            variant="outlined"
            value={taskDueDate}
            onChange={(e) => setTaskDueDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={resetTaskForm} color="secondary">
            Cancel
          </Button>
          <Button onClick={addTask} color="primary" variant="contained" startIcon={<AddIcon />}>
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Card;
