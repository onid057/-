import React from 'react';
import Button from '../components/common/Button';
import styled from 'styled-components';

const TestHwangWrapper = styled.div`
  width: 320px;
  height: 568px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.primary};
  line-height: 1.3;
`;

function TestHwang() {
  return (
    <TestHwangWrapper>
      <h1>TestPage</h1>
      <Button
        color="#FFFFFF"
        mode="IMAGE_UPLOAD"
        msg="매칭 요청 보내기"
      ></Button>
    </TestHwangWrapper>
  );
}

export default TestHwang;
