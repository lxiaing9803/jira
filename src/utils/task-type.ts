import { TaskType } from './../types/task-type';
import { useQuery } from 'react-query';
import { useHttp } from './http';

export const useTaskTypes = () => {
  const client = useHttp();
  return useQuery<TaskType[], Error>(['taskTypes'], () => client('taskTypes'));
};
