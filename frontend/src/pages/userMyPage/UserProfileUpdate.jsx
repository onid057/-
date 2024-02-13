import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/common/NavigationBar';
import Paragraph from '../../components/common/Paragraph';
import Image from '../../components/common/Image';
import ImageUploader from '../../components/common/ImageUploader';
import { converToyyyymmdd } from '../../utils/time';
import { getDetailUserInfo, updateUserInfo } from '../../apis/api/userMyPage';

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

const Bold = styled.div`
  font-size: 17px;
  font-weight: 500;
  word-break: break-all;
  line-height: 1.3;
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

  const onClickButton = () => {
    updateUserInfo(imageFile).then(navigate('/userMyPage'));
  };

  const navigate = useNavigate();

  const userId = 1;
  const [userInfo, setUserInfo] = useState({});

  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    getDetailUserInfo(userId).then(response => {
      setUserInfo(response);
    });
  }, []);

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
            src={`${process.env.PUBLIC_URL}/images/keyboard_arrow_left.svg`}
            width={'40px'}
            height={'40px'}
            margin={'0 0 0 -12px'}
          ></Image>
        }
        rightContent={'완료'}
        onPrevious={() => navigate(-1)}
        onNext={onClickButton}
      ></NavigationBar>

      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={['내 정보 수정하기']}
      ></Paragraph>

      <ImageUploader
        setImageFile={setImageFile}
        fileInputRef={fileInputRef}
        children={
          <EditImageButton onClick={handleImageClick}>
            <ImageWrapper>
              <Image
                src={
                  imageUrl ||
                  userInfo.profileImage ||
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
        <>이름</>
        <Bold>{userInfo.name}</Bold>
      </InfoWrapper>
      <InfoWrapper>
        <>생년월일</>
        <Bold>{converToyyyymmdd(userInfo.birth)}</Bold>
      </InfoWrapper>
      <InfoWrapper>
        <>이메일 주소</>
        <Bold>{userInfo.email}</Bold>
      </InfoWrapper>
      <InfoWrapper>
        <>휴대폰 번호</>
        <Bold> {userInfo.phoneNumber}</Bold>
      </InfoWrapper>
      <InfoWrapper>
        <>집주소</>
        <Bold>{userInfo.address}</Bold>
      </InfoWrapper>
    </Wrapper>
  );
}

export default ProfileUpdate;
