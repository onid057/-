import React from 'react';
import styled from 'styled-components';

const ReportWrapper = styled.div`
  width: 320px;
  height: 568px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.primary};
  line-height: 1.3;
`;

const ContentWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 430px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Upper = styled.div`
  width: 294px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;
const Lower = styled.div`
  width: 294px;
  height: 294px;
  border-radius: 25px;
  background-color: white;
`;

function Content({ name }) {
  return (
    <div>
      <p>{name} 님의</p>
      <p>보고서 작성을</p>
      <p>완료했어요!</p>
    </div>
  );
}

export default function ReportComplete() {
  return (
    <ReportWrapper>
      <ContentWrapper>
        <Upper>
          <Content name="장수민"></Content>
        </Upper>
        <Lower></Lower>
      </ContentWrapper>
    </ReportWrapper>
  );
}
