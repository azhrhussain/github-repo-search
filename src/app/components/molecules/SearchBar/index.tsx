import React from "react";
import { Input } from "antd";
import StyledSearchBox from "./SearchBar.styled";

const { Search } = Input;

interface Props {
  onSearch: (query: string) => void;
  handleValueChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery:string;
}

const SearchBar: React.FC<Props> = ({onSearch, handleValueChange, searchQuery }) => {  
  return (
    <StyledSearchBox>
      <Search
        placeholder="Search for repositories"
        allowClear
        enterButton
        onSearch={onSearch}
        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleValueChange(e)}
        value={searchQuery}
      />
    </StyledSearchBox>
  );
};

export default SearchBar;
