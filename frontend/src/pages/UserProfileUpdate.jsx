import styled from 'styled-components';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/common/NavigationBar';
import Paragraph from '../components/common/Paragraph';
import BoldText from '../components/common/BoldText';
import Image from '../components/common/Image';
import ImageUploader from '../components/common/ImageUploader';
import LongInputBox from '../components/common/LongInputBox';
import HorizontalLine from '../components/common/HorizontalLine';
import ZipsaTagUpdate from '../components/zipsamypage/ZipsaTagUpdate';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
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

// 회원 상세 정보조회 API 호출
const UserData = {
  name: 'user3',
  email: 'user3@ssafy.com',
  phoneNumber: null,
  birth: '1980-01-30T02:09:41.000+00:00',
  gender: 'MAN',
  address: '서울시 강서구',
  profileImage: null,
  description: '열심히 하겠습니다.',
};

const userInfo = [
  ['이름', UserData.name],
  ['생년월일', UserData.birth],
  ['이메일 주소', UserData.email],
  ['휴대폰 번호', UserData.phoneNumber],
  ['집 주소', UserData.address],
];

function ProfileUpdate() {
  const fileInputRef = useRef(null);

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
        rightContent={'완료'}
        onPrevious={onPrevious}
      ></NavigationBar>

      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={['내 정보 수정하기']}
      ></Paragraph>

      <ImageUploader
        showImages={showImages}
        setShowImages={setShowImages}
        fileInputRef={fileInputRef}
        children={
          <EditImageButton onClick={handleImageClick}>
            <ImageWrapper>
              <Image
                src={
                  UserData.profileImage ||
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

      {userInfo.map((content, idx) => (
        <InfoWrapper key={idx}>
          <BoldText fontSize={'17px'} normalContent={content[0]}></BoldText>
          <BoldText fontSize={'17px'} boldContent={content[1]}></BoldText>
        </InfoWrapper>
      ))}

      <HorizontalLine
        marginTop={'10PX'}
        marginBottom={'8PX'}
        height={'1px'}
      ></HorizontalLine>

      <LongInputBox
        title={'자기소개'}
        placeholder={UserData.description}
      ></LongInputBox>
    </Wrapper>
  );
}

export default ProfileUpdate;
