import type { TaskStateModel } from '../../models/StateModel';
import type { TaskModel } from '../../models/TaskModel';

export enum TaskActionTypes {
  START_TASK = 'START_TASK',
  INTERRUPT_TASK = 'INTERRUPT_TASK',
  COUNT_DOWN = 'COUNT_DOWN',
  COMPLETE_TASK = 'COMPLETE_TASK',
}

export type TaskActionWithPayLoad =
  | {
      type: TaskActionTypes.START_TASK;
      payload: TaskModel;
    }
  | {
      type: TaskActionTypes.COUNT_DOWN;
      payload: Pick<TaskStateModel, 'secondsRemaining'>;
    };

export type TaskActionWithoutPayload =
  | {
      type: TaskActionTypes.INTERRUPT_TASK;
    }
  | {
      type: TaskActionTypes.COMPLETE_TASK;
    };

export type TaskActionModel = TaskActionWithPayLoad | TaskActionWithoutPayload;
