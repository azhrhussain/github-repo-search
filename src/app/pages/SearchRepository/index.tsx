import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from 'react-router-dom';
import { Col, Pagination, Row } from "antd";
import RepositoryList from "../../components/molecules/RepositoryList";
import CenteredSpinner from "../../components/atoms/CenteredSpinner";
import { RootState } from "../../../store";
import SearchBar from "../../components/molecules/SearchBar";
import { fetchRepositories } from "./repositoriesSlice";
import { throttle } from "lodash";
import StyledComponentHeader, { StyledLine, StyledResultSortingHeader } from "../../components/atoms/ComponentHeader/ComponentHeader.styled";


export default function SearchRepository() {
  const [query, setQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchParams, setSearchParams] = useSearchParams();

  // Get a specific parameter
  const q = searchParams.get('q');

  // Log the searchParams object to see all query parameters
  console.log('searchParams:: ', searchParams, q);

  const dispatch: any = useDispatch();
  const { items, totalCount, loading, error } = useSelector((state: RootState) => state.repositories);

  const handleSearch = (query: string, page: number = currentPage || 1, pSize: number = pageSize || 10) => {
    console.log('pageSize:', pageSize)
    if (query !== '') {
      setSearchParams({ q: query, page: page.toString(), per_page: pSize.toString() });
      // setCurrentPage(page);
      // setPageSize(pSize);
      throttledSearch(query, page, pSize);
    }
  }

  // throttle the handleSearch function to be called only once every x time
  const throttledSearch = useCallback(
    throttle((value: string, page: number, pageSize: number) => {
      setLoading(true);
      dispatch(fetchRepositories(value, page, pageSize)).then(() => setLoading(false));
    }, 1000),
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


  const handlePageSizeChange = (page: number, pageSize: number): void => {

    const q = searchParams.get('q');
    let searchValue = '';
    if (q && q !== '') {
      searchValue = q;
    } else {
      searchValue = query
    }
    setSearchParams({ q: searchValue, page: page.toString(), per_page: pageSize.toString() });
    handleSearch(searchValue, page, pageSize);
    setPageSize(pageSize);
    setCurrentPage(page);
  }

  useEffect(() => {
    const q = searchParams.get('q');
    const per_page = searchParams.get('per_page');
    const page = searchParams.get('page');
    if (q && q !== '') {
      setQuery(q);
      handleSearch(q, Number(page), Number(per_page));
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
          {totalCount &&totalCount>0 ? (
            <>
              <StyledResultSortingHeader>
                <Row align={'middle'} gutter={32}>
                  <Col span={18}>
                    <h3>{totalCount} repository results</h3>
                  </Col>
                </Row>
                <StyledLine></StyledLine>
              </StyledResultSortingHeader>


              <RepositoryList loading={isLoading} repositories={items} />

              <Row gutter={16} justify="center" style={{ paddingBottom: 24 }}>
                <Col span={12}>
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
          ): <p>Please search repositories...!</p>}
        </>
      )}
      {error && <div>{error}</div>}
    </>
  );
}