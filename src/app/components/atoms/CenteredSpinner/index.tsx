import React from 'react';
import { Spin } from 'antd';
import SpinnerWrapper from './SpinnerWrapper.styled';

const CenteredSpinner: React.FC = () => {
  return (
    <SpinnerWrapper>
      <Spin size="large" />
    </SpinnerWrapper>
  );
};

export default CenteredSpinner;
