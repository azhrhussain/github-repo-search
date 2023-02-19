import React from 'react';
import { Layout, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import './App.css';
import { SearchRepository } from './app/pages/SearchRepository';

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
            <SearchRepository />
          </div>
        </Content>
      </Layout>
    </div>

  );
}

export default App;
