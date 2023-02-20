import React from 'react';
import { List, Tag, Typography } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { Repository } from '../../../../types/Repository';
import StyledRepoListItemBox, { StyledRepoListDetailsContainer, StyleStarContainer, StyledTagContainer } from './SearchBar.styled';
import { formatTimeElapsed } from '../../../../utils/normilizer';

interface RepositoryListItemProps {
  repository: Repository;
}

const { Text } = Typography;

const RepositoryListItem: React.FC<RepositoryListItemProps> = ({ repository }) => {
  return (
    <StyledRepoListItemBox key={`container-${repository.id}`}>
      <List.Item
        key={repository.id}
      >
        <List.Item.Meta
          title={<a href={repository.html_url}>{repository.full_name}</a>}
          description={<Text>{repository.description}</Text>}
        />
        <StyledRepoListDetailsContainer>
          <div>
            {repository.topics.map((topic) => {
              return <StyledTagContainer key={topic}>
                <a href={`https://github.com/topics/${topic}`} title={`Topic: ${topic}`} rel="noreferrer" target="_blank">
                  <Tag color="processing">{topic}</Tag>
                </a>
              </StyledTagContainer>
            })}
          </div>
          <div>
            <StyleStarContainer>
              <StarOutlined style={{ marginRight: 8 }} />{repository.stargazers_count}
            </StyleStarContainer>
            {repository.updated_at && formatTimeElapsed(repository.updated_at)}
          </div>
        </StyledRepoListDetailsContainer>
      </List.Item>
    </StyledRepoListItemBox>
  );
};

export default RepositoryListItem;
