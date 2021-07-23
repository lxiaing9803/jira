import { Kanban } from './../types/kanban';
import { useQuery } from 'react-query';
import { useHttp } from './http';

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();
  return useQuery<Kanban[], Error>(['kanbans', param], () =>
    client('kanbans', { data: param })
  );
};
