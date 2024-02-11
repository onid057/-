import React, { useRef, useState } from 'react';
import Button from '../../components/common/Button';
import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import ImageUploader from '../../components/common/ImageUploader';
import LongInputBox from '../../components/common/LongInputBox';

const ReportWritingWrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const ContentWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

function ReportWriting() {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    // input 태그 클릭
    fileInputRef.current.click();
  };
  const [showImages, setShowImages] = useState([]);
  const PlaceholderContent =
    '서비스의 현재 진행 상황을\n상세하게 알려주세요.\n특이사항이 있다면 알려주세요.';
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
      <ContentWrapper>
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
        <LongInputBox
          title={'내용'}
          placeholder={PlaceholderContent}
        ></LongInputBox>
        <Button color="#629AF9" mode="NORMAL_BLUE" msg="작성완료"></Button>
      </ContentWrapper>
    </ReportWritingWrapper>
  );
}

export default ReportWriting;
