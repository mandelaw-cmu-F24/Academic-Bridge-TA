declare module "@testing-library/jest-dom";

interface Task {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

type TaskContextType = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
};

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}
