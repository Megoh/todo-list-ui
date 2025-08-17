import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskService} from '../../services/task.service';
import {Auth} from '../../services/auth';
import {Router} from '@angular/router';
import {TaskFormComponent} from '../task-form/task-form';

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

  tasks: any[] = [];

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

  onTaskCreated(newTask: any): void {
    this.tasks.unshift(newTask);
    console.log('Lista zadań zaktualizowana o nowe zadanie.');
  }
}
