import React, { useRef, useState, useEffect } from 'react';
import Button from '../../components/common/Button';
import styled from 'styled-components';
import Image from '../../components/common/Image';
import NavigationBar from '../../components/common/NavigationBar';
import ImageUploader from '../../components/common/ImageUploader';
import LongInputBox from '../../components/common/LongInputBox';
import { useNavigate, useParams } from 'react-router';
import { sendReportData } from '../../apis/api/report';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const Blank = styled.div`
  width: 28px;
`;

const ContentWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 5px;
`;

function ReportWriting() {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    // input 태그 클릭
    fileInputRef.current.click();
  };
  const [imageFile, setImageFile] = useState(null);
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  const PlaceholderContent =
    '서비스의 현재 진행 상황을\n상세하게 알려주세요.\n특이사항이 있다면 알려주세요.';

  const { roomId } = useParams();
  const navigate = useNavigate();
  const onPrevious = () => {
    navigate(-1);
  };

  const onClickButton = () => {
    if (imageFile && content) {
      sendReportData(imageFile, roomId, content).then(response => {
        navigate('/reportComplete');
      });
    }
  };

  useEffect(() => {
    if (imageFile) {
      setImageUrl(URL.createObjectURL(imageFile));
    }
  }, [imageFile]);

  return (
    <Wrapper>
      <NavigationBar
        leftContent={
          <Image
            width="40px"
            height="40px"
            margin="0 0 0 -12px"
            src={process.env.PUBLIC_URL + '/images/left_arrow.svg'}
          ></Image>
        }
        centerContent={'정기 보고서 작성'}
        rightContent={<Blank></Blank>}
        onPrevious={onPrevious}
      ></NavigationBar>
      <ContentWrapper>
        <ImageWrapper>
          <ImageUploader
            setImageFile={setImageFile}
            fileInputRef={fileInputRef}
            children={
              imageFile ? (
                <Button
                  mode={'IMAGE_EDIT'}
                  children={'수정하기'}
                  onClick={handleButtonClick}
                ></Button>
              ) : (
                <Button
                  mode={'IMAGE_UPLOAD'}
                  children={'사진 첨부하기'}
                  onClick={handleButtonClick}
                ></Button>
              )
            }
          ></ImageUploader>
          {imageUrl && (
            <Image src={imageUrl} width={'100%'} height={'200px'}></Image>
          )}
        </ImageWrapper>
        <LongInputBox
          title={'내용'}
          placeholder={PlaceholderContent}
          value={content}
          onChange={event => setContent(event.target.value)}
        ></LongInputBox>
        <Button
          mode={imageFile && content ? 'THICK_BLUE' : 'THICK_GRAY'}
          onClick={onClickButton}
        >
          작성 완료
        </Button>
      </ContentWrapper>
    </Wrapper>
  );
}

export default ReportWriting;
