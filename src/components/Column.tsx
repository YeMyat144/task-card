import React, { useState } from 'react';
import Card from './Card';
import { Column as ColumnType, Card as CardType } from '../types';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

type ColumnProps = {
  column: ColumnType;
  columns: ColumnType[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
};

const Column: React.FC<ColumnProps> = ({ column, columns, setColumns }) => {
  const [cardTitle, setCardTitle] = useState('');
  const [cardLabel, setCardLabel] = useState('#ffffff'); // Default label color

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
        dueDate: '', // Set as needed
      };

      const updatedColumns = columns.map((col) =>
        col.id === column.id ? { ...col, cards: [...col.cards, newCard] } : col
      );

      setColumns(updatedColumns);
      setCardTitle('');
      setCardLabel('#ffffff'); // Reset to default color
    }
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">{column.title}</Typography>
        <IconButton color="error" onClick={deleteColumn}>
          <DeleteIcon />
        </IconButton>
      </Box>

      <Divider sx={{ marginY: 1 }} />

      <Box display="flex" alignItems="center" gap={1} marginBottom={2}>
        <TextField
          label="New Card"
          variant="outlined"
          value={cardTitle}
          onChange={(e) => setCardTitle(e.target.value)}
          placeholder="Card name"
          size="small"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addCard}
          startIcon={<AddIcon />}
        >
          Add
        </Button>
      </Box>

      <Box>
        {column.cards && column.cards.length > 0 ? (
          column.cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              columnId={column.id}
              columns={columns}
              setColumns={setColumns}
            />
          ))
        ) : (
          <Typography color="textSecondary" variant="body2">
            No cards available
          </Typography>
        )}
      </Box>
    </>
  );
};

export default Column;
