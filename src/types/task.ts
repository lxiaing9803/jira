export interface Task {
  id: number;
  name: string;
  // 经办人ID
  processorId: number;
  projectId: number;
  // 任务组ID
  epicId: number;
  kanbanId: number;
  // bug or task
  typeId: number;
  note: string;
}
