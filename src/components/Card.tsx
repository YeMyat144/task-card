import React, { useState } from 'react';
import { Box, Typography, IconButton, Paper, Button, Checkbox, TextField, useTheme, Menu, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { Card as CardType, Column as ColumnType, Task as TaskType } from '../types';

type CardProps = {
  card: CardType;
  columnId: string;
  columns: ColumnType[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
};

const Card: React.FC<CardProps> = ({ card, columnId, columns, setColumns }) => {
  const theme = useTheme();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskLabel, setTaskLabel] = useState('#ffffff');
  const [isEditingCard, setIsEditingCard] = useState(false);
  const [cardTitle, setCardTitle] = useState(card.title);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
      col.id === columnId ? { ...col, cards: col.cards.filter(c => c.id !== card.id) } : col
    );
    setColumns(updatedColumns);
    setAnchorEl(null); // Close the menu
  };

  const deleteTask = (taskId: string) => {
    const updatedColumns = columns.map((col) =>
      col.id === columnId
        ? {
            ...col,
            cards: col.cards.map((c) =>
              c.id === card.id ? { ...c, tasks: c.tasks.filter((task) => task.id !== taskId) } : c
            ),
          }
        : col
    );
    setColumns(updatedColumns);
  };

  const toggleTaskCompletion = (taskId: string) => {
    const updatedColumns = columns.map((col) =>
      col.id === columnId
        ? {
            ...col,
            cards: col.cards.map((c) =>
              c.id === card.id
                ? {
                    ...c,
                    tasks: c.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)),
                  }
                : c
            ),
          }
        : col
    );
    setColumns(updatedColumns);
  };

  const saveCardTitle = () => {
    const updatedColumns = columns.map((col) =>
      col.id === columnId
        ? {
            ...col,
            cards: col.cards.map((c) => (c.id === card.id ? { ...c, title: cardTitle } : c)),
          }
        : col
    );

    setColumns(updatedColumns);
    setIsEditingCard(false);
    setAnchorEl(null); // Close the menu
  };

  const completedTasks = card.tasks.filter((task) => task.completed).length;

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper
      sx={{
        backgroundColor: theme.palette.background.paper,
        padding: 2,
        borderRadius: 2,
        marginBottom: 2,
        color: theme.palette.text.primary,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Box display="flex" alignItems="center" gap={1}>
          {isEditingCard ? (
            <TextField
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
              size="small"
              variant="outlined"
              autoFocus
            />
          ) : (
            <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
              {card.title}
            </Typography>
          )}
        </Box>

        <IconButton onClick={handleMenuClick} color="primary">
          <MoreHorizIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {isEditingCard ? (
            <MenuItem onClick={saveCardTitle}>
              <CheckIcon style={{ marginRight: '8px' }}/> Save Name
            </MenuItem>
          ) : (
            <MenuItem onClick={() => { setIsEditingCard(true); handleMenuClose(); }}>
              <EditIcon style={{ marginRight: '8px' }}/> Edit Name
            </MenuItem>
          )}
          <MenuItem onClick={deleteCard}>
            <DeleteIcon style={{ marginRight: '8px' }}/> Delete Card
          </MenuItem>
        </Menu>
      </Box>
      <Typography variant="body2" color="textSecondary">
        {completedTasks} / {card.tasks.length} Tasks Completed
      </Typography>

      {showTaskForm && (
        <Box mt={2} display="flex" flexDirection="column" gap={1}>
          <TextField
            label="Task Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            variant="outlined"
            fullWidth
            multiline
          />
          <TextField
            label="Due Date"
            type="date"
            value={taskDueDate}
            onChange={(e) => setTaskDueDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Button variant="contained" color="primary" onClick={addTask}>
              Add Task
            </Button>
          </Box>
        </Box>
      )}

      <Button onClick={() => setShowTaskForm(!showTaskForm)} sx={{ mt: 2 }}>
        {showTaskForm ? 'Cancel' : 'Add New Task'}
      </Button>

      <Box mt={2}>
        {card.tasks.map((task) => (
          <Box key={task.id} display="flex" alignItems="center" justifyContent="space-between" mt={1}>
            <Checkbox
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
              color="primary"
            />
            <Box flex={1}>
              <Typography
                variant="body1"
                sx={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: theme.palette.text.primary,
                }}
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
            <IconButton onClick={() => deleteTask(task.id)} color="error">
              <HorizontalRuleIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default Card;
