import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import NavigationBar from '../components/common/NavigationBar';
import BoldText from '../components/common/BoldText';
import Image from '../components/common/Image';
import ImageUploader from '../components/common/ImageUploader';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
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

const EditImageButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: relative;
`;

const PlusImageWrapper = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  z-index: 999;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background-image: url(${process.env.PUBLIC_URL}/images/plus.svg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
`;

const ImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
`;
const InfoWrapper = styled.div`
  width: 270px;
  font-size: 17px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 15px;
`;

const StyledHr = styled.hr`
  width: 288px;
  border-bottom: 1px solid #d9d9d9;
`;

const ContentWrapper = styled.div``;

function ProfileUpdate({ name, imageUrl, birth, email, phoneNumber, address }) {
  const fileInputRef = useRef(null);

  const UserInfo = [
    ['이름', name],
    ['생년월일', birth],
    ['이메일 주소', email],
    ['휴대폰 번호', phoneNumber],
    ['집 주소', address],
  ];

  const handleImageClick = e => {
    // input 태그 클릭
    e.stopPropagation();
    fileInputRef.current.click();
  };
  const [showImages, setShowImages] = useState([]);

  const navigate = useNavigate();
  const onPrevious = () => {
    navigate(-1);
  };

  return (
    <Wrapper>
      <NavigationBar
        leftContent={
          <Image
            src={`${process.env.PUBLIC_URL}/images/keyboard_arrow_left.svg`}
            width={'40px'}
            height={'40px'}
            margin={'0 0 0 -12px'}
          ></Image>
        }
        centerContent={
          <BoldText
            fontSize={'18px'}
            boldContent={name}
            normalContent={'님의 정보'}
          ></BoldText>
        }
        rightContent={'수정'}
        onPrevious={onPrevious}
      ></NavigationBar>

      <ImageUploader
        showImages={showImages}
        setShowImages={setShowImages}
        fileInputRef={fileInputRef}
        children={
          <EditImageButton onClick={handleImageClick}>
            <ImageWrapper>
              <Image
                src={
                  imageUrl ||
                  showImages[0] ||
                  `${process.env.PUBLIC_URL}/images/profile_img.svg`
                }
                width={'60px'}
                height={'60px'}
                margin={'0'}
              ></Image>
            </ImageWrapper>
            <PlusImageWrapper></PlusImageWrapper>
          </EditImageButton>
        }
      ></ImageUploader>
      {UserInfo.map((content, idx) => (
        <InfoWrapper key={idx}>
          <BoldText fontSize={'17px'} normalContent={content[0]}></BoldText>
          <BoldText fontSize={'17px'} boldContent={content[1]}></BoldText>
        </InfoWrapper>
      ))}
      <StyledHr></StyledHr>
      <ContentWrapper>자기소개글 작성하기!</ContentWrapper>
    </Wrapper>
  );
}

export default ProfileUpdate;
