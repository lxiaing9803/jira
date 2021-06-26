import { Table } from 'antd'
import { User } from './search-panel';

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string
}

interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: ListProps) => {


  return <Table rowKey="id" pagination={false} columns={[{ title: '名称', dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name) }, {
    title: '负责人', render: (value) => {
      return <span>{users.find((user: User) => user.id === value.personId)?.name || '未知'}</span>
    }
  }]} dataSource={list} />
};
