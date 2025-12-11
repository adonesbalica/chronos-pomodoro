let instance: TimerWorkManager | null;

export class TimerWorkManager {
  private worker: Worker;

  private constructor() {
    this.worker = new Worker(new URL('./timerWorker.js', import.meta.url));
  }

  static getIstance() {
    if (!instance) {
      instance = new TimerWorkManager();
    }
    return instance;
  }

  postMessage(message: any) {
    this.worker.postMessage(message);
  }

  onmessage(cb: (e: MessageEvent) => void) {
    this.worker.onmessage = cb;
  }

  terminate() {
    this.worker.terminate();
    instance = null;
  }
}
