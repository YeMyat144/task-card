import React, { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from './Card';
import { Column as ColumnType, Card as CardType } from '../types';

type ColumnProps = {
  column: ColumnType;
  columns: ColumnType[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
};

const Column: React.FC<ColumnProps> = ({ column, columns, setColumns }) => {
  const theme = useTheme();
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
    <div style={{width:"30rem"}}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6" color="textPrimary">
          {column.title}
        </Typography>
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
          sx={{
            backgroundColor: theme.palette.background.default,
            '& .MuiOutlinedInput-root': {
              color: theme.palette.text.primary,
            },
          }}
        />
        <Button variant="contained" color="primary" onClick={addCard}>
          Add
        </Button>
      </Box>

      <Box display="flex" flexDirection="column" gap={1}>
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
          <Typography variant="body2" color="textSecondary">
            No cards available
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default Column;
