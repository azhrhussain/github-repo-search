import React from 'react';
import { Layout, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import './App.css';
// import SearchRepository from './app/pages/SearchRepository';
import { Route, Routes } from 'react-router-dom';

const Search = React.lazy(()=>import('./app/pages/SearchRepository'));
const NotFound = React.lazy(()=>import('./app/pages/NotFound'));

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div className="App">
      <Layout>
        <Header>header</Header>
        <Content style={{ padding: '50px' }}>
          <div style={{ background: colorBgContainer }}>
            <Routes>
              <Route path='/' element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Search/>
                </React.Suspense>
              }></Route>
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </div>

  );
}

export default App;
