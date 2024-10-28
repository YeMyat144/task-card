import React, { useState } from 'react';
import Column from './Column';
import { Column as ColumnType } from '../types';

type BoardProps = {
  columns: ColumnType[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
};

const Board: React.FC<BoardProps> = ({ columns, setColumns }) => {
  const [newColumnName, setNewColumnName] = useState('');
  const [filterColor, setFilterColor] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const addColumn = () => {
    if (newColumnName.trim()) {
      const newColumn: ColumnType = {
        id: Date.now().toString(),
        title: newColumnName,
        tasks: [],
      };
      setColumns([...columns, newColumn]);
      setNewColumnName('');
    }
  };

  const filteredColumns = columns.map((column) => ({
    ...column,
    tasks: column.tasks.filter(
      (task) =>
        (!filterColor || task.label === filterColor) &&
        (!searchTerm || task.title.toLowerCase().includes(searchTerm.toLowerCase()))
    ),
  }));

  return (
    <div>
      <input
        type="text"
        value={newColumnName}
        onChange={(e) => setNewColumnName(e.target.value)}
        placeholder="Column name"
      />
      <button onClick={addColumn}>Add Column</button>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search tasks"
      />
      <button onClick={() => { setFilterColor(''); setSearchTerm(''); }}>Clear Filters</button>

      <div style={{ display: 'flex', gap: '1rem' }}>
        {filteredColumns.map((column) => (
          <Column key={column.id} column={column} setColumns={setColumns} columns={columns} />
        ))}
      </div>
    </div>
  );
};

export default Board;
