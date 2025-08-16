import {Component, EventEmitter, inject, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})

export class TaskFormComponent {
  newTask = {
    title: '',
    description: ''
  };

  @Output() taskCreated = new EventEmitter<any>();

  private taskService = inject(TaskService);

  onSubmit(): void {
    this.taskService.createTask(this.newTask).subscribe({
      next: (createdTask) => {
        console.log('Zadanie stworzone pomyślnie!', createdTask);
        this.taskCreated.emit(createdTask);
        this.newTask.title = '';
        this.newTask.description = '';
      },
      error: (err) => {
        console.error('Błąd podczas tworzenia zadania:', err);
      }
    });
  }
}
