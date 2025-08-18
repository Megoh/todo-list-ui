import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskService} from '../../services/task.service';
import {Auth} from '../../services/auth';
import {Router} from '@angular/router';
import {TaskFormComponent} from '../task-form/task-form';
import {Task} from '../../models/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})

export class TaskList implements OnInit {
  private taskService = inject(TaskService);
  private auth = inject(Auth);
  private router = inject(Router)

  tasks: Task[] = [];
  selectedTask: Task | null = null;

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.taskService.getTasks().subscribe({
        next: (response) => {
          this.tasks = response.content;
          console.log('Pobrano zadania w TaskListComponent!', this.tasks);
        },
        error: (err) => {
          console.error('Błąd podczas pobierania zadań:', err);
        }
      });
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
    console.log('Wylogowano pomyślnie.');
  }

  onTaskCreated(newTask: Task): void {
    this.tasks.unshift(newTask);
    console.log('Lista zadań zaktualizowana o nowe zadanie.');
  }

  onEdit(task: Task): void {
    this.selectedTask = {...task};
    console.log('Wybrano zadanie do edycji:', this.selectedTask);
  }

  onTaskUpdated(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
    this.selectedTask = null;
    console.log('Lista zadań zaktualizowana po edycji.');
  }

  onDelete(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        console.log(`Zadanie o ID ${taskId} usunięte pomyślnie.`);
        this.tasks = this.tasks.filter(task => task.id !== taskId);
      },
      error: (err) => {
        console.error(`Błąd podczas usuwania zadania o ID ${taskId}:`, err);
      }
    });
  }
}
