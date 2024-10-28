import React, { useState, useEffect } from 'react';
import Board from './components/Board/Board';
import { loadBoard, saveBoard } from './utils/localstorage';
import { Column } from './types';

const App: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>(loadBoard);

  useEffect(() => {
    saveBoard(columns);
  }, [columns]);

  return (
    <div>
      <h1>Trello Clone</h1>
      <Board columns={columns} setColumns={setColumns} />
    </div>
  );
};

export default App;
