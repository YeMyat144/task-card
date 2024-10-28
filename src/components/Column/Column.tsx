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
        dueDate: '', // Can be set if needed
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
    <div className="column">
      <h2>{column.title}
        <button onClick={deleteColumn} style={{ marginLeft: '10px', color: 'red' }}>Delete Column</button>
      </h2>
      <div className="card-input">
        <input
          type="text"
          value={cardTitle}
          onChange={(e) => setCardTitle(e.target.value)}
          placeholder="Card name"
        />
        <button onClick={addCard}>Add Card</button>
      </div>
      <div className="cards-container">
  {column.cards && column.cards.length > 0 ? ( // Check if cards are defined and have length
    column.cards.map((card) => (
      <Card key={card.id} card={card} columnId={column.id} columns={columns} setColumns={setColumns} />
    ))
  ) : (
    <p>No cards available</p> // Optional: display a message if there are no cards
  )}
</div>

    </div>
  );
};

export default Column;
