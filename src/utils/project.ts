import { useHttp } from 'utils/http';
import { Project } from 'screens/project-list/list';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[], Error>(['projects', param], () =>
    client('projects', { data: param })
  );
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: 'PATCH',
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects'),
    }
  );
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        method: 'post',
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects'),
    }
  );
};
