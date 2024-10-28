import React, { useState } from 'react';
import Column from '../Column/Column';
import { Column as ColumnType } from '../../types';
import './Board.css';

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
    <div className="board">
      <input
        type="text"
        value={newColumnName}
        onChange={(e) => setNewColumnName(e.target.value)}
        placeholder="Column name"
      />
      <button onClick={addColumn}>Add Column</button>

      <div className="columns-container">
        {columns.map((column) => (
          <Column key={column.id} column={column} columns={columns} setColumns={setColumns} />
        ))}
      </div>
    </div>
  );
};

export default Board;
