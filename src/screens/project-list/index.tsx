import { useState } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { useDebounce, useDocumentTitle } from 'utils';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';

export const ProjectListScreen = () => {

  useDocumentTitle('项目列表', false)

  const [param, setParam] = useState({
    name: '',
    personId: '',
  });

  const debounceParam = useDebounce(param, 200);
  const { isLoading, error, data: list } = useProjects(debounceParam)
  const { data: users } = useUsers()

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? <Typography.Text type='danger'>{error.message}</Typography.Text> : null}
      <List users={users || []} dataSource={list || []} loading={isLoading} />
    </Container>
  );
};

const Container = styled.div`
padding: 3.2rem;
`
