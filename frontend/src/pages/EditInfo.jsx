import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import NavigationBar from '../components/common/NavigationBar';
import BoldText from '../components/common/BoldText';
import Image from '../components/common/Image';
import ImageUploader from '../components/common/ImageUploader';

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

const ContentWrapper = styled.div`
  width: 290px;
  display: flex;
  justify-content: space-between;
`;

function EditInfo({ name, imageUrl, birth, email, phoneNumber, address }) {
  const fileInputRef = useRef(null);

  const handleImageClick = e => {
    // input 태그 클릭
    e.stopPropagation();
    console.log('hi');
    fileInputRef.current.click();
  };
  const [showImages, setShowImages] = useState([]);

  return (
    <Wrapper>
      <NavigationBar
        leftContent={
          <Image
            src={`${process.env.PUBLIC_URL}/images/keyboard_arrow_left.svg`}
            width={'40px'}
            height={'40px'}
            margin={'0'}
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
      ></NavigationBar>
      <ImageUploader
        showImages={showImages}
        setShowImages={setShowImages}
        fileInputRef={fileInputRef}
        Children={
          <Image
            src={imageUrl || `${process.env.PUBLIC_URL}/images/profile_img.svg`}
            width={'60px'}
            height={'60px'}
            margin={'0'}
          ></Image>
        }
      ></ImageUploader>
    </Wrapper>
  );
}

export default EditInfo;
