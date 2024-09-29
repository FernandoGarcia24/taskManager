import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Task, Person } from '../../../module/tasks/tasks.module';
import { DetalleTareaService } from '../../../module/detalle-tarea.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class ListarTareasComponent {

  tasks: Task[] = [];
  PersonasAsignadas: Person[] = [];
  filtro: string = 'todas';

  constructor(private detalleTareasService: DetalleTareaService) {}

  ngOnInit(): void {
    this.detalleTareasService.fetchTasks();
    console.log('Tareas:', this.tasks);

    this.detalleTareasService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
      console.log('Tareas combinadas:', this.tasks);
    });
  }

  get filteredTasks(): Task[] {
    if (this.filtro === 'completadas') {
      return this.tasks.filter((task) => task.completed);
    } else if (this.filtro === 'pendientes') {
      return this.tasks.filter((task) => !task.completed);
    } else {
      return this.tasks;
    }
  }

  changeFilter(nuevoFiltro: string): void {
    this.filtro = nuevoFiltro;
  }

  markasCompleted(task: Task): void {
    task.completed = !task.completed;
    this.detalleTareasService.updateTask(task);
  }
}
