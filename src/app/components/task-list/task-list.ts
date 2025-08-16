import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})

export class TaskList implements OnInit {
  private taskService = inject(TaskService);
  tasks: any[] = [];

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (response) => {
        this.tasks = response.content;
        console.log('Pobrano zadania w TaskList!', this.tasks);
      },
      error: (err) => {
        console.error('Błąd podczas pobierania zadań:', err);
      }
    });
  }
}
