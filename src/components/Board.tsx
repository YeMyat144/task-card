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
        display: 'flex',
        flexDirection: 'column', 
        padding: 2,
        gap: 2,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        height: '100%',
      }}
    >
      {/* Input for the new column name */}
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

      {/* Container for columns */}
      <Box
  sx={{
    display: 'flex',
    overflowX: 'auto',
    gap: 2,
    '&::-webkit-scrollbar': {
      height: '8px',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main,
      borderRadius: '4px',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
      transition: 'background-color 0.2s ease',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: theme.palette.grey[200],
      borderRadius: '4px',
    },
  }}
>
  {columns.map((column) => (
    <Box
      key={column.id}
      sx={{
        minWidth: '300px',
        flexShrink: 0,
        height: '74vh',
        overflowY: 'auto',
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: 2,
        padding: 2,
        backgroundColor: theme.palette.background.paper,
        '&::-webkit-scrollbar': {
          width: '8px',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.primary.main,
          borderRadius: '4px',
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
          transition: 'background-color 0.2s ease',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.grey[200],
          borderRadius: '4px',
        },
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
