import React, { useState } from 'react';
import { Box, TextField, Button, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
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

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6">{column.title}</Typography>
        <IconButton onClick={deleteColumn} color="error">
          <DeleteIcon />
        </IconButton>
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
          Add
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
