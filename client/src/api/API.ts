import HttpClient from './HttpClient';
import { Task } from './types';

class API extends HttpClient {
  public constructor() {
    super(process.env.REACT_APP_API_BASE_URL);
  }

  public getTasks = () => this.instance.get<Task[]>('/');
  public removeTask = (id: number) => this.instance.delete(`/${id}`);
  public updateTask = (id: number, task: Task) => this.instance.post(`/${id}`, task);

  // Post endpoint
  public newTask = (task: Task) => this.instance.post('/', task);
  public doneTask = (id: number) => this.instance.post(`/${id}/done`);
}

export const api = new API();
