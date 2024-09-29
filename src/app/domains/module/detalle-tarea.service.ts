import { Injectable, inject } from '@angular/core';
import { Task } from '../module/tasks/tasks.module';
import { BehaviorSubject, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetalleTareaService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) { }

  private tareasSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tareasSubject.asObservable();

  private tasks: Task[] = [];

  fetchTasks(): void {
    this.http.get<Task[]>(this.apiUrl).subscribe(
      (tasks: Task[]) => {
        this.tasks = [...this.tasks, ...tasks];
        this.tareasSubject.next(this.tasks);
      },
      (error) => console.error('Error fetching tasks:', error)
    );
  }

  getTasks(): Task[] {
    return this.tareasSubject.getValue();
  }

  addTask(task: Task): void {
    this.tasks.unshift(task);
    this.tareasSubject.next(this.tasks);
    this.http.post<Task>(this.apiUrl, task).subscribe(
      (response) => console.log('Tarea agregada a la API:', response),
      (error) => console.error('Error al agregar tarea a la API:', error)
    );
    console.log('Tarea agregada al servicio:', task);
  }

  updateTask(taskUpdated: Task): void {
    const index = this.tasks.findIndex((t) => t.id === taskUpdated.id);
    if (index !== -1) {
      this.tasks[index] = taskUpdated;
      this.tareasSubject.next(this.tasks);

      this.http.put(`${this.apiUrl}/${taskUpdated.id}`, taskUpdated).subscribe(
      (response) => console.log('Tarea actualizada en la API:', response),
      (error) => console.error('Error al actualizar tarea en la API:', error)
      );
    }
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
    this.tareasSubject.next(this.tasks);

    this.http.delete(`${this.apiUrl}/${taskId}`).subscribe(
      (response) => console.log('Tarea eliminada de la API:', response),
      (error) => console.error('Error al eliminar tarea de la API:', error)
    );
  }

  obtenerTareaPorId(taskId: number): Task | undefined {
    return this.tasks.find(t => t.id === taskId);
  }

}
