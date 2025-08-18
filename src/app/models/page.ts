import {Task} from './task';

export interface Page {
  content: Task[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
