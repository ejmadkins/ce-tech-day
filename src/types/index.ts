export type Priority = "low" | "medium" | "high";
export type Recurrence = "none" | "daily" | "weekly" | "monthly";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  category: string;
  dueDate?: string;
  recurrence?: Recurrence;
  createdAt: number;
}
