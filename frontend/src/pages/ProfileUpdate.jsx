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

const ContentWrapper = styled.div``;

function ProfileUpdate({
  name,
  imageUrl,
  birth,
  email,
  phoneNumber,
  address,
  //   description,
  //   preferTag,
}) {
  const fileInputRef = useRef(null);

  // 절취선 ==========================================================================
  //   고객/집사 정보 조회 데이터 예시
  const UserInfo = [
    ['이름', '이수민'],
    ['생년월일', '2024-01-23'],
    ['이메일 주소', 'user3@ssafy.com'],
    ['휴대폰 번호', '01012345678'],
    ['집 주소', '서울시 강서구'],
  ];

  const description = '옆집 아줌마처럼 친근한 사람이예요! 동네에서 친해져요!';
  const preferTag = '산책하기#함께 장보기#병원 가기#자차 보유#요양보호사';
  // 절취선 ==========================================================================

  //   const UserInfo = [
  //     ['이름', name],
  //     ['생년월일', birth],
  //     ['이메일 주소', email],
  //     ['휴대폰 번호', phoneNumber],
  //     ['집 주소', address],
  //   ];

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

      <HorizontalLine
        marginTop={'10PX'}
        marginBottom={'8PX'}
        height={'1px'}
      ></HorizontalLine>

      <LongInputBox title={'자기소개'} placeholder={description}></LongInputBox>

      {/* 집사로 들어왔을 때만 선호 태그 수정 가능하게 */}
    </Wrapper>
  );
}

export default ProfileUpdate;
