export interface Project {
  id: string;
  name: string;
}

export interface Milestone {
  id: string;
  title: string;
  description?: string;
  startDate?: Date;
  dueDate?: Date;
}

export interface Issue {
  id: string;
  iid: string;
  title: string;
  labels?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  dueDate?: Date;
  state?: string;
  progress?: TimeStatus;
}

export interface TimeStatus {
  spentTime?: number;
  estimatedTime?: number;
  spentTimeSting?: string;
  estimatedTimeString?: string;
}