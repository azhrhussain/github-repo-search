import React from "react";
import { Input } from "antd";
import { useSearchParams } from 'react-router-dom';
import StyledSearchBox from "./SearchBar.styled";

const { Search } = Input;

interface Props {
  onSearch: (query: string) => void;
  handleValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
}

const SearchBar: React.FC<Props> = ({ onSearch, handleValueChange, searchQuery }) => {
  const [, setSearchParams] = useSearchParams();
  const handleSearch = () => {
    setSearchParams({ q: searchQuery });
    onSearch(searchQuery);
  }
  return (
    <StyledSearchBox>
      <Search
        placeholder="Search for repositories"
        allowClear
        enterButton
        onSearch={(value: string) => { value !== '' && handleSearch() }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(e)}
        value={searchQuery}
        onPressEnter={(event: React.KeyboardEvent<HTMLInputElement>) => {
          const value = event.currentTarget.value;
          if (value !== '') {
            handleSearch();
          }
        }}
      />
    </StyledSearchBox>
  );
};

export default SearchBar;
