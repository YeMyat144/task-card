import React, { useState } from 'react';
import Column from './Column';
import { Column as ColumnType } from '../types';
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type BoardProps = {
  columns: ColumnType[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
};

const Board: React.FC<BoardProps> = ({ columns, setColumns }) => {
  const [newColumnName, setNewColumnName] = useState('');

  const addColumn = () => {
    if (newColumnName.trim()) {
      const newColumn: ColumnType = {
        id: Date.now().toString(),
        title: newColumnName,
        cards: [], // Initialize cards as an empty array
      };
      setColumns([...columns, newColumn]);
      setNewColumnName('');
    }
  };

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
      }}
    >

      <Box
        display="flex"
        alignItems="center"
        gap={2}
        sx={{ marginBottom: 3 }}
      >
        <TextField
          label="New Column"
          variant="outlined"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
          placeholder="Column name"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addColumn}
          startIcon={<AddIcon />}
          sx={{ height: 'fit-content', fontSize: '1.3rem' }}
        >
          Add
        </Button>
      </Box>

      <Grid container spacing={3}>
        {columns.map((column) => (
          <Grid item key={column.id} xs={12} sm={6} md={4} lg={3}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Column
                column={column}
                columns={columns}
                setColumns={setColumns}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Board;
