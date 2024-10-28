export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export type Card = {
  id: string;
  title: string;
  tasks: Task[];
};

export type Column = {
  id: string;
  title: string;
  cards: Card[];
};
