import HttpClient from './HttpClient';
import { NewTask, Task } from './types';

class API extends HttpClient {
  public constructor() {
    super(process.env.REACT_APP_API_BASE_URL);
  }

  public getTasks = () => this.instance.get<Task[]>('/');
  public newTask = (task: NewTask) => this.instance.post('/', task);
  public deleteTask = (id: number) => this.instance.delete(`/${id}`);
  public taskDone = (id: number) => this.instance.post(`/${id}/done`);
}

export const api = new API();
