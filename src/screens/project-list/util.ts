import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useHttp } from 'utils/http';
import { useUrlQueryParam } from 'utils/url';
import { Project } from './list';
import { useSearchParams } from 'react-router-dom';

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId']);
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    'projectCreate',
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    'editingProjectId',
  ]);
  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );
  const [_, setUrlParams] = useSearchParams();
  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setUrlParams({ projectCreate: '', editingProjectId: '' });

  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProject),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ['project', { id }],
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id),
    }
  );
};
