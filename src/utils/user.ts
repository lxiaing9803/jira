import { useEffect } from 'react';
import { useAsync } from './use-async';
import { useHttp } from 'utils/http';
import { cleanObject } from 'utils';
import { User } from 'types/user';

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();
  useEffect(() => {
    run(client('users', { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
