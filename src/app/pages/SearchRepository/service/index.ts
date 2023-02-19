import axios from 'axios';
import { Repository } from '../../../../types/Repository';

export interface SearchRepositoriesResponse {
  items: Repository[];
  total_count: number;
}
const BASE_URL = 'https://api.github.com';

export const searchRepositories = async (query: string, page: number, pageSize:number): Promise<SearchRepositoriesResponse> => {
const  params= {
    q: query,
    per_page: pageSize,
    page:page,
  };
  const response = await axios.get<SearchRepositoriesResponse>(`${BASE_URL}/search/repositories`,{params:params});
  return response.data;
};
