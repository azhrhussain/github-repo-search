import axios from 'axios';
import { Repository } from '../../../../types/Repository';

export interface SearchRepositoriesResponse {
  items: Repository[];
  total_count: number;
}

export const searchRepositories = async (query: string): Promise<SearchRepositoriesResponse> => {
  const response = await axios.get<SearchRepositoriesResponse>(
    `https://api.github.com/search/repositories?q=${query}`
  );
  return response.data;
};
