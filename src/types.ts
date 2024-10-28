export type Task = {
    id: string;
    title: string;
    description?: string;
    dueDate?: string;
    label?: string;
    completed: boolean;
  };
  
  export type Column = {
    id: string;
    title: string;
    tasks: Task[];
  };
  