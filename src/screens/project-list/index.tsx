import { useState, useEffect } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { cleanObject, useDebounce, useMount } from 'utils';
import { useHttp } from 'utils/http';
import styled from '@emotion/styled';
import { Typography } from 'antd';

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null)

  const debounceParam = useDebounce(param, 200);
  const client = useHttp()

  useEffect(() => {
    setIsLoading(true)
    client('projects', { data: cleanObject(debounceParam) })
      .then(setList)
      .catch(error => {
        setList([])
        setError(error)
      })
      .finally(() => setIsLoading(false))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParam]);

  useMount(() => {
    client('users').then(setUsers)
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      {error ? <Typography.Text type='danger'>{error.message}</Typography.Text> : null}
      <List users={users} dataSource={list} loading={isLoading} />
    </Container>
  );
};

const Container = styled.div`
padding: 3.2rem;
`
