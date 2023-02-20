import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from 'react-router-dom';
import { Col, Pagination, Row, Typography } from "antd";
import { throttle } from "lodash";

import { RootState } from "../../../store";
import RepositoryList from "../../components/molecules/RepositoryList";
import CenteredSpinner from "../../components/atoms/CenteredSpinner";
import SearchBar from "../../components/molecules/SearchBar";
import { fetchRepositories } from "../../feature/Repository/repositoriesSlice";
import StyledComponentHeader, { StyledLine, StyledResultSortingHeader } from "../../components/atoms/ComponentHeader/ComponentHeader.styled";
import { StyledWrapper } from "./index.styled";

const { Text } = Typography;

export default function SearchRepository() {
  const [query, setQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch: any = useDispatch();
  const { items, totalCount, loading, error } = useSelector((state: RootState) => state.repositories);

  const handleSearch = (query: string, page: number = currentPage || 1, pSize: number = pageSize || 10) => {
    if (query !== '') {
      throttledSearch(query, page, pSize);
    }
  }

  // throttle the handleSearch function to be called only once every x time
  const throttledSearch = useCallback(
    throttle((value: string, page: number, pageSize: number) => {
      setLoading(true);
      dispatch(fetchRepositories(value, page, pageSize)).then(() => setLoading(false));
    }, 1000), [query, currentPage, pageSize]
  );

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event?.target.value;
    setQuery(value || '');
  };


  const handlePageSizeChange = (page: number, pageSize: number): void => {
    const q = searchParams.get('q');
    let searchValue = '';
    if (q && q !== '') {
      searchValue = q;
    } else {
      searchValue = query
    }

    setSearchParams({ q: searchValue, page: page.toString(), per_page: pageSize.toString() });
    setPageSize(pageSize);
    setCurrentPage(page);
    handleSearch(searchValue, page, pageSize);
  }

  useEffect(() => {
    const q = searchParams.get('q');
    const per_page = searchParams.get('per_page');
    const page = searchParams.get('page');
    if (q && q !== '') {
      setQuery(q);
      handleSearch(q, Number(page) || currentPage, Number(per_page) || pageSize);
    }
  }, []);


  return (
    <>

      <StyledComponentHeader>

        <Row align={'middle'} gutter={32}>
          <Col span={18}>
            <h3>Search github Repositories</h3>
          </Col>
          <Col span={6}>
            <SearchBar onSearch={handleSearch} handleValueChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(e)} searchQuery={query} />
          </Col>

        </Row>
      </StyledComponentHeader>

      {loading ? (
        <CenteredSpinner />
      ) : (
        <>
          {items && items.length > 0 && (
            <>
              <StyledResultSortingHeader>
                <Row align={'middle'} gutter={32}>
                  <Col span={18}>
                    <h3>{totalCount} repository results for <strong>'{searchParams.get('q')}'</strong></h3>
                  </Col>
                </Row>
                <StyledLine></StyledLine>
              </StyledResultSortingHeader>

              <RepositoryList loading={isLoading} repositories={items} />

              <Row gutter={16} justify="center" style={{ paddingBottom: 24 }}>
                <Col>
                  <Pagination
                    onChange={(page: number, pageSize: number) => handlePageSizeChange(page, pageSize)}
                    defaultCurrent={1}
                    current={currentPage}
                    pageSize={pageSize}
                    //"Only the first 1000 search results are available by Github"
                    total={totalCount && totalCount > 1000 ? 1000 : totalCount}
                    pageSizeOptions={[5, 20, 50, 100]}
                  />
                </Col>
              </Row>
            </>
          )}
          {!error && searchParams.get('q') && !items.length && <StyledWrapper>
            <Text> We couldn’t find any repositories matching <strong>'{searchParams.get('q')}'</strong></Text>
          </StyledWrapper>}

        </>
      )}
      {error && !loading && !totalCount && <StyledWrapper><Text>{error}</Text></StyledWrapper>}
    </>
  );
}