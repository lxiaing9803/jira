import { useEffect } from 'react';
import { useAsync } from './use-async';
import { useHttp } from 'utils/http';
import { User } from 'screens/project-list/search-panel';
import { cleanObject } from 'utils';

export const useUsers = (param?: Partial<User>) => {
    const client = useHttp();
    const { run, ...result } = useAsync<User[]>()
    useEffect(() => {
        run(client('users', { data: cleanObject(param || {}) }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])

    return result
}