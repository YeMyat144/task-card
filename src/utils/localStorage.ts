import { Column } from '../types';

const STORAGE_KEY = 'trello-clone-board';

export const saveBoard = (columns: Column[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
};

export const loadBoard = (): Column[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};
