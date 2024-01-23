import React, { useRef, useState } from 'react';
import Button from '../components/common/Button';
import styled from 'styled-components';
import NavigationBar from '../components/common/NavigationBar';
import ImageUploader from '../components/common/ImageUploader';
import LongInputBox from '../components/common/LongInputBox';

const ReportWritingWrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

// const ContentWrapper = styled.div`
//   box-sizing: border-box;
//   width: 100%;
//   height: 518px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: center;
// `;

// const MainContent = styled.div`
//   box-sizing: border-box;
//   width: 294px;
//   height: 264px;
//   background-color: #ffffff;
//   border-radius: 25px;
// `;

function ReportWriting() {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    // input 태그 클릭
    fileInputRef.current.click();
  };
  const [showImages, setShowImages] = useState([]);

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
        rightContent={' '}
      ></NavigationBar>
      <ImageUploader
        showImages={showImages}
        setShowImages={setShowImages}
        fileInputRef={fileInputRef}
        Children={
          showImages.length ? (
            <Button
              color="#FFFFFF"
              mode="IMAGE_EDIT"
              msg="수정하기"
              onClick={handleButtonClick}
            ></Button>
          ) : (
            <Button
              color="#FFFFFF"
              mode="IMAGE_UPLOAD"
              msg="사진 첨부하기"
              onClick={handleButtonClick}
            ></Button>
          )
        }
      ></ImageUploader>
      <LongInputBox title={''} placeholder={'hi'}></LongInputBox>
      <Button color="#629AF9" mode="NORMAL_BLUE" msg="작성완료"></Button>
    </ReportWritingWrapper>
  );
}

export default ReportWriting;
