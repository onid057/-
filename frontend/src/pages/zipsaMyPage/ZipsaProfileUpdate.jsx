import styled from 'styled-components';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/common/NavigationBar';
import Paragraph from '../../components/common/Paragraph';
import BoldText from '../../components/common/BoldText';
import Image from '../../components/common/Image';
import ImageUploader from '../../components/common/ImageUploader';
import LongInputBox from '../../components/common/LongInputBox';
import HorizontalLine from '../../components/common/HorizontalLine';
import ZipsaTagUpdate from '../../components/zipsamypage/ZipsaTagUpdate';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0px 16px 50px;
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

// (세부)집사 정보조회 API 호출
const zipsaData = {
  name: 'user3',
  email: 'user3@ssafy.com',
  phoneNumber: null,
  birth: '1980-01-30T02:09:41.000+00:00',
  gender: 'MAN',
  address: '서울시 강서구',
  profileImage: null,
  latitude: 37.54815556,
  longitude: 126.851675,
  gradeId: 1,
  gradeName: 'APPRENTICE',
  salary: 5000,
  description: '열심히 하겠습니다.',
  preferTag: '산책하기#함께 장보기#병원 가기#자차 보유#요양보호사',
  serviceCount: 1,
  replyAverage: 0.0,
  replyCount: 0,
  kindnessAverage: 110.0,
  skillAverage: 110.0,
  rewindAverage: 110.0,
  subCategory: ['병원 동행', '동네 산책'],
};

// map 함수 돌기 위해 리스트로 만들기
const zipsaInfo = [
  ['이름', zipsaData.name],
  ['생년월일', zipsaData.birth],
  ['이메일 주소', zipsaData.email],
  ['휴대폰 번호', zipsaData.phoneNumber],
  ['집 주소', zipsaData.address],
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

  // preferTag 업데이트 위한 변수 선언
  const [preferTags, setPreferTags] = useState(zipsaData.preferTag);
  console.log('ProfileUpdate에서 내려준 preferTags: ', preferTags);

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
                  zipsaData.profileImage ||
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

      {zipsaInfo.map((content, idx) => (
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
        placeholder={zipsaData.description}
      ></LongInputBox>

      <ZipsaTagUpdate
        preferTag={preferTags}
        setPreferTags={setPreferTags}
      ></ZipsaTagUpdate>
    </Wrapper>
  );
}

export default ProfileUpdate;
