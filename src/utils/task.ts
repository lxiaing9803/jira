import { Task } from './../types/task';
import { QueryKey, useMutation, useQuery } from 'react-query';
import { useHttp } from './http';
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from './use-optimistic-options';
import { Project } from 'types/project';

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task[], Error>(['tasks', param], () =>
    client('tasks', { data: param })
  );
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        method: 'post',
        data: params,
      }),
    useAddConfig(queryKey)
  );
};

export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(['tasks', { id }], () => client(`tasks/${id}`), {
    enabled: Boolean(id),
  });
};

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: 'PATCH',
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: 'DELETE',
      }),
    useDeleteConfig(queryKey)
  );
};
