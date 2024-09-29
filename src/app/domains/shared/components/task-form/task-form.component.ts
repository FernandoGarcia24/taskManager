  import { Component } from '@angular/core';
  import { CommonModule } from '@angular/common'
  import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl} from '@angular/forms';
  import { DetalleTareaService } from '../../../module/detalle-tarea.service';
  import { Router } from '@angular/router';
  import { ReactiveFormsModule } from '@angular/forms';
  import { RouterModule } from '@angular/router';

  @Component({
    selector: 'app-task-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './task-form.component.html',
    styleUrl: './task-form.component.css',
  })
  export class CrearTareaComponent  {

    taskForm: FormGroup;

    constructor(
      private fb: FormBuilder,
      private DetalleTareaService: DetalleTareaService,
      private router: Router
    ) {
      this.taskForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(5)]],
        deadline: ['', Validators.required],
        completed: [false],
        people: this.fb.array([], [Validators.required]),
      });
    }

    ngOnInit(): void {}

    get people(): FormArray {
      return this.taskForm.get('people') as FormArray;
    }

    newPerson(): FormGroup {
      return this.fb.group({
        name: [
          '',
          [Validators.required, Validators.minLength(5), this.uniqueNameValidator()],
        ],
        age: ['', [Validators.required, Validators.min(18)]],
        skills: this.fb.array([this.newSkill()], Validators.required),
      });
    }

    addPerson(): void {
      this.people.push(this.newPerson());
    }

    deletePerson(index: number): void {
      this.people.removeAt(index);
    }

    getSkills(indexPersona: number): FormArray {
      return this.people.at(indexPersona).get('skills') as FormArray;
    }

    newSkill(): FormGroup {
      return this.fb.group({
        ability: ['', Validators.required],
      });
    }

    addSkill(indexPersona: number): void {
      this.getSkills(indexPersona).push(this.newSkill());
    }

    deleteSkill(indexPersona: number, indexHabilidad: number): void {
      this.getSkills(indexPersona).removeAt(indexHabilidad);
    }

    uniqueNameValidator(): Validators {
      return (control: AbstractControl) => {
        const name = control.value;
        const names = this.people.controls.map((person) =>
          person.get('name')?.value
        );
        console.log("name: ", name)
        const ocurrencias = names.filter((n) => n === name).length;
        return ocurrencias > 1 ? { duplicateName: true } : null;
      };
    }

    onSubmit(): void {
      console.log('Formulario enviado');

      console.log('Valores del formulario:', this.taskForm.value);
      if (this.taskForm.valid) {
        const nuevaTarea = {
          id: Date.now(),
          ...this.taskForm.value,
        };

        console.log('Nueva tarea:', nuevaTarea);
        this.DetalleTareaService.addTask(nuevaTarea);
        this.router.navigate(['/tareas']);
      } else {
        console.log('Formulario no válido', this.taskForm.errors);
        this.taskForm.markAllAsTouched();
      }
    }
  }
