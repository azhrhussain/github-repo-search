import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "antd";
import RepositoryList from "../../components/molecules/RepositoryList";
import CenteredSpinner from "../../components/atoms/CenteredSpinner";
import { RootState } from "../../../store";
import SearchBar from "../../components/molecules/SearchBar";
import { fetchRepositories } from "./repositoriesSlice";
import { throttle } from "lodash";
import StyledComponentHeader from "../../components/atoms/ComponentHeader/ComponentHeader.styled";


export function SearchRepository() {
  const [query, setQuery] = useState('');
  const [isLoading, setLoading] = useState(false);


  const dispatch: any = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.repositories);

  const handleSearch = (query: string) => {
    if (query !== '') {
      throttledSearch(query);
    }
  };

  // throttle the handleSearch function to be called only once every x time
  const throttledSearch = useCallback(
    throttle((value: string) => {
      setLoading(true);
      dispatch(fetchRepositories(value)).then(() => setLoading(false));
    }, 5000),
    []
  );

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement> | string) => {
    let value;
    if (typeof event !== 'string') {
      value = event.target.value;
    } else {
      value = event;
    }
    setQuery(value);
  };

  return (
    <>
      <StyledComponentHeader>
        <Row align={'middle'}  gutter={32}>
          <Col span={18}>
            <h3>Search github Repositories</h3>
          </Col>
          <Col span={6}>
            <SearchBar onSearch={handleSearch} handleValueChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(e)} searchQuery={query} />
          </Col>

        </Row>
        <hr />
      </StyledComponentHeader>

      {loading ? (
        <CenteredSpinner />
      ) : (
        <RepositoryList loading={isLoading} repositories={items} />
      )}
      {error && <div>{error}</div>}
    </>
  );
}