import HttpClient from './HttpClient';
import { NewTask, Task } from './types';

class API extends HttpClient {
  public constructor() {
    super(process.env.REACT_APP_API_BASE_URL);
  }

  public getTasks = () => this.instance.get<Task[]>('/');
  public removeTask = (id: number) => this.instance.delete(`/${id}`);

  // Post endpoint
  public newTask = (task: NewTask) => this.instance.post('/', task);
  public doneTask = (id: number) => this.instance.post(`/${id}/done`);
}

export const api = new API();
