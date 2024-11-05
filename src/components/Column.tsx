import React, { useState } from 'react';
import { Box, TextField, Button, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Card from './Card';
import { Column as ColumnType, Card as CardType } from '../types';

type ColumnProps = {
  column: ColumnType;
  columns: ColumnType[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
};

const Column: React.FC<ColumnProps> = ({ column, columns, setColumns }) => {
  const [cardTitle, setCardTitle] = useState('');
  const [cardLabel, setCardLabel] = useState('#ffffff');
  const [isEditing, setIsEditing] = useState(false);
  const [columnName, setColumnName] = useState(column.title);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const deleteColumn = () => {
    setColumns(columns.filter((col) => col.id !== column.id));
  };

  const addCard = () => {
    if (cardTitle.trim()) {
      const newCard: CardType = {
        id: Date.now().toString(),
        title: cardTitle,
        tasks: [],
        label: cardLabel,
        dueDate: '',
      };
      const updatedColumns = columns.map((col) =>
        col.id === column.id ? { ...col, cards: [...col.cards, newCard] } : col
      );
      setColumns(updatedColumns);
      setCardTitle('');
      setCardLabel('#ffffff');
    }
  };

  const saveColumnName = () => {
    const updatedColumns = columns.map((col) =>
      col.id === column.id ? { ...col, title: columnName } : col
    );
    setColumns(updatedColumns);
    setIsEditing(false);
    setAnchorEl(null); // Close the menu
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          {isEditing ? (
            <TextField
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
              size="small"
              variant="outlined"
              autoFocus
            />
          ) : (
            <Typography variant="h6">{column.title}</Typography>
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
          {isEditing ? (
            <MenuItem
              onClick={saveColumnName} 
            >
              <CheckIcon style={{ marginRight: '8px' }}/> Save Name
            </MenuItem>
          ) : (
            <MenuItem
              onClick={() => {
                setIsEditing(true);
                handleMenuClose();
              }}
            >
              <EditIcon style={{ marginRight: '8px' }}/> Edit Name
            </MenuItem>
          )}
          <MenuItem
            onClick={() => {
              deleteColumn();
              handleMenuClose();
            }}
          >
            <CloseIcon style={{ marginRight: '8px' }}/> Delete Column
          </MenuItem>
        </Menu>
      </Box>

      <Box display="flex" gap={1} mb={2}>
        <TextField
          label="Card Title"
          value={cardTitle}
          onChange={(e) => setCardTitle(e.target.value)}
          variant="outlined"
          fullWidth
          size="small"
        />
        <Button variant="contained" color="primary" onClick={addCard}>
          +
        </Button>
      </Box>

      <Box>
        {column.cards.length > 0 ? (
          column.cards.map((card) => (
            <Card key={card.id} card={card} columnId={column.id} columns={columns} setColumns={setColumns} />
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No cards available
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Column;
