import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import Image from './Image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StyledSlider = styled(Slider)`
  height: 100%;
  .slick-list {
    height: 100%;
    object-fit: cover;
    display: flex;
    align-items: center; // 이미지가 정방향이 아닐 경우 가운데 위치
  }
  .slick-track {
    display: flex;
    align-items: center;
  }
  .slick-prev {
    left: 6px;
    z-index: 999;
  }
  .slick-next {
    right: 6px;
    z-index: 999;
  }
`;

const CustomDotWrapper = styled.div`
  /* position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%); */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CustomButton = styled.button`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-image: url('./closebutton.svg');
  background-size: cover; /* 이미지를 버튼 영역에 맞게 크기 조절 */
  background-position: center; /* 이미지를 가운데 정렬 */
  background-repeat: no-repeat; /* 이미지 반복 없음 */
  border: none; /* 테두리 제거 */
  cursor: pointer; /* 커서를 포인터로 변경하여 클릭 가능하게 함 */
`;

function SimpleSlider({ showImages, setShowImages }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // 좌,우 버튼
    appendDots: dots => <CustomDotWrapper>{dots}</CustomDotWrapper>,
  };

  // X 버튼 클릭 시 이미지 삭제
  const handleDeleteImage = id => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  return (
    <StyledSlider {...settings}>
      {showImages.map((image, id) => (
        <div key={id}>
          {/* <button onClick={() => handleDeleteImage(id)}>
            <img
              src={`${process.env.PUBLIC_URL}/images/closebutton.svg`}
              alt="close"
            />
          </button> */}
          <Image
            src={image}
            width={'260px'}
            height={'260px'}
            onDelete={() => handleDeleteImage(id)}
          ></Image>
        </div>
      ))}
    </StyledSlider>
  );
}

export default SimpleSlider;
