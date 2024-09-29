import { Routes } from '@angular/router';
import { CrearTareaComponent } from './domains/shared/components/task-form/task-form.component'
import { ListarTareasComponent } from './domains/shared/components/task-list/task-list.component'

export const routes: Routes =
[
  {
    path: '',
    component: CrearTareaComponent
  },
  {
    path: 'tareas',
    component: ListarTareasComponent
  }
];
