import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getDetailZipsaInfo,
  updateZipsaInfo,
} from '../../apis/api/zipsaMyPage';
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
  padding: 0px 16px 20px;
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

function ProfileUpdate() {
  const fileInputRef = useRef(null);

  const handleImageClick = e => {
    // input 태그 클릭
    e.stopPropagation();
    fileInputRef.current.click();
  };
  const [zipsaData, setZipsaData] = useState();
  const [showImages, setShowImages] = useState([]);
  const [detail, setDetail] = useState();
  const [preferTags, setPreferTags] = useState();

  const navigate = useNavigate();
  const onPrevious = () => {
    navigate(-1);
  };

  useEffect(() => {
    getDetailZipsaInfo(0).then(response => {
      const tagString = response.data.preferTag;
      console.log(response);
      setZipsaData(response.data);
      setPreferTags(tagString.split('#'));
    });
  }, []);

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
        onNext={async () => {
          await updateZipsaInfo(detail, preferTags.join('#')).then(response => {
            console.log(response);
          });
          navigate('/myPage');
        }}
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

      <InfoWrapper>
        <BoldText fontSize={'17px'} normalContent={'이름'}></BoldText>
        <BoldText fontSize={'17px'} boldContent={zipsaData?.name}></BoldText>
      </InfoWrapper>
      <InfoWrapper>
        <BoldText fontSize={'17px'} normalContent={'생년월일'}></BoldText>
        <BoldText fontSize={'17px'} boldContent={zipsaData?.birth}></BoldText>
      </InfoWrapper>
      <InfoWrapper>
        <BoldText fontSize={'17px'} normalContent={'이메일 주소'}></BoldText>
        <BoldText fontSize={'17px'} boldContent={zipsaData?.email}></BoldText>
      </InfoWrapper>
      <InfoWrapper>
        <BoldText fontSize={'17px'} normalContent={'휴대폰 번호'}></BoldText>
        <BoldText
          fontSize={'17px'}
          boldContent={zipsaData?.phoneNumber}
        ></BoldText>
      </InfoWrapper>
      <InfoWrapper>
        <BoldText fontSize={'17px'} normalContent={'집 주소'}></BoldText>
        <BoldText fontSize={'17px'} boldContent={zipsaData?.address}></BoldText>
      </InfoWrapper>

      <HorizontalLine
        marginTop={'10px'}
        marginBottom={'10px'}
        height={'2px'}
      ></HorizontalLine>

      <LongInputBox
        title={'자기소개'}
        value={zipsaData?.description}
        onChange={event => setDetail(event.target.value)}
      ></LongInputBox>

      <ZipsaTagUpdate
        preferTag={preferTags}
        setPreferTags={setPreferTags}
      ></ZipsaTagUpdate>
    </Wrapper>
  );
}

export default ProfileUpdate;
