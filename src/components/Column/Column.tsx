import React, { useState } from 'react';
import Card from '../Card/Card';
import { Column as ColumnType, Card as CardType } from '../../types';
import './column.css';

type ColumnProps = {
  column: ColumnType;
  columns: ColumnType[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
};

const Column: React.FC<ColumnProps> = ({ column, columns, setColumns }) => {
  const [newCardTitle, setNewCardTitle] = useState('');

  const addCard = () => {
    if (newCardTitle.trim()) {
      const newCard: CardType = {
        id: Date.now().toString(),
        title: newCardTitle,
        tasks: [],
      };
      const updatedColumns = columns.map((col) =>
        col.id === column.id ? { ...col, cards: [...col.cards, newCard] } : col
      );
      setColumns(updatedColumns);
      setNewCardTitle('');
    }
  };

  // Debugging: log the column object
  console.log('Column:', column);
  
  // Defensive check to ensure column.cards is defined
  if (!column.cards) {
    console.error('No cards found for column:', column);
    return null; // or a fallback UI
  }

  return (
    <div className="column">
      <h2>{column.title}</h2>
      <div className="cards-container">
        {column.cards.map((card) => (
          <Card key={card.id} card={card} columnId={column.id} columns={columns} setColumns={setColumns} />
        ))}
      </div>
      <input
        type="text"
        value={newCardTitle}
        onChange={(e) => setNewCardTitle(e.target.value)}
        placeholder="Card title"
      />
      <button onClick={addCard}>Add a card</button>
    </div>
  );
};

export default Column;
