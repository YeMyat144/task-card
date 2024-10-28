import React, { useState } from 'react';
import Column from '../Column/Column';
import { Column as ColumnType } from '../../types';
import "./Board.css";

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
    <div className="board-container">
      <input
        type="text"
        className="board-input"
        value={newColumnName}
        onChange={(e) => setNewColumnName(e.target.value)}
        placeholder="Column name"
      />
      <button className="board-button" onClick={addColumn}>Add Column</button>

      <input
        type="text"
        className="board-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search tasks"
      />
      <button className="board-button clear-button" onClick={() => { setFilterColor(''); setSearchTerm(''); }}>
       Clear Filters
      </button>

      <div className="columns-container">
        {filteredColumns.map((column) => (
          <div className="column-card" key={column.id}>
            <Column column={column} setColumns={setColumns} columns={columns} />
          </div>
        ))}
      </div>
    </div>

  );
};

export default Board;
