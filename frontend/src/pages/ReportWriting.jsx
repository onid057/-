import React from 'react';
import Button from '../components/common/Button';
import styled from 'styled-components';
import NavigationBar from '../components/common/NavigationBar';

const ReportWritingWrapper = styled.div`
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

const MainContent = styled.div`
  box-sizing: border-box;
  width: 294px;
  height: 264px;
  background-color: #ffffff;
  border-radius: 25px;
`;

function ReportWriting() {
  return (
    <ReportWritingWrapper>
      <NavigationBar
        leftContent={
          <img
            src={`${process.env.PUBLIC_URL}/images/left_arrow_no_tail.svg`}
            alt="left_arrow"
          />
        }
        centerContent={'정기 보고서'}
        rightContent={'완료'}
      ></NavigationBar>
      <ContentWrapper>
        <Button
          color="#FFFFFF"
          mode="IMAGE_UPLOAD"
          msg="매칭 요청 보내기"
        ></Button>
        <MainContent></MainContent>
        <Button color="#629AF9" mode="NORMAL_BLUE" msg="작성완료"></Button>
      </ContentWrapper>
    </ReportWritingWrapper>
  );
}

export default ReportWriting;
