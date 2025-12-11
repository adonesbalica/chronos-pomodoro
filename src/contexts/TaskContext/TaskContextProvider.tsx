import { useEffect, useReducer } from 'react';
import { TaskContext } from './TaskContext';
import { initialTaskState } from './initialStateTask';
import { taskReducer } from './taskReducer';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  useEffect(() => {}, []);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
