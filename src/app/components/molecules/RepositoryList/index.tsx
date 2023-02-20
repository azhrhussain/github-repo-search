import React from 'react';
import { List } from 'antd';
import { Repository } from '../../../../types/Repository';
import RepositoryListItem from '../RepositoryListItem.tsx';

interface RepositoryListProps {
  repositories: Repository[];
  loading: boolean;
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repositories, loading }) => {
  return (
    <List
      loading={loading}
      itemLayout="horizontal"
      dataSource={repositories}
      renderItem={(repository) => <RepositoryListItem repository={repository} />}
    />
  );
};

export default RepositoryList;