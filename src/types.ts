// types.ts

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  label: string; // Color for the task
  completed: boolean;
}

export interface Card {
  id: string;
  title: string;
  tasks: Task[];
  label: string; // Color for the card
  dueDate: string; // Can be used for card-level due date
}

export interface Column {
  id: string;
  title: string;
  cards: Card[]; // Each column will hold an array of cards
}
