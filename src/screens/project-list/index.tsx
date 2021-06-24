import React, { useState, useEffect } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { cleanObject, useDebounce, useMount } from 'utils';
import { useHttp } from 'utils/http';

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  const debounceParam = useDebounce(param, 200);
  const client = useHttp()

  useEffect(() => {
    client('projects', { data: cleanObject(debounceParam) }).then(setList)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParam]);

  useMount(() => {
    client('users').then(setUsers)
  });

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </div>
  );
};
