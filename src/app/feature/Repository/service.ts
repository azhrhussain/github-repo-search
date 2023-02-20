import axios from 'axios';
import { Repository } from '../../../types/Repository';
import { REPOSITORY_API_URL } from '../../../utils/constants';

export interface SearchRepositoriesResponse {
  items: Repository[];
  total_count: number;
}

export const searchRepositories = async (query: string, page: number, pageSize:number): Promise<SearchRepositoriesResponse> => {
const  params= {
    q: query,
    per_page: pageSize,
    page:page,
  };
  const response = await axios.get<SearchRepositoriesResponse>(REPOSITORY_API_URL,{params:params});
  return response.data;
};
