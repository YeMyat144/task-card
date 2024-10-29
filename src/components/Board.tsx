import React, { useState } from 'react';
import { Box, TextField, Button, useTheme } from '@mui/material';
import Column from './Column';
import { Column as ColumnType } from '../types';

type BoardProps = {
  columns: ColumnType[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
};

const Board: React.FC<BoardProps> = ({ columns, setColumns }) => {
  const theme = useTheme();
  const [newColumnName, setNewColumnName] = useState('');

  const addColumn = () => {
    if (newColumnName.trim()) {
      const newColumn: ColumnType = {
        id: Date.now().toString(),
        title: newColumnName,
        cards: [],
      };
      setColumns([...columns, newColumn]);
      setNewColumnName('');
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        overflowX: 'hidden',
      }}
    >

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', marginBottom: 2 }}>
        <TextField
          label="Column name"
          variant="outlined"
          size="small"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
        />
        <Button variant="contained" onClick={addColumn}>
          Add Column
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto', // Allows horizontal scrolling
          paddingBottom: 1,
          scrollbarWidth: 'none', // Hide scrollbar for Firefox
          '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar for Chrome/Safari
        }}
      >
        {columns.map((column) => (
          <Box
            key={column.id}
            sx={{
              minWidth: '300px', // Set a fixed minimum width for columns
              flexShrink: 0, // Prevents columns from shrinking
              marginRight: 2, // Space between columns
              border: `1px solid ${theme.palette.divider}`, // Add border
              borderRadius: 2, // Optional: round corners of the column
              backgroundColor: theme.palette.background.paper, // Background color for the column
              padding: 1, // Inner padding for column content
            }}
          >
            <Column column={column} columns={columns} setColumns={setColumns} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Board;
