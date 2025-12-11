import { useEffect, useReducer, useRef } from 'react';
import { TaskContext } from './TaskContext';
import { initialTaskState } from './initialStateTask';
import { taskReducer } from './taskReducer';
import { TimerWorkManager } from '../../workers/TimerWorkManager';
import { TaskActionTypes } from './taskActions';
import { loadBeep } from '../../utils/loadBeep';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  let playBeepRef = useRef<ReturnType<typeof loadBeep>>(null);

  const worker = TimerWorkManager.getIstance();

  worker.onmessage(e => {
    const countDownSeconds = e.data;

    if (countDownSeconds <= 0) {
      if (playBeepRef.current) {
        playBeepRef.current();
        playBeepRef.current = null;
      }

      dispatch({
        type: TaskActionTypes.COMPLETE_TASK,
      });

      worker.terminate();
    } else {
      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
  });

  useEffect(() => {
    if (!state.activeTask) {
      worker.terminate();
    } else {
      playBeepRef.current = null;
    }

    worker.postMessage(state);
  }, [worker, state]);

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
