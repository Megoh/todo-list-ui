import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TaskService} from '../../services/task.service';
import {Task} from '../../models/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})

export class TaskFormComponent {
  @Input()
  set taskToEdit(task: Task | null) {
    if (task) {
      this.isEditing = true;
      this.currentTaskId = task.id;
      this.taskData = {title: task.title, description: task.description};
    }
  }

  taskData = {
    title: '',
    description: ''
  };
  isEditing = false;
  currentTaskId: number | null = null;

  @Output() taskCreated = new EventEmitter<Task>();
  @Output() taskUpdated = new EventEmitter<Task>();

  private taskService = inject(TaskService);

  onSubmit(): void {
    if (this.isEditing) {
      if (!this.currentTaskId) return;
      this.taskService.updateTask(this.currentTaskId, this.taskData).subscribe({
        next: (updatedTask) => {
          console.log('Zadanie zaktualizowane!', updatedTask);
          this.taskUpdated.emit(updatedTask);
          this.resetForm();
        },
        error: (err) => console.error('Błąd podczas aktualizacji:', err)
      });
    } else {
      this.taskService.createTask(this.taskData).subscribe({
        next: (createdTask) => {
          console.log('Zadanie stworzone!', createdTask);
          this.taskCreated.emit(createdTask);
          this.resetForm();
        },
        error: (err) => console.error('Błąd podczas tworzenia:', err)
      });
    }
  }

  resetForm(): void {
    this.isEditing = false;
    this.currentTaskId = null;
    this.taskData = { title: '', description: '' };
  }
}
